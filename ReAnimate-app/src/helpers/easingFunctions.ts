// Linear
export function easeLinear(t: number) {
  return t;
}

// Ease-in
export function easeIn(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2);
}

// Ease-out
export function easeOut(t: number): number {
  return Math.sin((t * Math.PI) / 2);
}

// Ease-out
export function easeInOut(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}
