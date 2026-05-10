import { ReactNode } from "react";

export default function AppLayout({
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
            <a href="/recipes" className="text-sm hover:underline">
              Recettes
            </a>
            <a href="/profile" className="text-sm hover:underline">
              Profil
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
