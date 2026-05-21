import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { AppNavbar } from "@/components/app-navbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

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
            <a href="/admin/logs" className="block px-4 py-2 rounded hover:bg-background text-sm">
              📋 Logs
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
