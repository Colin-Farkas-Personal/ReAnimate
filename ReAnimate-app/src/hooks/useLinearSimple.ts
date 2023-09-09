import { useState, useRef, useCallback } from "react";
import { Linear } from "../utilities/Linear";
import { easeLinear } from "../helpers/easingFunctions";
import {
  TAnimationCallback,
  animatePromise,
  calculateNewValue,
} from "../utilities/animate";

interface UseLinearSimpleProps {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

function useLinearSimple({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearSimpleProps) {
  const [linearSimpleNumber, setLinearNumber] = useState<number>(0);
  const linear = useRef(new Linear({ transitionFrom, transitionTo, duration }));

  const startLinearSimple = useCallback(
    (x0: number, y0: number) => {
      const { values } = linear.current.simple(x0, y0);
      const vX0 = values.numberX0;
      const vY0 = values.numberY0;

      const animationCallback = ({
        progress,
        from,
        to,
      }: TAnimationCallback) => {
        // Implement your animation based on the progress value
        const easeValue = easeLinear(progress);
        const newValue = calculateNewValue(easeValue, from, to);
        setLinearNumber(newValue);
      };

      animatePromise(animationCallback, duration, vX0, vY0);
    },
    [duration]
  );

  return { linearSimpleNumber, startLinearSimple };
}

export default useLinearSimple;
