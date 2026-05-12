"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit avoir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la réinitialisation");
      }

      setSubmitted(true);
      reset();
      toast.success("Mot de passe réinitialisé!", {
        description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Mot de passe réinitialisé!</h2>
            <p className="text-muted-foreground mb-6">
              Votre mot de passe a été réinitialisé avec succès. Vous allez être
              redirigé vers la page de connexion.
            </p>

            <Link href="/auth/login">
              <Button className="w-full">Aller à la connexion</Button>
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
            <h1 className="text-2xl font-bold mb-2">Réinitialiser le mot de passe</h1>
            <p className="text-sm text-muted-foreground">
              Entrez un nouveau mot de passe sécurisé.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nouveau mot de passe <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Min. 8 caractères, 1 majuscule, 1 chiffre
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Traitement..." : "Réinitialiser le mot de passe"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Revenir à </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              la connexion
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
