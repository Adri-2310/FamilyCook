import { ReactNode } from "react";
import Link from "next/link";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez votre compte et vos préférences
          </p>
        </div>

        <div className="flex gap-8 mb-8">
          <nav className="w-48">
            <div className="space-y-2">
              <Link
                href="/profile"
                className="block px-4 py-2 rounded hover:bg-muted transition-colors text-sm"
              >
                👤 Mon Profil
              </Link>
              <Link
                href="/profile/settings"
                className="block px-4 py-2 rounded hover:bg-muted transition-colors text-sm"
              >
                ⚙️ Paramètres
              </Link>
              <Link
                href="/profile/security"
                className="block px-4 py-2 rounded hover:bg-muted transition-colors text-sm"
              >
                🔒 Sécurité
              </Link>
            </div>
          </nav>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
