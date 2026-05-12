import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get session
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get pagination params
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Get drafts
    const drafts = await prisma.recipe.findMany({
      where: {
        userId,
        isDraft: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImageUrl: true,
        category: true,
        difficulty: true,
        prepTime: true,
        cookTime: true,
        baseServings: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip,
      take: limit,
    });

    // Get total count
    const total = await prisma.recipe.count({
      where: {
        userId,
        isDraft: true,
      },
    });

    return NextResponse.json({
      success: true,
      drafts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get drafts error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
