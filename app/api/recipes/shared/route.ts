import { db } from "@/lib/db";

export async function GET() {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        visibility: "PUBLIC",
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImageUrl: true,
        category: true,
        difficulty: true,
        baseServings: true,
        prepTime: true,
        cookTime: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(recipes);
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur lors du chargement des recettes" },
      { status: 500 }
    );
  }
}
