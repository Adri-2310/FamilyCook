import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    const [recipeCount, favoriteCount] = await Promise.all([
      db.recipe.count({ where: { userId: session.user.id } }),
      db.favorite.count({ where: { userId: session.user.id } }),
    ]);

    if (!user) {
      return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    return Response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      recipeCount,
      favoriteCount,
    });
  } catch {
    return Response.json(
      { error: "Erreur lors du chargement du profil" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name } = body;

    const updated = await db.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    await logger.userAction("profile.update", {
      userId: session.user.id,
      metadata: { name: updated.name },
    });

    return Response.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
    });
  } catch (error) {
    await logger.error("profile.update-failed", error, {
      userId: session.user.id,
    });
    return Response.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    // Delete user's recipes, favorites, etc.
    await db.recipe.deleteMany({ where: { userId: session.user.id } });
    await db.favorite.deleteMany({ where: { userId: session.user.id } });

    // Delete user
    await db.user.delete({ where: { id: session.user.id } });

    await logger.userAction("account.delete", {
      userId: session.user.id,
    });

    return Response.json({ success: true });
  } catch (error) {
    await logger.error("account.delete-failed", error, {
      userId: session.user.id,
    });
    return Response.json(
      { error: "Erreur lors de la suppression du compte" },
      { status: 500 }
    );
  }
}
