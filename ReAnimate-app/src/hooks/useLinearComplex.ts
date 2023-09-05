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

      // 2 - 4 - 8
      // 1000ms - 500ms

      // first

      startTime.current = performance.now();
      console.log("START - ", startTime.current);
      const animation1Promise = new Promise((resolve, reject) => {
        animationRef.current = requestAnimationFrame((currentTime) => {
          animate(currentTime, { v1: vX0, v2: vMid }, interval1);
          resolve("Success!");
        });
      });

      console.log("linearComplexNumber ### - ", linearComplexNumber);
      animation1Promise.then(() => {
        startTime.current = performance.now();
        console.log("START #2 - ", startTime.current);
        animationRef.current = requestAnimationFrame((currentTime) =>
          animate(currentTime, { v1: vMid, v2: vY0 }, interval2)
        );
      });
    },
    [duration]
  );

  const animate = (
    currentTime: number,
    values: { v1: number; v2: number },
    intervalDuration: number
  ) => {
    const elapsedTime = currentTime - startTime.current;
    console.log("current - starttime", currentTime, startTime);
    console.log("interval - ", intervalDuration);

    const progress = easeLinear(Math.min(elapsedTime / intervalDuration, 1));
    console.log("PROGRESS - ", progress);
    const range = values.v2 - values.v1;

    // 4% - 4 + 4
    const newValue = progress * range + values.v1;
    setLinearComplexNumber(newValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame((newCurrentTime) =>
        animate(newCurrentTime, values, intervalDuration)
      );
    }
  };

  function cancelLinearComplex() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    setLinearComplexNumber(0);
  }

  return { linearComplexNumber, startLinearComplex, cancelLinearComplex };
}

export default useLinearComplex;
