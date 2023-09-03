import { useEffect, useState } from "react";
import useLinearSimple from "./useLinearSimple";
import useLinearComplex from "./useLinearComplex";
import {
  TLinearKeyWords,
  TLinearFunction,
  TCubicBezierKeyWords,
  TCubicBezierFunction,
} from "../types/TEasingFunctions";
import useLinearSimple2 from "./useLinearSimple2";

interface useNumberTransitionParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
  transitionType:
    | (TLinearKeyWords | TLinearFunction)
    | (TCubicBezierKeyWords | TCubicBezierFunction);
}
interface useNumberTransitionReturn {
  number: number;
  startTransition: () => void;
}

/**
 * A custom hook that manages transitions between numbers using different easing types.
 *
 * @param {number} transitionFrom - Number to start the transition from.
 * @param {number} transitionTo - Number to transition to.
 * @param {number} duration - Total duration of the transition in milliseconds.
 * @param {TLinearFunction} transitionType - Type of transition to apply. Can be linear, cubicBezier, or step.
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

  const { linearNumber, startLinearTransition } = useLinearSimple2({
    transitionFrom,
    transitionTo,
    duration,
  });

  useEffect(() => {
    if (linearNumber !== undefined) {
      setNumber(linearNumber);
    }
  }, [linearNumber]);

  function startTransition() {
    if (typeof transitionType === "string") {
      switch (transitionType) {
        case "linear": {
          console.log("(#0) linear");
          startLinearTransition(0.2, 0.4);
          break;
        }

        case "ease": {
          // easeTransition
        }
      }

      return;
    }

    // Linear logic
    const selectedTransitionType = Object.keys(transitionType).toString();
    console.log("selectedTransitionType - ", selectedTransitionType);
    switch (selectedTransitionType) {
      case "linear": {
        const isTypeLinear = transitionType as TLinearFunction;
        if ("easingPoint" in isTypeLinear.linear) {
          const { x0, easingPoint, y0 } = isTypeLinear.linear;
          startLinearComplex(x0, easingPoint, y0);
        } else {
          const { x0, y0 } = isTypeLinear.linear;
          startLinearSimple(x0, y0);
        }
        break;
      }

      default:
        throw new Error("Provide a valid transitionType");
        break;
    }
  }

  return { number, startTransition };
}
export default useNumberTransition;
