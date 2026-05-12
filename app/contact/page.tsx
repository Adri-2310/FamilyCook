"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  type: z.enum(["BUG", "FEEDBACK", "QUESTION"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type" }),
  }),
  message: z.string().min(10, "Le message doit avoir au moins 10 caractères").max(5000, "Le message ne peut pas dépasser 5000 caractères"),
  website: z.string().optional().default(""), // Honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.website) {
      // Simuler une soumission réussie pour les bots
      setSubmitted(true);
      setReferenceNumber("MSG-20260512-00001");
      return;
    }

    try {
      setApiError("");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          type: data.type,
          message: data.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }

      const result = await response.json();
      setReferenceNumber(result.referenceNumber);
      setSubmitted(true);
      reset();
      toast.success("Message envoyé avec succès!", {
        description: `Numéro de référence: ${result.referenceNumber}`,
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Une erreur est survenue";
      setApiError(errorMsg);
      toast.error("Erreur lors de l'envoi", {
        description: errorMsg,
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
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

            <h2 className="text-2xl font-bold mb-2">Message envoyé avec succès!</h2>
            <p className="text-muted-foreground mb-6">
              Merci pour votre message. Nous vous recontacterons au plus tôt.
            </p>

            <div className="bg-slate-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">
                Numéro de référence:
              </p>
              <p className="text-lg font-mono font-bold text-slate-900">
                {referenceNumber}
              </p>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Conservez ce numéro pour suivre votre demande.
            </p>

            <Button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto"
            >
              Envoyer un autre message
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Nous contacter</h1>
            <p className="text-muted-foreground">
              Avez-vous une question, un bug à signaler ou une suggestion?
              Remplissez le formulaire ci-dessous et nous vous répondrons dans
              les meilleurs délais.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {apiError}
              </div>
            )}

            {/* Honeypot field - hidden from users */}
            <input
              {...register("website")}
              type="text"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <Input
                {...register("name")}
                placeholder="Jean Dupont"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

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

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Type de message <span className="text-red-500">*</span>
              </label>
              <select
                {...register("type")}
                className={`w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">-- Sélectionnez --</option>
                <option value="BUG">Bug/Problème technique</option>
                <option value="FEEDBACK">Suggestion/Retour</option>
                <option value="QUESTION">Question générale</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("message")}
                placeholder="Décrivez votre message..."
                rows={5}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Maximum 5000 caractères
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Nous répondrons à votre message au plus tôt. Merci de votre patience.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
