import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

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

    // Send email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2>Réinitialiser votre mot de passe</h2>
        <p>Bonjour ${user.name || "utilisateur"},</p>
        <p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour continuer:</p>
        <p><a href="${resetUrl}" style="color: #2E7D32; text-decoration: none; font-weight: bold;">Réinitialiser mon mot de passe</a></p>
        <p style="font-size: 12px; color: #666;">Ou copiez ce lien dans votre navigateur:<br/>${resetUrl}</p>
        <p style="font-size: 12px; color: #999;">Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      </div>
    `;

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "FamilyCook <noreply@familycook.app>",
      to: user.email,
      subject: "Réinitialiser votre mot de passe - FamilyCook",
      html: emailContent,
    });

    await logger.userAction("auth.forgot-password", {
      userId: user.id,
      metadata: { email: user.email },
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

    await logger.error("auth.forgot-password-failed", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
