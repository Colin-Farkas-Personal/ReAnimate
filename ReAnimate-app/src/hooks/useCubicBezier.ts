import { useState, useRef, useCallback } from "react";
import { easeCubicBezier } from "../helpers/easingFunctions";
import { TPoint } from "../types/TEasingFunctions";
import {
  TAnimationCallback,
  animatePromise,
  calculateNewValue,
} from "../utilities/animate";

interface UseCubicBezierProps {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

function useCubicBezier({
  transitionFrom,
  transitionTo,
  duration,
}: UseCubicBezierProps) {
  const [cubicBezierNumber, setCubicBezierNumber] = useState<number>(0);

  function startCubicBezier(p1: TPoint, p2: TPoint) {
    const animationCallback = ({ progress, from, to }: TAnimationCallback) => {
      const [x, y] = easeCubicBezier(p1, p2, progress);
      const easeValue = (x + y) / 2;
      const newValue = calculateNewValue(easeValue, from, to);
      setCubicBezierNumber(newValue);
    };

    animatePromise(animationCallback, duration, transitionFrom, transitionTo);
  }
  function cancelCubicBezier() {}

  return { cubicBezierNumber, startCubicBezier, cancelCubicBezier };
}

export default useCubicBezier;
