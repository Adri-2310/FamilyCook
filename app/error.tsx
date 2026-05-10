"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="text-center px-4">
        <div className="text-6xl font-bold text-destructive mb-4">500</div>
        <h1 className="text-4xl font-bold mb-4">Erreur serveur</h1>
        <p className="text-lg text-muted-foreground mb-2 max-w-md mx-auto">
          Une erreur inattendue s'est produite.
        </p>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto opacity-75">
          Nos équipes travaillent pour résoudre ce problème. Veuillez réessayer
          dans quelques instants.
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => reset()}>
            🔄 Réessayer
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = "/"}>
            🏠 Accueil
          </Button>
        </div>

        <div className="mt-16 text-6xl opacity-10">⚠️</div>
      </div>
    </div>
  );
}
