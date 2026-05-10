import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await db.recipe.findUnique({
      where: { id: params.id },
      include: {
        ingredients: {
          orderBy: { order: "asc" },
        },
        steps: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!recipe) {
      return Response.json({ error: "Recette non trouvée" }, { status: 404 });
    }

    return Response.json(recipe);
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur lors du chargement" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const recipe = await db.recipe.findUnique({
      where: { id: params.id },
    });

    if (!recipe) {
      return Response.json({ error: "Recette non trouvée" }, { status: 404 });
    }

    // Vérifier que c'est la recette de l'utilisateur
    if (recipe.userId !== session.user.id) {
      return Response.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    await db.recipe.delete({
      where: { id: params.id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
