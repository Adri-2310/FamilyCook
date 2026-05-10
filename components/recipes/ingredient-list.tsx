"use client";

import { formatQuantity } from "@/lib/fractions";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  servingsModified: boolean;
}

export function IngredientList({
  ingredients,
  servingsModified,
}: IngredientListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Ingrédients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className={`flex items-center gap-3 py-2 px-3 rounded ${
              servingsModified ? "bg-amber-50 dark:bg-amber-950/20" : ""
            }`}
          >
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm">
              <span className="font-medium">
                {formatQuantity(ingredient.quantity)}
              </span>
              {ingredient.unit && <span className="ml-1">{ingredient.unit}</span>}
              <span className="ml-2">{ingredient.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
