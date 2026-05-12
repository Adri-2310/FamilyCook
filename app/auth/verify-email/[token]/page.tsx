"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function VerifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    verifyEmail();
  }, [params.token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur de vérification");
      }

      setVerified(true);
      toast.success("Email vérifié!", {
        description: "Vous pouvez maintenant vous connecter.",
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMsg);
      toast.error("Erreur", { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{
                backgroundColor: verified ? "#dcfce7" : error ? "#fee2e2" : "#dbeafe"
              }}>
              {loading && (
                <svg
                  className="w-8 h-8 text-blue-600 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {verified && (
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
              )}
              {error && (
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
          </div>

          {loading && (
            <>
              <h2 className="text-2xl font-bold mb-2">Vérification en cours...</h2>
              <p className="text-muted-foreground">
                Nous vérifions votre adresse email.
              </p>
            </>
          )}

          {verified && (
            <>
              <h2 className="text-2xl font-bold mb-2">Email vérifié!</h2>
              <p className="text-muted-foreground mb-6">
                Votre adresse email a été confirmée avec succès. Vous pouvez maintenant
                vous connecter à votre compte.
              </p>

              <Link href="/auth/login" className="inline-block w-full">
                <Button className="w-full">
                  Aller à la connexion
                </Button>
              </Link>
            </>
          )}

          {error && (
            <>
              <h2 className="text-2xl font-bold mb-2">Erreur</h2>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>

              <div className="space-y-2">
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Réessayer
                </Button>
                <Link href="/auth/login" className="inline-block w-full">
                  <Button variant="outline" className="w-full">
                    Aller à la connexion
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
