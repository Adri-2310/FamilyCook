import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Clock, ChefHat, Eye } from "lucide-react";

export default async function RecipesPage() {
  // TODO: Récupérer les recettes de l'utilisateur (Phase 5)
  const recipes = [];

  if (!recipes) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Impossible de charger vos recettes</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes Recettes</h1>
          <p className="text-muted-foreground">
            Gérez et partagez vos meilleures recettes
          </p>
        </div>
        <Link href="/app/recipes/new">
          <Button size="lg">
            ➕ Nouvelle recette
          </Button>
        </Link>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/app/recipes/${recipe.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-40 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                  <span className="text-4xl">🍽️</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.prepTime + (recipe.cookTime || 0)} min
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-3 h-3" />
                      {recipe.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {recipe.visibility}
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-muted rounded">
                      {recipe._count.favorites} ❤️
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas encore de recettes.
          </p>
          <Link href="/app/recipes/new">
            <Button>
              Créer votre première recette
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
