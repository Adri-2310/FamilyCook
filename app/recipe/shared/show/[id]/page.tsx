"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServingsAdjuster } from "@/components/recipes/servings-adjuster";
import { IngredientList } from "@/components/recipes/ingredient-list";
import { useServings } from "@/hooks/use-servings";

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
  ingredients: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    order: number;
  }>;
  steps: Array<{
    id: string;
    content: string;
    order: number;
  }>;
  user: {
    name: string;
    email: string;
  };
}

export default function SharedRecipeShowPage() {
  const router = useRouter();
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const recipeId = params.id as string;

  const servingsManager = useServings(
    recipe?.baseServings ?? 1,
    recipe?.ingredients ?? []
  );

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        if (response.ok) {
          const data = await response.json();
          // Vérifier que c'est une recette publique
          if (data.visibility !== "PUBLIC") {
            router.push("/recipe/shared");
            return;
          }
          setRecipe(data);
        } else {
          router.push("/recipe/shared");
        }
      } catch (error) {
        router.push("/recipe/shared");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Recette non trouvée</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Image de couverture */}
        {recipe.coverImageUrl && (
          <div className="relative h-80 rounded-lg overflow-hidden mb-8">
            <img
              src={recipe.coverImageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">
                Par {recipe.user?.name || recipe.user?.email}
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            {recipe.description}
          </p>
          <div className="flex gap-4 text-sm">
            <span className="inline-block bg-primary/10 px-3 py-1 rounded-full">
              {recipe.category}
            </span>
            <span className="inline-block bg-primary/10 px-3 py-1 rounded-full">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Info rapides */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">
              {recipe.prepTime + (recipe.cookTime || 0)}
            </div>
            <div className="text-sm text-muted-foreground">min total</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{recipe.baseServings}</div>
            <div className="text-sm text-muted-foreground">portions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-sm text-muted-foreground">Prép.</div>
            <div className="text-2xl font-bold">{recipe.prepTime} min</div>
          </Card>
        </div>

        {/* Portions ajustables */}
        {servingsManager && (
          <div className="mb-8">
            <ServingsAdjuster
              currentServings={servingsManager.currentServings}
              baseServings={servingsManager.baseServings}
              onIncrement={servingsManager.increment}
              onDecrement={servingsManager.decrement}
              onSetServings={servingsManager.setServings}
            />
          </div>
        )}

        {/* Ingrédients */}
        {recipe.ingredients.length > 0 && servingsManager && (
          <div className="mb-8">
            <Card className="p-4">
              <IngredientList
                ingredients={servingsManager.adjustedIngredients}
                servingsModified={
                  servingsManager.currentServings !==
                  servingsManager.baseServings
                }
              />
            </Card>
          </div>
        )}

        {/* Étapes */}
        {recipe.steps.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Préparation</h2>
            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <Card key={step.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                      {step.order}
                    </div>
                    <p>{step.content}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mb-8">
          <Link href="/recipe/shared">
            <Button variant="outline">← Retour aux recettes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
