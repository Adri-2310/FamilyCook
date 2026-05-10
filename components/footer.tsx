import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">FamilyCook</h3>
            <p className="text-sm text-muted-foreground">
              Partagez vos recettes en famille.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Produit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-foreground">
                  S'inscrire
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Ressources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 FamilyCook. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
