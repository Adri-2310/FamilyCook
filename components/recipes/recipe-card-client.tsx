"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FavoriteButton } from "./favorite-button";

interface RecipeCardClientProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    prepTime: number;
    cookTime?: number;
    baseServings: number;
    favoriteCount: number;
    user: {
      name?: string;
      email: string;
    };
  };
  href: string;
  isFavorite: boolean;
}

export function RecipeCardClient({
  recipe,
  href,
  isFavorite,
}: RecipeCardClientProps) {
  return (
    <div className="group">
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow flex flex-col">
        <Link href={href} className="flex-1">
          <div className="relative h-48 bg-muted overflow-hidden">
            {recipe.coverImageUrl && (
              <img
                src={recipe.coverImageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            )}
          </div>
        </Link>
        <div className="p-4 flex flex-col flex-1">
          <Link href={href}>
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-primary">
              {recipe.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-2">
            par {recipe.user.name || recipe.user.email}
          </p>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">
              ⏱ {recipe.prepTime + (recipe.cookTime || 0)}min
            </span>
            <span className="text-muted-foreground">
              👥 {recipe.baseServings}
            </span>
          </div>
          <div className="flex justify-end">
            <FavoriteButton
              recipeId={recipe.id}
              initialIsFavorite={isFavorite}
              favoriteCount={recipe.favoriteCount}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
