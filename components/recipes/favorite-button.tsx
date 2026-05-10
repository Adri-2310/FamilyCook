"use client";

import { Heart } from "lucide-react";
import { useState, useTransition } from "react";
import { addFavorite, removeFavorite } from "@/actions/favorites";
import { toastAddedToFavorites, toastRemovedFromFavorites, toastError } from "@/lib/toast";

interface FavoriteButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
  favoriteCount: number;
}

export function FavoriteButton({
  recipeId,
  initialIsFavorite,
  favoriteCount,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [count, setCount] = useState(favoriteCount);
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = () => {
    startTransition(async () => {
      try {
        if (isFavorite) {
          await removeFavorite(recipeId);
          setIsFavorite(false);
          setCount((prev) => Math.max(0, prev - 1));
          toastRemovedFromFavorites();
        } else {
          await addFavorite(recipeId);
          setIsFavorite(true);
          setCount((prev) => prev + 1);
          toastAddedToFavorites();
        }
      } catch (error) {
        toastError("Erreur lors de la mise à jour des favoris");
      }
    });
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isPending}
      className="flex items-center gap-2 text-sm transition-colors hover:text-red-500 disabled:opacity-50"
    >
      <Heart
        className={`w-5 h-5 transition-all ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground hover:text-red-500"
        }`}
      />
      <span className="text-muted-foreground">{count}</span>
    </button>
  );
}
