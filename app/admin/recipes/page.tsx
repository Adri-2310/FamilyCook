import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

async function getRecipes() {
  const recipes = await db.recipe.findMany({
    include: {
      user: true,
      _count: {
        select: { favorites: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return recipes;
}

export default async function AdminRecipesPage() {
  const recipes = await getRecipes();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestion des recettes</h1>
        <p className="text-muted-foreground">
          Modérez et gérez les recettes de la plateforme
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Titre</th>
              <th className="text-left p-3 font-semibold">Auteur</th>
              <th className="text-left p-3 font-semibold">Catégorie</th>
              <th className="text-left p-3 font-semibold">Visibilité</th>
              <th className="text-left p-3 font-semibold">Likes</th>
              <th className="text-left p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id} className="border-b hover:bg-muted/50">
                <td className="p-3 font-medium">{recipe.title}</td>
                <td className="p-3 text-muted-foreground">
                  {recipe.user?.name || recipe.user?.email}
                </td>
                <td className="p-3">{recipe.category}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      recipe.visibility === "PUBLIC"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {recipe.visibility}
                  </span>
                </td>
                <td className="p-3">❤️ {recipe._count.favorites}</td>
                <td className="p-3">
                  <Button size="sm" variant="outline" disabled>
                    Modérer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {recipes.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          Aucune recette trouvée
        </div>
      )}
    </div>
  );
}
