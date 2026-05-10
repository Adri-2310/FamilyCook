"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            router.push("/recipes");
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Erreur de connexion");
          },
        }
      );
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Se connecter</h1>
        <p className="text-sm text-muted-foreground">
          Bienvenue sur FamilyCook
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mot de passe</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">
              ou
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full" disabled>
          Se connecter avec Google (Bientôt)
        </Button>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Pas encore de compte ? </span>
        <Link href="/auth/register" className="text-primary hover:underline">
          S'inscrire
        </Link>
      </div>
    </Card>
  );
}
