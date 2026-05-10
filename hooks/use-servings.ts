import { useState, useMemo } from "react";
import { recalculateQuantity } from "@/lib/fractions";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
}

interface ServingsState {
  currentServings: number;
  baseServings: number;
}

export function useServings(
  baseServings: number,
  ingredients: Ingredient[]
) {
  const [currentServings, setCurrentServings] = useState(baseServings);

  const adjustedIngredients = useMemo(() => {
    return ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: recalculateQuantity(
        ingredient.quantity,
        baseServings,
        currentServings
      ),
    }));
  }, [ingredients, baseServings, currentServings]);

  const increment = () => {
    setCurrentServings((prev) => prev + 1);
  };

  const decrement = () => {
    setCurrentServings((prev) => Math.max(1, prev - 1));
  };

  const setServings = (value: number) => {
    if (value >= 1) {
      setCurrentServings(value);
    }
  };

  return {
    currentServings,
    baseServings,
    adjustedIngredients,
    increment,
    decrement,
    setServings,
  };
}
