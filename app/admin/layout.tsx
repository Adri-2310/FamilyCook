import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-muted p-6">
        <div className="text-xl font-bold mb-8">Admin</div>
        <nav className="space-y-2">
          <a href="/admin" className="block text-sm hover:underline">
            Dashboard
          </a>
          <a href="/admin/users" className="block text-sm hover:underline">
            Utilisateurs
          </a>
          <a href="/admin/recipes" className="block text-sm hover:underline">
            Recettes
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
