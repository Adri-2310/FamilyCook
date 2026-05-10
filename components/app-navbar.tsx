"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function AppNavbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/user/dashboard" className="flex items-center gap-2">
          <div className="text-2xl font-bold">🍳 FamilyCook</div>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/user/dashboard" className="text-sm hover:text-primary transition">
            Tableau de bord
          </Link>
          <Link href="/user/recipes" className="text-sm hover:text-primary transition">
            Recettes
          </Link>
          <Link href="/user/profile" className="text-sm hover:text-primary transition">
            Profil
          </Link>
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin/dashboard" className="text-sm hover:text-primary transition font-semibold">
              Admin
            </Link>
          )}
        </div>
        <div className="flex gap-3">
          <div className="text-sm text-muted-foreground py-2">
            {session?.user?.name || session?.user?.email}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </nav>
    </header>
  );
}
