import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // Find verification token
    const verification = await prisma.verification.findUnique({
      where: { token },
      include: { user: true },
    });

    // Check if token exists and is not expired
    if (!verification) {
      return NextResponse.json(
        { error: "Lien de réinitialisation invalide ou expiré" },
        { status: 400 }
      );
    }

    if (verification.expires < new Date()) {
      // Delete expired token
      await prisma.verification.delete({ where: { token } });
      return NextResponse.json(
        { error: "Lien de réinitialisation expiré" },
        { status: 400 }
      );
    }

    // Check if it's a reset token
    if (!verification.identifier.startsWith("reset-")) {
      return NextResponse.json(
        { error: "Lien de réinitialisation invalide" },
        { status: 400 }
      );
    }

    // Hash new password using scrypt (same as Better Auth)
    const scryptAsync = promisify(scrypt);
    const salt = randomBytes(16);
    const derivedKey = await scryptAsync(password, salt, 64);
    const hashedPassword = `${salt.toString("hex")}.${(derivedKey as Buffer).toString("hex")}`;

    // Find or create account with email/password provider
    let account = await prisma.account.findFirst({
      where: {
        userId: verification.userId,
        providerId: "email",
      },
    });

    if (account) {
      // Update existing account
      await prisma.account.update({
        where: { id: account.id },
        data: { password: hashedPassword },
      });
    } else {
      // Create new account if it doesn't exist
      await prisma.account.create({
        data: {
          accountId: verification.user.email,
          providerId: "email",
          userId: verification.userId,
          password: hashedPassword,
        },
      });
    }

    // Delete verification token
    await prisma.verification.delete({ where: { token } });

    return NextResponse.json({
      success: true,
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
