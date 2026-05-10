import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="text-center px-4">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été supprimée.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button size="lg">🏠 Accueil</Button>
          </Link>
          <Link href="/recipe/shared">
            <Button variant="outline" size="lg">
              🍽️ Explorer les recettes
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-6xl opacity-10">🔍</div>
      </div>
    </div>
  );
}
