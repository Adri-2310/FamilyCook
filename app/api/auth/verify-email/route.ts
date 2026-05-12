import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

async function verifyEmail(token: string) {
  try {
    // Find verification token
    const verification = await prisma.verification.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verification) {
      return { error: "Token invalide", status: 400 };
    }

    // Check if token is expired
    if (new Date() > verification.expires) {
      return { error: "Token expiré", status: 400 };
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

    return { success: true, message: "Email vérifié avec succès" };
  } catch (error) {
    console.error("Email verification error:", error);
    return { error: "Erreur serveur", status: 500 };
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { error: "Token manquant" },
        { status: 400 }
      );
    }

    const result = await verifyEmail(token);
    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 }
      );
    }

    // Redirect to login page after successful verification
    return NextResponse.redirect(new URL("/auth/login?verified=true", request.url));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifyEmailSchema.parse(body);

    const result = await verifyEmail(token);
    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json(result);
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
