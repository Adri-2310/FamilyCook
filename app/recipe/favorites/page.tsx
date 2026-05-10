import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Card } from "@/components/ui/card";
import { RecipeSearchFilters } from "@/components/recipes/recipe-search-filters";
import { RecipeCardClient } from "@/components/recipes/recipe-card-client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

interface SearchResult {
  recipes: any[];
  total: number;
  page: number;
  totalPages: number;
}

async function getFavorites(
  searchParams: Record<string, string | string[] | undefined>
): Promise<SearchResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/login");
  }

  const page = parseInt((searchParams.page as string) || "1");
  const limit = 12;

  try {
    const total = await db.favorite.count({
      where: { userId: session.user.id },
    });

    const favorites = await db.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        recipe: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
            ingredients: true,
            favorites: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const recipes = favorites.map((fav) => ({
      ...fav.recipe,
      favoriteCount: fav.recipe.favorites.length,
    }));

    return {
      recipes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Erreur:", error);
    return { recipes: [], total: 0, page: 1, totalPages: 0 };
  }
}

export default async function FavoritesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const result = await getFavorites(params);
  const page = parseInt((params.page as string) || "1");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Mes favoris</h1>
        <p className="text-lg text-muted-foreground">
          Les recettes que vous avez mises en favoris
        </p>
      </div>

      <RecipeSearchFilters basePath="/recipe/favorites" />

      <p className="text-xs text-muted-foreground mb-8">
        {result.total} recette{result.total !== 1 ? "s" : ""} trouvée
        {result.total !== 1 ? "s" : ""}
      </p>

      <div>
        {result.recipes.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              {result.total === 0
                ? "Vous n'avez pas encore de favoris"
                : "Aucune recette ne correspond à vos critères de recherche"}
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {result.recipes.map((recipe) => (
                <RecipeCardClient
                  key={recipe.id}
                  recipe={recipe}
                  href={`/recipe/shared/show/${recipe.id}`}
                  isFavorite={true}
                />
              ))}
            </div>

            {result.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: result.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Link
                      key={p}
                      href={`/recipe/favorites?${new URLSearchParams({
                        ...Object.fromEntries(
                          Object.entries(params).filter(
                            ([key]) => key !== "page"
                          )
                        ),
                        page: p.toString(),
                      }).toString()}`}
                      className={`px-3 py-1 rounded text-sm ${
                        page === p
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {p}
                    </Link>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
