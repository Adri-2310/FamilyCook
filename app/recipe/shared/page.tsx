import Link from "next/link";
import { Card } from "@/components/ui/card";
import { RecipeSearchFilters } from "@/components/recipes/recipe-search-filters";
import { RecipeCardClient } from "@/components/recipes/recipe-card-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

interface SearchResult {
  recipes: any[];
  total: number;
  page: number;
  totalPages: number;
}

async function getRecipes(
  searchParams: Record<string, string | string[] | undefined>
): Promise<SearchResult> {
  const params = new URLSearchParams();

  if (searchParams.search) {
    params.set("search", searchParams.search as string);
  }
  if (searchParams.category) {
    params.set("category", searchParams.category as string);
  }
  if (searchParams.difficulty) {
    params.set("difficulty", searchParams.difficulty as string);
  }
  if (searchParams.sort) {
    params.set("sort", searchParams.sort as string);
  }
  if (searchParams.page) {
    params.set("page", searchParams.page as string);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/recipes/search?${params.toString()}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      return response.json();
    }
    return { recipes: [], total: 0, page: 1, totalPages: 0 };
  } catch (error) {

    return { recipes: [], total: 0, page: 1, totalPages: 0 };
  }
}

export default async function SharedRecipesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const result = await getRecipes(params);
  const page = parseInt((params.page as string) || "1");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let favoriteIds: string[] = [];
  if (session?.user) {
    const favorites = await db.favorite.findMany({
      where: { userId: session.user.id },
      select: { recipeId: true },
    });
    favoriteIds = favorites.map((f) => f.recipeId);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Recettes partagées</h1>
        <p className="text-lg text-muted-foreground">
          Découvrez les recettes publiques de la communauté
        </p>
      </div>

      <RecipeSearchFilters basePath="/recipe/shared" />

      <p className="text-xs text-muted-foreground mb-8">
        {result.total} recette{result.total !== 1 ? "s" : ""} trouvée
        {result.total !== 1 ? "s" : ""}
      </p>

      <div>
        {result.recipes.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Aucune recette trouvée correspondant à vos critères
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
                  isFavorite={favoriteIds.includes(recipe.id)}
                />
              ))}
            </div>

            {result.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: result.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Link
                      key={p}
                      href={`/recipe/shared?${new URLSearchParams({
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
