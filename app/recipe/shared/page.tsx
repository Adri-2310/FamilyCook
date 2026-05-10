import Link from "next/link";
import { Card } from "@/components/ui/card";
import { RecipeSearchFilters } from "@/components/recipes/recipe-search-filters";

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
    console.error("Erreur:", error);
    return { recipes: [], total: 0, page: 1, totalPages: 0 };
  }
}

export default async function SharedRecipesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const result = await getRecipes(searchParams);
  const page = parseInt((searchParams.page as string) || "1");

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
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          ⏱ {recipe.prepTime + (recipe.cookTime || 0)}min
                        </span>
                        <span className="text-muted-foreground">
                          👥 {recipe.baseServings}
                        </span>
                      </div>
                      {recipe.favoriteCount > 0 && (
                        <div className="text-xs text-muted-foreground">
                          ❤️ {recipe.favoriteCount} like
                          {recipe.favoriteCount !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
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
                          Object.entries(searchParams).filter(
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
