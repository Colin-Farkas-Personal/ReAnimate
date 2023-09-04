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

  const startLinearComplex = useCallback(
    (x0: number, easingPoint: string | number, y0: number) => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      console.log("x0 easingPoint y0", x0, easingPoint, y0);

      const { values, intervals } = linear.current.complex(x0, easingPoint, y0);
      const vX0 = values.numberX0;
      const vMid = values.numberMid;
      const vY0 = values.numberY0;
      console.log("values - ", vX0, vMid, vY0);
      const interval1 = intervals.interval1;
      const interval2 = intervals.interval2;
      console.log("intervals - ", interval1, interval2);

      const startTime = performance.now();

      // 2 - 4 - 8
      // 1000ms - 500ms
      const animate = (
        currentTime: number,
        intervalDuration: number = interval1
      ) => {
        const elapsedTime = currentTime - startTime;

        const progress = easeLinear(
          Math.min(elapsedTime / intervalDuration, 1)
        );
        const range = vY0 - vX0;

        // 4% - 4 + 4
        const newValue = progress * range + vX0;
        setLinearComplexNumber(newValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else if (progress >= 1 && intervalDuration === interval1) {
          animationRef.current = requestAnimationFrame((newTime) =>
            animate(newTime, interval2)
          );
        }
      };

      animationRef.current = requestAnimationFrame(animate);
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
