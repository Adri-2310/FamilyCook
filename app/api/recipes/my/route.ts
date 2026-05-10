import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const recipes = await db.recipe.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImageUrl: true,
        category: true,
        difficulty: true,
        visibility: true,
        baseServings: true,
        prepTime: true,
        cookTime: true,
        createdAt: true,
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
