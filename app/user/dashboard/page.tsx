import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UserDashboard() {
  // TODO: Récupérer les stats de l'utilisateur (Phase 5)
  const stats = {
    totalRecipes: 0,
    publicRecipes: 0,
    totalFavorites: 0,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mon Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace personnel FamilyCook
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-muted-foreground">Mes recettes</div>
          <div className="text-3xl font-bold mt-2">{stats.totalRecipes}</div>
          <Link href="/user/recipes" className="text-xs text-primary hover:underline mt-4 block">
            Voir tous →
          </Link>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-muted-foreground">Recettes publiques</div>
          <div className="text-3xl font-bold mt-2">{stats.publicRecipes}</div>
          <p className="text-xs text-muted-foreground mt-4">Partagées avec la communauté</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-muted-foreground">Mes favoris</div>
          <div className="text-3xl font-bold mt-2">{stats.totalFavorites}</div>
          <p className="text-xs text-muted-foreground mt-4">Recettes sauvegardées</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <Link href="/user/recipes/new" className="block">
              <Button className="w-full" size="sm">
                ➕ Créer une nouvelle recette
              </Button>
            </Link>
            <Link href="/user/recipes" className="block">
              <Button variant="outline" className="w-full" size="sm">
                📋 Gérer mes recettes
              </Button>
            </Link>
            <Link href="/user/profile" className="block">
              <Button variant="outline" className="w-full" size="sm">
                👤 Mon profil
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Recettes récentes</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Aucune recette pour le moment</p>
            <p>Créez votre première recette pour la voir ici</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
