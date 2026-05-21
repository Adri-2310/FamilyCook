"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const callbackURL = searchParams.get("callbackURL") || "/";

      if (!token) {
        setStatus("error");
        setMessage("Token de vérification manquant");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setStatus("success");
          setMessage("Email vérifié avec succès ! Redirection...");
          setTimeout(() => router.push(callbackURL || "/auth/login"), 2000);
        } else {
          const error = await response.json();
          setStatus("error");
          setMessage(error.message || "Erreur lors de la vérification");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Erreur serveur");
        console.error(error);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-800 p-8 text-center">
        {status === "loading" && (
          <>
            <div className="mb-4 inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-slate-600 border-t-green-500 rounded-full"></div>
            </div>
            <h1 className="text-xl font-semibold text-slate-100">Vérification en cours...</h1>
            <p className="mt-2 text-slate-400">Veuillez patienter</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <svg
                  className="h-6 w-6 text-green-500"
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
            <h1 className="text-xl font-semibold text-green-500">Succès !</h1>
            <p className="mt-2 text-slate-400">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                <svg
                  className="h-6 w-6 text-red-500"
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
              </div>
            </div>
            <h1 className="text-xl font-semibold text-red-500">Erreur</h1>
            <p className="mt-2 text-slate-400">{message}</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-6 rounded-lg bg-slate-700 px-4 py-2 text-slate-100 hover:bg-slate-600"
            >
              Retour à la connexion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
