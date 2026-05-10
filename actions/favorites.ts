"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function addFavorite(recipeId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Non authentifié");
  }

  try {
    await db.favorite.create({
      data: {
        userId: session.user.id,
        recipeId,
      },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return { success: true };
    }
    throw error;
  }
}

export async function removeFavorite(recipeId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Non authentifié");
  }

  try {
    await db.favorite.delete({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId,
        },
      },
    });
    return { success: true };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return { success: true };
    }
    throw error;
  }
}
