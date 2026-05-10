import { PrismaClient, Category, Difficulty, Visibility } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123!@#", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@familycook.com",
      emailVerified: true,
      password: adminPassword,
      role: "ADMIN",
      active: true,
    },
  });
  console.log("✓ Admin user created");

  // Create a regular user
  const userPassword = await bcrypt.hash("User123!@#", 10);
  const user = await prisma.user.create({
    data: {
      name: "Jean Dupont",
      email: "jean@example.com",
      emailVerified: true,
      password: userPassword,
      role: "USER",
      active: true,
    },
  });
  console.log("✓ Regular user created");

  // Create demo recipes
  const recipeIds: string[] = [];

  const recipes = [
    {
      title: "Pâtes Carbonara",
      description: "Les vraies pâtes à la carbonara, recette italienne authentique",
      coverImageUrl: "https://via.placeholder.com/800x600?text=Carbonara",
      category: "MAIN" as Category,
      prepTime: 10,
      cookTime: 15,
      difficulty: "EASY" as Difficulty,
      baseServings: 4,
      visibility: "PUBLIC" as Visibility,
    },
    {
      title: "Tarte Tatin",
      description: "Dessert classique français avec pommes caramélisées",
      coverImageUrl: "https://via.placeholder.com/800x600?text=Tarte+Tatin",
      category: "DESSERT" as Category,
      prepTime: 20,
      cookTime: 40,
      difficulty: "MEDIUM" as Difficulty,
      baseServings: 6,
      visibility: "PUBLIC" as Visibility,
    },
    {
      title: "Bouillabaisse",
      description: "Soupe de poisson provençale riche et savoureuse",
      coverImageUrl: "https://via.placeholder.com/800x600?text=Bouillabaisse",
      category: "MAIN" as Category,
      prepTime: 30,
      cookTime: 45,
      difficulty: "HARD" as Difficulty,
      baseServings: 6,
      visibility: "PUBLIC" as Visibility,
    },
  ];

  for (const recipeData of recipes) {
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        coverImageUrl: recipeData.coverImageUrl,
        additionalImages: [],
        category: recipeData.category,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        difficulty: recipeData.difficulty,
        baseServings: recipeData.baseServings,
        visibility: recipeData.visibility,
        userId: user.id,
      },
    });

    // Add ingredients
    if (recipe.title === "Pâtes Carbonara") {
      await prisma.ingredient.createMany({
        data: [
          {
            name: "Pâtes",
            quantity: 400,
            unit: "g",
            order: 1,
            recipeId: recipe.id,
          },
          {
            name: "Œufs",
            quantity: 4,
            unit: "",
            order: 2,
            recipeId: recipe.id,
          },
          {
            name: "Guanciale",
            quantity: 200,
            unit: "g",
            order: 3,
            recipeId: recipe.id,
          },
          {
            name: "Pecorino Romano",
            quantity: 100,
            unit: "g",
            order: 4,
            recipeId: recipe.id,
          },
          {
            name: "Poivre noir",
            quantity: 1,
            unit: "cuillère à café",
            order: 5,
            recipeId: recipe.id,
          },
        ],
      });
    }

    // Add steps
    await prisma.step.createMany({
      data: [
        {
          content: "Préparer tous les ingrédients",
          order: 1,
          recipeId: recipe.id,
        },
        {
          content: "Cuire les ingrédients principaux",
          order: 2,
          recipeId: recipe.id,
        },
        {
          content: "Assaisonner et servir",
          order: 3,
          recipeId: recipe.id,
        },
      ],
    });

    recipeIds.push(recipe.id);
    console.log(`✓ Recipe created: ${recipe.title}`);
  }

  // Create a private recipe for the admin
  const privateRecipe = await prisma.recipe.create({
    data: {
      title: "Recette Secrète de Famille",
      description: "Une recette privée gardée secrète",
      coverImageUrl: "https://via.placeholder.com/800x600?text=Secret",
      additionalImages: [],
      category: "MAIN",
      prepTime: 30,
      cookTime: 60,
      difficulty: "MEDIUM",
      baseServings: 4,
      visibility: "PRIVATE",
      userId: admin.id,
    },
  });
  console.log("✓ Private recipe created");

  // Add favorites
  if (recipeIds.length > 0) {
    await prisma.favorite.create({
      data: {
        userId: user.id,
        recipeId: recipeIds[0],
      },
    });
    console.log("✓ Favorite added");
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
