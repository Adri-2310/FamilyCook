import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const draftUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(5000).optional(),
  coverImageUrl: z.string().url().optional().nullable(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  prepTime: z.number().optional(),
  cookTime: z.number().optional().nullable(),
  baseServings: z.number().optional(),
});

type DraftUpdate = z.infer<typeof draftUpdateSchema>;

export async function PUT(
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

    // Parse and validate body
    const body = await request.json();
    const validatedData = draftUpdateSchema.parse(body);

    // Check if recipe exists and belongs to user
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 }
      );
    }

    if (recipe.userId !== userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    if (!recipe.isDraft) {
      return NextResponse.json(
        { error: "Cette recette n'est pas un brouillon" },
        { status: 400 }
      );
    }

    // Update draft
    const updated = await prisma.recipe.update({
      where: { id: recipeId },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      recipe: updated,
      message: "Brouillon auto-sauvegardé",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Draft save error:", error);
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

    // Check if recipe exists and belongs to user
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 }
      );
    }

    if (recipe.userId !== userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    if (!recipe.isDraft) {
      return NextResponse.json(
        { error: "Cette recette n'est pas un brouillon" },
        { status: 400 }
      );
    }

    // Delete draft and related data
    await prisma.recipe.delete({
      where: { id: recipeId },
    });

    return NextResponse.json({
      success: true,
      message: "Brouillon supprimé",
    });
  } catch (error) {
    console.error("Draft delete error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
