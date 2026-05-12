"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          onSuccess: async () => {
            // Send verification email
            try {
              const response = await fetch("/api/auth/send-verification-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });

              if (!response.ok) {
                console.error("Failed to send verification email");
              }
            } catch (err) {
              console.error("Error sending verification email:", err);
            }

            setSubmitted(true);
            toast.success("Inscription réussie!", {
              description: "Un email de vérification a été envoyé.",
            });
          },
          onError: (ctx) => {
            const errorMsg = ctx.error.message || "Erreur d'inscription";
            setError(errorMsg);
            toast.error("Erreur", { description: errorMsg });
          },
        }
      );
    } catch (err) {
      const errorMsg = "Une erreur est survenue";
      setError(errorMsg);
      toast.error("Erreur", { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Card className="p-8 text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Vérifiez votre email</h2>
            <p className="text-muted-foreground mb-6">
              Un email de vérification a été envoyé à <strong>{email}</strong>.
              Cliquez sur le lien pour confirmer votre adresse email.
            </p>

            <p className="text-sm text-muted-foreground mb-6">
              N'oubliez pas de vérifier votre dossier spam si vous ne recevez rien.
            </p>

            <Link href="/auth/login" className="inline-block w-full">
              <Button variant="outline" className="w-full">
                Retour à la connexion
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

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
