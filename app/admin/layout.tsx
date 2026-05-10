import { ReactNode } from "react";
import { AppNavbar } from "@/components/app-navbar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/50 p-6">
          <div className="text-lg font-bold mb-8 text-primary">🛡️ Panneau Admin</div>
          <nav className="space-y-1">
            <a href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-background text-sm">
              📊 Dashboard
            </a>
            <a href="/admin/users" className="block px-4 py-2 rounded hover:bg-background text-sm">
              👥 Utilisateurs
            </a>
            <a href="/admin/recipes" className="block px-4 py-2 rounded hover:bg-background text-sm">
              🍽️ Recettes
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
