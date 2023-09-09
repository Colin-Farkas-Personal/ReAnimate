import { useCallback, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";
import { easeLinear } from "../helpers/easingFunctions";
import {
  TAnimationCallback,
  animatePromise,
  calculateNewValue,
} from "../utilities/animate";

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
    async (x0: number, easingPoint: string | number, y0: number) => {
      const { values, intervals } = linear.current.complex(x0, easingPoint, y0);
      const vX0 = values.numberX0;
      const vMid = values.numberMid;
      const vY0 = values.numberY0;

      const interval1 = intervals.interval1;
      const interval2 = intervals.interval2;

      // Define a promise-based animation function
      const animationCallback = ({
        progress,
        from,
        to,
      }: TAnimationCallback) => {
        const easeValue = easeLinear(progress);
        const newValue = calculateNewValue(easeValue, from, to);
        setLinearComplexNumber(newValue);
      };

      // Start the first animation and wait for it to complete
      await animatePromise(animationCallback, interval1, vX0, vMid);
      await animatePromise(animationCallback, interval2, vMid, vY0);
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
