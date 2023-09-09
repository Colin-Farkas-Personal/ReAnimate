import { TPoint } from "../types/TEasingFunctions";

// Linear
export function easeLinear(t: number) {
  return t;
}

// Ease-in
export function easeCubicBezier(p1: TPoint, p2: TPoint, t: number): TPoint {
  // p0 and p1 are fixed values for the curve range
  const p0: TPoint = [0, 0];
  const p3: TPoint = [1, 1];
  // Ensure t is within the range [0, 1]
  t = Math.min(1, Math.max(0, t));

  const term1 = (1 - t) ** 3;
  const term2 = 3 * (1 - t) ** 2 * t;
  const term3 = 3 * (1 - t) * t ** 2;
  const term4 = t ** 3;

  // Calculate both x and y coordinates
  const x = term1 * p0[0] + term2 * p1[0] + term3 * p2[0] + term4 * p3[0];
  const y = term1 * p0[1] + term2 * p1[1] + term3 * p2[1] + term4 * p3[1];

  return [x, y];
}
