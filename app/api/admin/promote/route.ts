import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * ⚠️ ROUTE TEMPORAIRE - À SUPPRIMER APRÈS CRÉATION DU PREMIER ADMIN
 *
 * Promeut un utilisateur en ADMIN
 *
 * Usage:
 * POST /api/admin/promote
 * Body: { email: "user@example.com", token: "ADMIN_PROMOTION_TOKEN" }
 */

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    // Vérification du token secret
    const PROMOTION_TOKEN = process.env.ADMIN_PROMOTION_TOKEN;
    if (!PROMOTION_TOKEN) {
      return NextResponse.json(
        { error: "Route non configurée. Définis ADMIN_PROMOTION_TOKEN dans .env.local" },
        { status: 500 }
      );
    }

    if (token !== PROMOTION_TOKEN) {
      return NextResponse.json(
        { error: "Token invalide" },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    // Promouvoir l'utilisateur
    const user = await db.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    return NextResponse.json(
      {
        success: true,
        message: `${user.name || email} a été promu ADMIN`,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    console.error("Promotion error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la promotion" },
      { status: 500 }
    );
  }
}
