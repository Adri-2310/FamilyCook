import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";

async function getAdminStats() {
  const [totalUsers, totalRecipes, publicRecipes] = await Promise.all([
    db.user.count(),
    db.recipe.count(),
    db.recipe.count({ where: { visibility: "PUBLIC" } }),
  ]);

  return { totalUsers, totalRecipes, publicRecipes };
}

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord Admin</h1>
        <p className="text-muted-foreground">
          Gestion complète de la plateforme FamilyCook
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="text-sm font-medium text-muted-foreground">Total utilisateurs</div>
          <div className="text-3xl font-bold mt-2">{stats.totalUsers}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-muted-foreground">Total recettes</div>
          <div className="text-3xl font-bold mt-2">{stats.totalRecipes}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-muted-foreground">Recettes publiques</div>
          <div className="text-3xl font-bold mt-2">{stats.publicRecipes}</div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Fonctionnalités disponibles</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            <span>Visualiser les statistiques globales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">→</span>
            <span>Gestion des utilisateurs (Phase 12)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">→</span>
            <span>Modération des recettes (Phase 12)</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
