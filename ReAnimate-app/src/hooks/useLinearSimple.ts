import { useState, useRef, useCallback } from "react";
import { Linear } from "../utilities/Linear";
import { easeLinear } from "../helpers/easingFunctions";

interface useTransitionAnimationProps {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

function useLinearSimple({
  transitionFrom,
  transitionTo,
  duration,
}: useTransitionAnimationProps) {
  const [linearSimpleNumber, setLinearNumber] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const linear = useRef(new Linear({ transitionFrom, transitionTo, duration }));

  const startLinearSimple = useCallback(
    (x0: number, y0: number) => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      const { values } = linear.current.simple(x0, y0);
      const vX0 = values.numberX0;
      const vY0 = values.numberY0;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;

        const progress = easeLinear(Math.min(elapsedTime / duration, 1));
        const range = vY0 - vX0;

        // 4% - 4 + 4
        const newValue = progress * range + vX0;
        setLinearNumber(newValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [duration]
  );

  function cancelLinearSimple() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    setLinearNumber(0);
  }

  return { linearSimpleNumber, startLinearSimple, cancelLinearSimple };
}

export default useLinearSimple;
