"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      await signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onSuccess: () => {
            router.push("/auth/login");
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Erreur d'inscription");
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
        <h1 className="text-2xl font-bold mb-2">S'inscrire</h1>
        <p className="text-sm text-muted-foreground">
          Créez votre compte gratuitement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <Input
            type="text"
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          <p className="text-xs text-muted-foreground mt-1">
            Minimum 8 caractères
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Confirmer le mot de passe
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
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
          S'inscrire avec Google (Bientôt)
        </Button>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Vous avez déjà un compte ? </span>
        <Link href="/auth/login" className="text-primary hover:underline">
          Se connecter
        </Link>
      </div>
    </Card>
  );
}
