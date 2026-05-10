const FRACTIONS: Record<number, string> = {
  0.125: "⅛",
  0.25: "¼",
  0.333: "⅓",
  0.375: "⅜",
  0.5: "½",
  0.625: "⅝",
  0.666: "⅔",
  0.75: "¾",
  0.875: "⅞",
};

export function decimalToFraction(decimal: number): string {
  const roundedDecimal = Math.round(decimal * 1000) / 1000;

  for (const [dec, frac] of Object.entries(FRACTIONS)) {
    if (Math.abs(parseFloat(dec) - roundedDecimal) < 0.01) {
      return frac;
    }
  }

  return roundedDecimal.toString();
}

export function formatQuantity(quantity: number): string {
  if (quantity === 0) return "0";

  const rounded = Math.round(quantity * 100) / 100;

  if (rounded === Math.floor(rounded)) {
    return rounded.toString();
  }

  return rounded.toFixed(2).replace(/\.?0+$/, "");
}

export function recalculateQuantity(
  baseQuantity: number,
  baseServings: number,
  desiredServings: number
): number {
  return (baseQuantity * desiredServings) / baseServings;
}

export function formatQuantityWithUnit(
  quantity: number,
  unit?: string
): { quantity: string; unit: string } {
  if (!unit) {
    return { quantity: formatQuantity(quantity), unit: "" };
  }

  const rounded = Math.round(quantity * 100) / 100;

  // Conversions
  if (unit === "kg" && rounded < 1) {
    return {
      quantity: formatQuantity(rounded * 1000),
      unit: "g",
    };
  }

  if (unit === "l" && rounded < 1) {
    return {
      quantity: formatQuantity(rounded * 1000),
      unit: "ml",
    };
  }

  if (unit === "cl" && rounded >= 10) {
    return {
      quantity: formatQuantity(rounded / 100),
      unit: "l",
    };
  }

  return { quantity: formatQuantity(quantity), unit };
}
