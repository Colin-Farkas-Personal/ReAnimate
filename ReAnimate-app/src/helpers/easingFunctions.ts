// Linear
export function easeLinear(t: number) {
  return t;
}

// Ease-in
export function easeCubicBezier(
  p1: [number, number],
  p2: [number, number],
  t: number
): number {
  // Ensure t is within the range [0, 1]
  t = Math.min(1, Math.max(0, t));

  // Calculate intermediate values
  const term1 = (1 - t) ** 3 * 0;
  const term2 = 3 * (1 - t) ** 2 * t * p1[0];
  const term3 = 3 * (1 - t) * t ** 2 * p2[0];
  const term4 = t ** 3 * 1;

  // Combine the intermediate terms to calculate cubicBezierValue
  const cubicBezierValue = term1 + term2 + term3 + term4;

  // Scale the value to go from 0 to 10

  return cubicBezierValue;
}

// Ease-out
export function easeOut(t: number): number {
  return Math.sin((t * Math.PI) / 2);
}

// Ease-out
export function easeInOut(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}
