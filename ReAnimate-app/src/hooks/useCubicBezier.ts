import { useState, useRef, useCallback } from "react";
import { easeCubicBezier } from "../helpers/easingFunctions";
import { TPoint } from "../types/TEasingFunctions";

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
  const animationRef = useRef<number | null>(null);

  function startCubicBezier(p1: TPoint, p2: TPoint) {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;

      const t = Math.min(elapsedTime / duration, 1);
      const [easingValueX, easingValueY] = easeCubicBezier(p1, p2, t);

      // 0-100 or 100-0
      const range = transitionTo - transitionFrom;

      // 4% - 4 + 4
      const newValue =
        ((easingValueX + easingValueY) / 2) * (range + transitionFrom);
      setCubicBezierNumber(newValue);

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }
  function cancelCubicBezier() {}

  return { cubicBezierNumber, startCubicBezier, cancelCubicBezier };
}

export default useCubicBezier;
