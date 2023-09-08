import { useCallback, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";
import { easeLinear } from "../helpers/easingFunctions";

interface UseLinearComplexProps {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

function useLinearComplex({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearComplexProps) {
  const [linearComplexNumber, setLinearComplexNumber] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const linear = useRef(new Linear({ transitionFrom, transitionTo, duration }));
  const startTime = useRef<number>(0);

  const startLinearComplex = useCallback(
    async (x0: number, easingPoint: string | number, y0: number) => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      const { values, intervals } = linear.current.complex(x0, easingPoint, y0);
      const vX0 = values.numberX0;
      const vMid = values.numberMid;
      const vY0 = values.numberY0;

      const interval1 = intervals.interval1;
      const interval2 = intervals.interval2;

      // Define a promise-based animation function
      const animatePromise = (
        values: { v1: number; v2: number },
        intervalDuration: number
      ) => {
        return new Promise<void>((resolve) => {
          const animateCallback = (currentTime: number) => {
            const elapsedTime = currentTime - startTime.current;
            const progress = easeLinear(
              Math.min(elapsedTime / intervalDuration, 1)
            );
            const range = values.v2 - values.v1;
            const newValue = progress * range + values.v1;
            setLinearComplexNumber(newValue);

            if (progress < 1) {
              animationRef.current = requestAnimationFrame(animateCallback);
            } else {
              resolve(); // Resolve the promise when the animation is complete
            }
          };

          startTime.current = performance.now();
          animationRef.current = requestAnimationFrame(animateCallback);
        });
      };

      // Start the first animation and wait for it to complete
      await animatePromise({ v1: vX0, v2: vMid }, interval1);

      // Start the second animation and wait for it to complete
      await animatePromise({ v1: vMid, v2: vY0 }, interval2);
    },
    [duration]
  );

  function cancelLinearComplex() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    setLinearComplexNumber(0);
  }

  return { linearComplexNumber, startLinearComplex, cancelLinearComplex };
}

export default useLinearComplex;
