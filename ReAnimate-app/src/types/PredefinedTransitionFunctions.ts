import {
  TCubicBezierKeyWords,
  TLinearKeyWords,
  TPoint,
} from "./TEasingFunctions";

export const TRANSITION_FUNCTIONS = {
  LINEAR: "linear" as TLinearKeyWords,
  EASE_IN: "easeIn" as TCubicBezierKeyWords,
  EASE: "ease" as TCubicBezierKeyWords,
  EASE_OUT: "easeOut" as TCubicBezierKeyWords,
  EASE_IN_OUT: "easeInOut" as TCubicBezierKeyWords,
};

export const predefined = {
  linear: [0, 1] as TPoint,
  easeIn: [
    [0.42, 0.0],
    [1.0, 1.0],
  ] as [TPoint, TPoint],
  ease: [
    [0.25, 0.1],
    [0.25, 1.0],
  ] as [TPoint, TPoint],
  easeOut: [
    [0.0, 0.0],
    [0.58, 1.0],
  ] as [TPoint, TPoint],
  easeInOut: [
    [0.42, 0.0],
    [0.58, 1.0],
  ] as [TPoint, TPoint],
};
