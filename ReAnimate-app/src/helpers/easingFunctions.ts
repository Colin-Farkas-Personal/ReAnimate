import { TPoint } from "../types/TEasingFunctions";

// Linear
export function easeLinear(t: number) {
  return t;
}

// De Casteljau's Algorithm
export function easeCubicBezier(p1: TPoint, p2: TPoint, t: number): TPoint {
  if (t < 0 || t > 1) {
    throw new Error("t must be between 0 and 1");
  }

  // Define the initial and final control points as arrays
  const p0: TPoint = [0, 0];
  const p3: TPoint = [1, 1];

  // Calculate intermediate control points
  const q0: TPoint = lerp(p0, p1, t);
  const q1: TPoint = lerp(p1, p2, t);
  const q2: TPoint = lerp(p2, p3, t);

  // Calculate points along the second set of lines
  const r0: TPoint = lerp(q0, q1, t);
  const r1: TPoint = lerp(q1, q2, t);

  // Calculate the final point on the curve
  const pointOnCurve: TPoint = lerp(r0, r1, t);

  // Calculate the average of x and y components
  return pointOnCurve;
}
function lerp(start: TPoint, end: TPoint, t: number): TPoint {
  return [start[0] * (1 - t) + end[0] * t, start[1] * (1 - t) + end[1] * t];
}
