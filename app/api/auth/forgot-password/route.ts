import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import { randomBytes } from "crypto";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "Si l'email existe, un lien de réinitialisation a été envoyé.",
      });
    }

    // Generate reset token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token to Verification table
    await prisma.verification.create({
      data: {
        identifier: `reset-${user.id}`,
        token,
        expires: expiresAt,
        userId: user.id,
      },
    });

    // Build reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`;

    // Send email (using simple HTML for now)
    await sendEmail({
      to: user.email,
      subject: "Réinitialiser votre mot de passe - FamilyCook",
      react: (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
          <h2>Réinitialiser votre mot de passe</h2>
          <p>Bonjour {user.name || "utilisateur"},</p>
          <p>
            Nous avons reçu une demande de réinitialisation de votre mot de passe.
            Cliquez sur le lien ci-dessous pour continuer:
          </p>
          <p>
            <a href={resetUrl} style={{ color: "#2E7D32", textDecoration: "none" }}>
              Réinitialiser mon mot de passe
            </a>
          </p>
          <p>
            Ou copiez ce lien dans votre navigateur:
            <br />
            <code style={{ fontSize: "12px", color: "#666" }}>{resetUrl}</code>
          </p>
          <p style={{ fontSize: "12px", color: "#999" }}>
            Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette
            réinitialisation, ignorez cet email.
          </p>
        </div>
      ),
    });

    return NextResponse.json({
      success: true,
      message: "Si l'email existe, un lien de réinitialisation a été envoyé.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
