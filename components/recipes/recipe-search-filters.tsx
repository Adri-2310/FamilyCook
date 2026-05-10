"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";

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

const SORT_OPTIONS = [
  { value: "recent", label: "Plus récentes" },
  { value: "oldest", label: "Plus anciennes" },
  { value: "a-z", label: "A → Z" },
  { value: "popular", label: "Plus likées" },
];

interface RecipeSearchFiltersProps {
  basePath?: string;
}

export function RecipeSearchFilters({ basePath = "/recipe/shared" }: RecipeSearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const selectedCategory = searchParams.get("category");
  const selectedDifficulty = searchParams.get("difficulty");
  const sort = searchParams.get("sort") || "recent";

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "ALL") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.set("page", "1");
      router.push(`${basePath}?${params.toString()}`);
    },
    [searchParams, router, basePath]
  );

  const handleSearch = () => {
    updateFilters({ search: query });
  };

  const handleClear = () => {
    setQuery("");
    updateFilters({ search: null });
  };

  const getCategoryLabel = () => {
    const cat = CATEGORIES.find((c) => c.value === selectedCategory);
    return cat ? cat.label : "Catégorie";
  };

  const getDifficultyLabel = () => {
    const diff = DIFFICULTIES.find((d) => d.value === selectedDifficulty);
    return diff ? diff.label : "Difficulté";
  };

  const getSortLabel = () => {
    const option = SORT_OPTIONS.find((o) => o.value === sort);
    return option ? option.label : "Trier";
  };

  return (
    <div className="bg-muted/30 rounded-lg p-6 mb-8 space-y-4">
      {/* Barre de recherche avec bouton */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Chercher une recette..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="pr-10"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch} className="px-6">
          Rechercher
        </Button>
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Catégorie */}
        <div className="relative inline-block group">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-muted rounded-lg hover:border-primary hover:bg-primary/5 text-sm font-medium transition">
            {getCategoryLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-muted rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            <button
              onClick={() => updateFilters({ category: null })}
              className={`block w-full text-left px-4 py-3 text-sm font-medium transition ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/50"
              }`}
            >
              Toutes les catégories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => updateFilters({ category: cat.value })}
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

        {/* Difficulté */}
        <div className="relative inline-block group">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-muted rounded-lg hover:border-primary hover:bg-primary/5 text-sm font-medium transition">
            {getDifficultyLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-muted rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            <button
              onClick={() => updateFilters({ difficulty: null })}
              className={`block w-full text-left px-4 py-3 text-sm font-medium transition ${
                !selectedDifficulty
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/50"
              }`}
            >
              Toutes les difficultés
            </button>
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff.value}
                onClick={() => updateFilters({ difficulty: diff.value })}
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

        {/* Tri */}
        <div className="relative inline-block group">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-muted rounded-lg hover:border-primary hover:bg-primary/5 text-sm font-medium transition">
            {getSortLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-muted rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilters({ sort: option.value })}
                className={`block w-full text-left px-4 py-3 text-sm transition ${
                  sort === option.value
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "hover:bg-muted/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bouton réinitialiser */}
        {(selectedCategory || selectedDifficulty || query) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery("");
              router.push(basePath);
            }}
            className="text-xs"
          >
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
}
