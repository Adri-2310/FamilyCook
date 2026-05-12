import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { db } from "./db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendVerificationEmail(
  user: { email: string; name?: string | null },
  url: string
) {
  console.log("📧 Sending verification email to:", user.email);
  const emailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2>Bienvenue sur FamilyCook!</h2>
      <p>Bonjour ${user.name || "utilisateur"},</p>
      <p>Pour finaliser votre inscription, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous:</p>
      <p><a href="${url}" style="color: #2E7D32; text-decoration: none; font-weight: bold; padding: 10px 20px; background-color: #E8F5E9; display: inline-block; border-radius: 4px;">Vérifier mon email</a></p>
      <p style="font-size: 12px; color: #666;">Ou copiez ce lien dans votre navigateur:<br/>${url}</p>
      <p style="font-size: 12px; color: #999;">Ce lien expire dans 24 heures. Si vous n'avez pas créé ce compte, ignorez cet email.</p>
    </div>
  `;

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "FamilyCook <noreply@familycook.app>",
      to: user.email,
      subject: "Vérifiez votre adresse email - FamilyCook",
      html: emailContent,
    });
    console.log("✅ Verification email sent successfully:", result.response);
  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
  }
}

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth",
  appName: "FamilyCook",

  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendVerificationEmail: sendVerificationEmail,
    sendOnSignUp: true,
  },

  // Google OAuth
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
    cookie: {
      attributes: {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // Add custom fields to user (role will be included in session automatically)
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "USER",
      },
    },
  },
});
