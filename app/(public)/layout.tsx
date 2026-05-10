import { ReactNode } from "react";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">FamilyCook</div>
          <div className="flex gap-4">
            <a href="/auth/login" className="text-sm hover:underline">
              Connexion
            </a>
            <a href="/auth/register" className="text-sm hover:underline">
              Inscription
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 FamilyCook. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
