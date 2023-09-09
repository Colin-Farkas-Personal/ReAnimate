import { useEffect, useState } from "react";
import useLinearComplex from "./useLinearComplex";
import {
  TLinearKeyWords,
  TLinearFunction,
  TCubicBezierKeyWords,
  TCubicBezierFunction,
  TPoint,
} from "../types/TEasingFunctions";
import useLinearSimple from "./useLinearSimple";
import useCubicBezier from "./useCubicBezier";
import {
  TRANSITION_FUNCTIONS,
  predefined,
} from "../types/PredefinedTransitionFunctions";

interface useNumberTransitionParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
  transitionType:
    | (TLinearKeyWords | TLinearFunction)
    | (TCubicBezierKeyWords | TCubicBezierFunction);
  decimalPlaces?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
type useNumberTransitionReturn = [string, () => void];

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
  const [numberValue, setNumberValue] = useState<number>(transitionFrom);

  const { linearSimpleNumber, startLinearSimple } = useLinearSimple({
    transitionFrom,
    transitionTo,
    duration,
  });
  useNumberSetter(linearSimpleNumber);
  const { linearComplexNumber, startLinearComplex } = useLinearComplex({
    transitionFrom,
    transitionTo,
    duration,
  });
  useNumberSetter(linearComplexNumber);

  const { cubicBezierNumber, startCubicBezier } = useCubicBezier({
    transitionFrom,
    transitionTo,
    duration,
  });
  useNumberSetter(cubicBezierNumber);

  function startTransition() {
    // Predefined transition functions
    if (typeof transitionType === "string") {
      switch (transitionType) {
        case TRANSITION_FUNCTIONS.LINEAR:
          startLinearSimple(...predefined[transitionType]);
          break;

        case TRANSITION_FUNCTIONS.EASE:
        case TRANSITION_FUNCTIONS.EASE_IN:
        case TRANSITION_FUNCTIONS.EASE_OUT:
        case TRANSITION_FUNCTIONS.EASE_IN_OUT:
          startCubicBezier(...predefined[transitionType]);
          break;
      }

      return;
    }

    // Defined transition functions
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
        const [x1, y1, x2, y2] = isTypeCubicBezier.cubicBezier;
        const p1: TPoint = [x1, y1];
        const p2: TPoint = [x2, y2];
        startCubicBezier(p1, p2);
        break;
      }

      default:
        throw new Error("Provide a valid transitionType");
        break;
    }
  }

  function useNumberSetter(value: number) {
    useEffect(() => {
      if (value !== undefined) setNumberValue(value);

      return () => {
        setNumberValue(0);
      };
    }, [value]);
  }

  return [numberValue.toFixed(decimalPlaces), startTransition];
}
export default useNumberTransition;
