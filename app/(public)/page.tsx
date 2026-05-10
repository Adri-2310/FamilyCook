import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { db } from "@/lib/db";
import Image from "next/image";
import { Clock, ChefHat } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "FamilyCook - Partagez vos recettes en famille",
  description:
    "Découvrez et partagez vos meilleures recettes avec votre famille. Simple, gratuit et conçu pour vous.",
  openGraph: {
    title: "FamilyCook",
    description: "Partagez vos recettes en famille",
    type: "website",
  },
};

async function getPublicRecipes() {
  return await db.recipe.findMany({
    where: { visibility: "PUBLIC" },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

export default async function HomePage() {
  // Rediriger vers le dashboard si l'utilisateur est connecté
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    if (session.user.role === "ADMIN") {
      redirect("/admin/dashboard");
    } else {
      redirect("/user/dashboard");
    }
  }

  const recipes = await getPublicRecipes();

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Partagez vos recettes en famille
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Créez, organisez et découvrez des recettes délicieuses avec votre
            famille. Simple, gratuit et convivial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="px-8">
                Rejoindre FamilyCook
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="px-8">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recettes à découvrir
            </h2>
            <p className="text-lg text-muted-foreground">
              Explorez une sélection de recettes partagées par notre communauté
            </p>
          </div>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-400 to-slate-600 overflow-hidden">
                    <Image
                      src={`https://picsum.photos/800/600?random=${recipe.id}`}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {recipe.prepTime + (recipe.cookTime || 0)} min
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        <span className="capitalize">
                          {recipe.difficulty.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Aucune recette publique pour le moment. Soyez le premier à en
                partager une !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça marche
            </h2>
            <p className="text-lg text-muted-foreground">
              Trois étapes simples pour commencer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: "📝",
                title: "Créez votre compte",
                description:
                  "Inscription simple et gratuite avec email ou Google. Vérifiez votre adresse en quelques secondes.",
              },
              {
                step: 2,
                icon: "🍳",
                title: "Ajoutez vos recettes",
                description:
                  "Partagez vos meilleures recettes avec photos, ingrédients et étapes détaillées.",
              },
              {
                step: 3,
                icon: "👨‍👩‍👧‍👦",
                title: "Partagez en famille",
                description:
                  "Accédez à toutes les recettes, ajustez les portions et imprimez ce que vous aimez.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-sm font-semibold text-primary mb-2">
                  ÉTAPE {item.step}
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de passionnés de cuisine et partagez vos
            meilleures recettes.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="px-8">
              Créer un compte gratuit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
