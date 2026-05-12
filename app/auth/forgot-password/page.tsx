"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }

      setSubmitted(true);
      reset();
      toast.success("Email envoyé!", {
        description: "Vérifiez votre boîte email pour le lien de réinitialisation.",
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error("Erreur", { description: errorMsg });
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

            <h2 className="text-2xl font-bold mb-2">Email envoyé!</h2>
            <p className="text-muted-foreground mb-6">
              Vérifiez votre boîte email. Vous devriez recevoir un lien pour
              réinitialiser votre mot de passe dans quelques instants.
            </p>

            <p className="text-sm text-muted-foreground mb-6">
              N'oubliez pas de vérifier votre dossier spam si vous ne recevez
              rien.
            </p>

            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="w-full mb-3"
            >
              Renvoyer l'email
            </Button>

            <Link href="/auth/login" className="inline-block w-full">
              <Button variant="ghost" className="w-full">
                Retour à la connexion
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Mot de passe oublié</h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre email et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="vous@exemple.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Vous vous souvenez? </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
