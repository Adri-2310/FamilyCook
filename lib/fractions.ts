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
  const whole = Math.floor(quantity);
  const decimal = quantity - whole;

  if (decimal === 0) {
    return whole.toString();
  }

  const fraction = decimalToFraction(decimal);

  if (whole === 0) {
    return fraction;
  }

  return `${whole} ${fraction}`;
}

export function recalculateQuantity(
  baseQuantity: number,
  baseServings: number,
  desiredServings: number
): number {
  return (baseQuantity * desiredServings) / baseServings;
}
