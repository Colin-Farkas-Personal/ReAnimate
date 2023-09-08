import { useEffect, useState } from "react";
import useLinearComplex from "./useLinearComplex";
import {
  TLinearKeyWords,
  TLinearFunction,
  TCubicBezierKeyWords,
  TCubicBezierFunction,
} from "../types/TEasingFunctions";
import useLinearSimple from "./useLinearSimple";
import useCubicBezier from "./useCubicBezier";

interface useNumberTransitionParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
  transitionType:
    | (TLinearKeyWords | TLinearFunction)
    | (TCubicBezierKeyWords | TCubicBezierFunction);
  decimalPlaces?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
interface useNumberTransitionReturn {
  number: string;
  startTransition: () => void;
}

/**
 * A custom hook that manages transitions between numbers using different easing types.
 *
 * @param {number} transitionFrom - Number to start the transition from.
 * @param {number} transitionTo - Number to transition to.
 * @param {number} duration - Total duration of the transition in milliseconds.
 * @param {TLinearFunction} transitionType - Type of transition to apply. Can be linear, cubicBezier, or step.
 * @param {TLinearFunction} decimalPlaces - Number of decimal places (0-6). If not specified, is set to 0.
 *
 * @returns {useNumberTransitionReturn} An object containing the current number (as a string) and a function to start the animation.
 */
function useNumberTransition({
  transitionFrom,
  transitionTo,
  duration,
  transitionType,
  decimalPlaces,
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

  const { cubicBezierNumber, startCubicBezier } = useCubicBezier({
    transitionFrom,
    transitionTo,
    duration,
  });

  useEffect(() => {
    if (linearSimpleNumber !== undefined) {
      setNumber(linearSimpleNumber);
    }

    return () => {
      setNumber(0);
    };
  }, [linearSimpleNumber]);

  useEffect(() => {
    if (linearComplexNumber !== undefined) {
      setNumber(linearComplexNumber);
    }

    return () => {
      setNumber(0);
    };
  }, [linearComplexNumber]);

  useEffect(() => {
    if (cubicBezierNumber !== undefined) {
      setNumber(cubicBezierNumber);
    }

    return () => {
      setNumber(0);
    };
  }, [cubicBezierNumber]);

  function startTransition() {
    if (typeof transitionType === "string") {
      switch (transitionType) {
        case "linear": {
          startLinearSimple(0, 1);
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
      case "cubicBezier": {
        const isTypeCubicBezier = transitionType as TCubicBezierFunction;
        const { x1, y1, x2, y2 } = isTypeCubicBezier.cubicBezier;
        startCubicBezier([x1, x2], [y1, y2]);
        break;
      }

      default:
        throw new Error("Provide a valid transitionType");
        break;
    }
  }

  return {
    number: number.toFixed(decimalPlaces),
    startTransition,
  };
}
export default useNumberTransition;
