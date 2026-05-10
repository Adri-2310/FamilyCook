"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { value: "APPETIZER", label: "Apéritif" },
  { value: "MAIN", label: "Plat principal" },
  { value: "DESSERT", label: "Dessert" },
  { value: "BREAKFAST", label: "Petit-déjeuner" },
  { value: "SAUCE", label: "Sauce" },
  { value: "BREAD", label: "Pain" },
  { value: "DRINK", label: "Boisson" },
  { value: "OTHER", label: "Autre" },
];

const DIFFICULTIES = [
  { value: "EASY", label: "Facile" },
  { value: "MEDIUM", label: "Moyen" },
  { value: "HARD", label: "Difficile" },
];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const selectedDifficulty = searchParams.get("difficulty");

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "ALL" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`/recipe/shared?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/recipe/shared");
  };

  const hasActiveFilters = selectedCategory || selectedDifficulty;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Catégorie</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter("category", "ALL")}
            className={`block w-full text-left px-3 py-2 rounded text-sm ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Toutes
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => updateFilter("category", cat.value)}
              className={`block w-full text-left px-3 py-2 rounded text-sm ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Difficulté</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter("difficulty", "ALL")}
            className={`block w-full text-left px-3 py-2 rounded text-sm ${
              !selectedDifficulty
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Toutes
          </button>
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.value}
              onClick={() => updateFilter("difficulty", diff.value)}
              className={`block w-full text-left px-3 py-2 rounded text-sm ${
                selectedDifficulty === diff.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Réinitialiser les filtres
        </Button>
      )}
    </Card>
  );
}
