"use client";

import { formatQuantityWithUnit } from "@/lib/fractions";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Ingrédients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient) => {
          const { quantity, unit } = formatQuantityWithUnit(
            ingredient.quantity,
            ingredient.unit
          );

          return (
            <li
              key={ingredient.id}
              className="flex items-center gap-3 py-2 px-3 rounded"
            >
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm">
                <span className="font-medium">{quantity}</span>
                {unit && <span className="ml-1">{unit}</span>}
                <span className="ml-2">{ingredient.name}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
