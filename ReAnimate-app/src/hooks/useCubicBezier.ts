import { useState, useRef, useCallback } from "react";
import { Linear } from "../utilities/Linear";
import { easeCubicBezier, easeLinear } from "../helpers/easingFunctions";

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
  const [cubicBezierNumber, setCubicBezierNumber] = useState<
    number | undefined
  >(undefined);
  const animationRef = useRef<number | null>(null);

  function startCubicBezier(p1: [number, number], p2: [number, number]) {
    const p0 = [0, 0];
    const p3 = [1, 1];

    function cubicBezierTransition(t: number): number {
      // Ensure t is within the range [0, 1]
      t = Math.min(1, Math.max(0, t));

      // Calculate intermediate values
      const term1 = (1 - t) ** 3;
      const term2 = 3 * (1 - t) ** 2 * t;
      const term3 = 3 * (1 - t) * t ** 2;
      const term4 = t ** 3;

      // Calculate x coordinate
      const x = term1 * p0[0] + term2 * p1[0] + term3 * p2[0] + term4 * p3[0];

      return x;
    }

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;

      const t = Math.min(elapsedTime / duration, 1);
      const numberValue = cubicBezierTransition(t);

      const range = transitionTo - transitionFrom;

      // 4% - 4 + 4
      const newValue = numberValue * range;
      console.log("new value - ", newValue);
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
