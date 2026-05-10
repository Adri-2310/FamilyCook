import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      coverImageUrl,
      category,
      prepTime,
      cookTime,
      difficulty,
      baseServings,
      visibility,
      ingredients,
      steps,
    } = body;

    const recipe = await db.recipe.create({
      data: {
        title,
        description,
        coverImageUrl,
        additionalImages: [],
        category,
        prepTime: parseInt(prepTime),
        cookTime: cookTime ? parseInt(cookTime) : 0,
        difficulty,
        baseServings: parseInt(baseServings),
        visibility,
        userId: session.user.id,
        ingredients: {
          createMany: {
            data: ingredients.map(
              (ing: { name: string; quantity: number; unit: string }, idx: number) => ({
                name: ing.name,
                quantity: ing.quantity,
                unit: ing.unit,
                order: idx + 1,
              })
            ),
          },
        },
        steps: {
          createMany: {
            data: steps.map(
              (step: { content: string }, idx: number) => ({
                content: step.content,
                order: idx + 1,
              })
            ),
          },
        },
      },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    return Response.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      coverImageUrl,
      category,
      prepTime,
      cookTime,
      difficulty,
      baseServings,
      visibility,
      ingredients,
      steps,
    } = body;

    // Vérifier que c'est bien la recette de l'utilisateur
    const recipe = await db.recipe.findUnique({
      where: { id },
    });

    if (!recipe || recipe.userId !== session.user.id) {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    // Supprimer les anciens ingrédients et étapes
    await db.ingredient.deleteMany({ where: { recipeId: id } });
    await db.step.deleteMany({ where: { recipeId: id } });

    // Mettre à jour la recette
    const updated = await db.recipe.update({
      where: { id },
      data: {
        title,
        description,
        coverImageUrl,
        category,
        prepTime: parseInt(prepTime),
        cookTime: cookTime ? parseInt(cookTime) : 0,
        difficulty,
        baseServings: parseInt(baseServings),
        visibility,
        ingredients: {
          createMany: {
            data: ingredients.map(
              (ing: { name: string; quantity: number; unit: string }, idx: number) => ({
                name: ing.name,
                quantity: ing.quantity,
                unit: ing.unit,
                order: idx + 1,
              })
            ),
          },
        },
        steps: {
          createMany: {
            data: steps.map(
              (step: { content: string }, idx: number) => ({
                content: step.content,
                order: idx + 1,
              })
            ),
          },
        },
      },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
