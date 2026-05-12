import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifyEmailSchema.parse(body);

    // Find verification token
    const verification = await prisma.verification.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Token invalide" },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (new Date() > verification.expires) {
      return NextResponse.json(
        { error: "Token expiré" },
        { status: 400 }
      );
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: verification.userId },
      data: { emailVerified: true },
    });

    // Delete verification token
    await prisma.verification.delete({
      where: { id: verification.id },
    });

    return NextResponse.json({
      success: true,
      message: "Email vérifié avec succès",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
