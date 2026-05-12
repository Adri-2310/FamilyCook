import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const recipeId = params.id;

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 }
      );
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "Déjà en favori" },
        { status: 400 }
      );
    }

    // Add to favorites
    await prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    });

    // Get updated favorite count
    const favoriteCount = await prisma.favorite.count({
      where: { recipeId },
    });

    return NextResponse.json({
      success: true,
      favoriteCount,
      message: "Recette ajoutée aux favoris",
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const recipeId = params.id;

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 }
      );
    }

    // Check if favorited
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { error: "Pas en favori" },
        { status: 400 }
      );
    }

    // Remove from favorites
    await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    // Get updated favorite count
    const favoriteCount = await prisma.favorite.count({
      where: { recipeId },
    });

    return NextResponse.json({
      success: true,
      favoriteCount,
      message: "Recette retirée des favoris",
    });
  } catch (error) {
    console.error("Remove favorite error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
