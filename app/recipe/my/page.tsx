"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Recipe {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  category: string;
  difficulty: string;
  visibility: string;
  baseServings: number;
  prepTime: number;
  cookTime: number;
}

export default function MyRecipesPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attendre que la session soit chargée
    if (isPending) return;

    // Rediriger si pas connecté
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/my");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des recettes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [session, isPending, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mes recettes</h1>
        <Link href="/recipe/my/new">
          <Button>+ Créer une recette</Button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas encore de recettes
          </p>
          <Link href="/recipe/my/new">
            <Button>Créer votre première recette</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/my/show/${recipe.id}`}
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
                  <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-sm">
                    {recipe.visibility === "PUBLIC" ? "Public" : "Privé"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>
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
