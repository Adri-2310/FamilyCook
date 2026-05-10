import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">🍳 FamilyCook</div>
        </Link>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Connexion
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">
              S'inscrire
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
