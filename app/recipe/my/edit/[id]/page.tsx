"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RecipeForm } from "@/components/recipe-form";

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

export default function EditRecipePage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = useSession();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  const recipeId = params.id as string;

  useEffect(() => {
    if (isPending) return;
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

        router.push("/recipe/my");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId, session, router]);

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
        <h1 className="text-3xl font-bold mb-8">Éditer la recette</h1>
        <RecipeForm initialData={recipe} isEditing={true} />
      </div>
    </div>
  );
}
