import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur FamilyCook</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Partagez vos recettes favorites avec votre famille
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg">Rejoindre FamilyCook</Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Se connecter
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-y">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Créez votre compte",
                description: "Inscription simple et gratuite",
              },
              {
                step: 2,
                title: "Ajoutez vos recettes",
                description: "Partagez vos créations culinaires",
              },
              {
                step: 3,
                title: "Partagez avec votre famille",
                description: "Accédez à toutes les recettes",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
