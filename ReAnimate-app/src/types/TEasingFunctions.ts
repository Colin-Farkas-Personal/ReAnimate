export type TLinearKeyWords = "linear";
export type TLinearFunction = {
  linear:
    | { x0: number; y0: number }
    | { x0: number; easingPoint: number | string; y0: number };
};

export type TCubicBezierKeyWords = "ease" | "easeIn" | "easeOut" | "easeInOut";
export type TPoint = [number, number];
export type TCubicBezier = [TPoint, TPoint];
export type TCubicBezierFunction = {
  cubicBezier: [number, number, number, number];
};
