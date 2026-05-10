"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
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
}

export default function RecipeShowPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const recipeId = params.id as string;

  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        if (response.ok) {
          const data = await response.json();
          // Vérifier que c'est bien la recette de l'utilisateur
          if (data.userId !== session.user.id) {
            router.push("/recipe/my");
            return;
          }
          setRecipe(data);
        } else {
          router.push("/recipe/my");
        }
      } catch (error) {
        console.error("Erreur:", error);
        router.push("/recipe/my");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId, session, router]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la recette "${recipe?.title}"? Cette action est irréversible.`
    );

    if (!confirmed) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/recipe/my");
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

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
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
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
              <span className="inline-block bg-primary/10 px-3 py-1 rounded-full">
                {recipe.visibility === "PUBLIC" ? "Public" : "Privé"}
              </span>
            </div>
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

        {/* Ingrédients */}
        {recipe.ingredients.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Ingrédients</h2>
            <Card className="p-4">
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex justify-between">
                    <span>{ingredient.name}</span>
                    <span className="text-muted-foreground">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
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
        <div className="flex gap-3 mb-8">
          <Link href={`/recipe/my/edit/${recipe.id}`}>
            <Button>✏️ Éditer</Button>
          </Link>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Suppression..." : "🗑️ Supprimer"}
          </Button>

          <Link href="/recipe/my" className="ml-auto">
            <Button variant="outline">← Retour</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
