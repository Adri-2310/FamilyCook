"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RecipeForm } from "@/components/recipe-form";

export default function NewRecipePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session?.user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Créer une nouvelle recette</h1>
        <RecipeForm />
      </div>
    </div>
  );
}
