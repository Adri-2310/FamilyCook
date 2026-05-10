import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const sort = searchParams.get("sort") || "recent";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;

  try {
    // Construire les filtres avec AND pour combiner correctement
    const conditions: Prisma.RecipeWhereInput[] = [
      { visibility: "PUBLIC" },
    ];

    // Filtre recherche
    if (search.trim()) {
      conditions.push({
        OR: [
          { title: { startsWith: search, mode: "insensitive" } },
          { description: { startsWith: search, mode: "insensitive" } },
          {
            ingredients: {
              some: {
                name: { startsWith: search, mode: "insensitive" },
              },
            },
          },
        ],
      });
    }

    // Filtre catégorie
    if (category && category !== "ALL") {
      conditions.push({ category: category as any });
    }

    // Filtre difficulté
    if (difficulty && difficulty !== "ALL") {
      conditions.push({ difficulty: difficulty as any });
    }

    const where: Prisma.RecipeWhereInput =
      conditions.length === 1 ? conditions[0] : { AND: conditions };

    // Récupérer le total
    const total = await db.recipe.count({ where });

    // Récupérer les recettes
    let recipes = await db.recipe.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
        ingredients: true,
        favorites: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Trier après récupération (pour popular)
    if (sort === "oldest") {
      recipes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } else if (sort === "a-z") {
      recipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "popular") {
      recipes.sort((a, b) => b.favorites.length - a.favorites.length);
    } else {
      // recent (défaut)
      recipes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    const formattedRecipes = recipes.map((recipe) => ({
      ...recipe,
      favoriteCount: recipe.favorites.length,
    }));

    return Response.json({
      recipes: formattedRecipes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return Response.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    );
  }
}
