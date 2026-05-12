import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

const sendVerificationSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = sendVerificationSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Find the verification token for this user (most recent one)
    const verification = await prisma.verification.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Token de vérification non trouvé" },
        { status: 404 }
      );
    }

    // Check if token is expired
    if (new Date() > verification.expires) {
      return NextResponse.json(
        { error: "Token de vérification expiré" },
        { status: 400 }
      );
    }

    // Build verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email/${verification.token}`;

    // Email template
    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2>Bienvenue sur FamilyCook!</h2>
        <p>Bonjour ${user.name || "utilisateur"},</p>
        <p>Pour finaliser votre inscription, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous:</p>
        <p><a href="${verificationUrl}" style="color: #2E7D32; text-decoration: none; font-weight: bold; padding: 10px 20px; background-color: #E8F5E9; display: inline-block; border-radius: 4px;">Vérifier mon email</a></p>
        <p style="font-size: 12px; color: #666;">Ou copiez ce lien dans votre navigateur:<br/>${verificationUrl}</p>
        <p style="font-size: 12px; color: #999;">Ce lien expire dans 24 heures. Si vous n'avez pas créé ce compte, ignorez cet email.</p>
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
      subject: "Vérifiez votre adresse email - FamilyCook",
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message: "Email de vérification envoyé",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    console.error("Send verification email error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
