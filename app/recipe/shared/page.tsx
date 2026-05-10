"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Recipe {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  category: string;
  difficulty: string;
  baseServings: number;
  prepTime: number;
  cookTime: number;
  user: {
    name: string;
    email: string;
  };
}

export default function SharedRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/shared");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recettes partagées</h1>
        <p className="text-muted-foreground">
          Découvrez les recettes publiques de la communauté
        </p>
      </div>

      {recipes.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Aucune recette partagée pour le moment
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/shared/show/${recipe.id}`}
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted overflow-hidden">
                  {recipe.coverImageUrl && (
                    <img
                      src={recipe.coverImageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    par {recipe.user.name || recipe.user.email}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ⏱ {recipe.prepTime + (recipe.cookTime || 0)}min
                    </span>
                    <span className="text-muted-foreground">
                      👥 {recipe.baseServings}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
