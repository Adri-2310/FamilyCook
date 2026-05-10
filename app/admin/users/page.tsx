import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";

async function getUsers(search?: string) {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const users = await db.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return users;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const users = await getUsers(params.search);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          Manage all users and their permissions
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Rechercher par nom ou email..."
            defaultValue={params.search || ""}
            className="flex-1"
            disabled
          />
          <Button disabled>Rechercher</Button>
        </div>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Nom</th>
              <th className="text-left p-3 font-semibold">Email</th>
              <th className="text-left p-3 font-semibold">Rôle</th>
              <th className="text-left p-3 font-semibold">Inscription</th>
              <th className="text-left p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-muted/50">
                <td className="p-3">{user.name || "—"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className="inline-block bg-primary/10 px-2 py-1 rounded text-xs font-medium">
                    {user.role || "USER"}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground text-xs">
                  {user.createdAt?.toLocaleDateString("fr-FR") || "—"}
                </td>
                <td className="p-3">
                  <Button size="sm" variant="outline" disabled>
                    Actions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          Aucun utilisateur trouvé
        </div>
      )}
    </div>
  );
}
