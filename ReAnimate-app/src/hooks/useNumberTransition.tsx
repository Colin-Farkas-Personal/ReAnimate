import { useEffect, useState } from "react";
import useLinearSimple from "./useLinearSimple";
import useLinearComplex from "./useLinearComplex";

type TLinear = {
  linear:
    | { x0: number; y0: number }
    | { x0: number; easingPoint: number | string; y0: number };
};

interface useNumberTransitionParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
  transitionType: TLinear;
}
interface useNumberTransitionReturn {
  number: number;
  startAnimation: () => void;
}

/**
 * A custom hook that manages transitions between numbers using different easing types.
 *
 * @param {number} transitionFrom - Number to start the transition from.
 * @param {number} transitionTo - Number to transition to.
 * @param {number} duration - Total duration of the transition in milliseconds.
 * @param {TLinear} transitionType - Type of transition to apply. Can be linear, cubicBezier, or step.
 *
 * @returns {useNumberTransitionReturn} An object containing the current number and a function to start the animation.
 */
function useNumberTransition({
  transitionFrom,
  transitionTo,
  duration,
  transitionType,
}: useNumberTransitionParams): useNumberTransitionReturn {
  const [number, setNumber] = useState<number>(transitionFrom);

  const { linearSimpleNumber, startLinearSimple } = useLinearSimple({
    transitionFrom,
    transitionTo,
    duration,
  });
  const { linearComplexNumber, startLinearComplex } = useLinearComplex({
    transitionFrom,
    transitionTo,
    duration,
  });

  useEffect(() => {
    console.log("linearSimple (nothinng) - ", linearSimpleNumber);
    if (linearSimpleNumber !== undefined) {
      console.log("simple - ", linearSimpleNumber);
      setNumber(linearSimpleNumber);
      return;
    }

    if (linearComplexNumber !== undefined) {
      console.log("complex - ", linearComplexNumber);
      setNumber(linearComplexNumber);
      return;
    }
  }, [linearSimpleNumber, linearComplexNumber]);

  function startAnimation() {
    if (typeof transitionType === "string" && transitionType === "linear") {
      linearTransition();
    }

    // Linear logic
    const selectedTransitionType = Object.keys(transitionType).toString();
    console.log("selectedTransitionType - ", selectedTransitionType);
    switch (selectedTransitionType) {
      case "linear": {
        if ("easingPoint" in transitionType.linear) {
          const { x0, easingPoint, y0 } = transitionType.linear;
          startLinearComplex(x0, easingPoint, y0);
        } else {
          const { x0, y0 } = transitionType.linear;
          startLinearSimple(x0, y0);
        }
        break;
      }

      default:
        throw new Error("Provide a valid transitionType");
        break;
    }
  }

  function linearTransition() {
    startLinearSimple(0, 1);
  }

  return { number, startAnimation };
}
export default useNumberTransition;
