import { useState, useRef } from "react";
import { Linear } from "../utilities/Linear";
import { easeLinear } from "../helpers/easingFunctions";

interface useTransitionAnimationProps {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

const useLinearSimple2 = ({
  transitionFrom,
  transitionTo,
  duration,
}: useTransitionAnimationProps) => {
  const [linearNumber, setLinearNumber] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const linear = new Linear({ transitionFrom, transitionTo, duration });

  const startLinearTransition = (x0: number, y0: number) => {
    const { values } = linear.simple(x0, y0);
    const vX0 = values.numberX0;
    const vY0 = values.numberY0;
    console.log(vX0, vY0);

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();

    const increment = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;

      const progress = easeLinear(Math.min(elapsedTime / duration, 1));
      const range = vY0 - vX0;

      // 4% - 4 + 4
      const newValue = progress * range + vX0;
      newValue.toFixed(0);
      setLinearNumber(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(increment);
      }
    };

    animationRef.current = requestAnimationFrame(increment);
  };

  const cancelTransition = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    setLinearNumber(0);
  };

  return { linearNumber, startLinearTransition, cancelTransition };
};

export default useLinearSimple2;
