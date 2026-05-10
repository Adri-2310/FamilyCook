"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
  const [openCategory, setOpenCategory] = useState(false);
  const [openDifficulty, setOpenDifficulty] = useState(false);

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

  const getCategoryLabel = () => {
    const cat = CATEGORIES.find((c) => c.value === selectedCategory);
    return cat ? cat.label : "Catégorie";
  };

  const getDifficultyLabel = () => {
    const diff = DIFFICULTIES.find((d) => d.value === selectedDifficulty);
    return diff ? diff.label : "Difficulté";
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative inline-block group">
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-muted rounded-lg hover:border-primary hover:bg-primary/5 text-sm font-medium transition">
          {getCategoryLabel()}
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-muted rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
          <button
            onClick={() => {
              updateFilter("category", "ALL");
              setOpenCategory(false);
            }}
            className={`block w-full text-left px-4 py-3 text-sm font-medium transition ${
              !selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
            }`}
          >
            Toutes les catégories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                updateFilter("category", cat.value);
                setOpenCategory(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm transition ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative inline-block group">
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-muted rounded-lg hover:border-primary hover:bg-primary/5 text-sm font-medium transition">
          {getDifficultyLabel()}
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-muted rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
          <button
            onClick={() => {
              updateFilter("difficulty", "ALL");
              setOpenDifficulty(false);
            }}
            className={`block w-full text-left px-4 py-3 text-sm font-medium transition ${
              !selectedDifficulty ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
            }`}
          >
            Toutes les difficultés
          </button>
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.value}
              onClick={() => {
                updateFilter("difficulty", diff.value);
                setOpenDifficulty(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm transition ${
                selectedDifficulty === diff.value
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted/50"
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
          className="text-xs"
        >
          Réinitialiser
        </Button>
      )}
    </div>
  );
}
