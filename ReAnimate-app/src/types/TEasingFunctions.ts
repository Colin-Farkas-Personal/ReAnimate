export type TLinearKeyWords = "linear";
export type TLinearFunction = {
  linear:
    | { x0: number; y0: number }
    | { x0: number; easingPoint: number | string; y0: number };
};

export type TCubicBezierKeyWords = "ease" | "easeIn" | "easeOut" | "easeInOut";
export type TCubicBezierFunction = {
  cubicBezier: { x1: number; y1: number; x2: number; y2: number };
};
