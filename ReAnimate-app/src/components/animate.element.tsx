import { MutableRefObject, useEffect, useRef } from "react";
import useLinearSimple from "../hooks/useLinearSimple";
import useNumberTransition from "../hooks/useNumberTransition";

type TTriggerOn = "onMount" | "onHover" | "onClick";
type TTransformProperties = {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
};
type TTransitionEasingFunctions = {
  // linear, cubicBezier;
};
type TTransitionProperties = {
  // accelleration, weight, inertia,
};
const defaultTransformProperties: TTransformProperties = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  opacity: 1,
};

interface ElementProps {
  triggerOn: TTriggerOn | TTriggerOn[];
  transitionFrom?: TTransformProperties;
  transitionTo?: TTransformProperties;
  duration: number;
  transitionProperties?: TTransitionEasingFunctions | TTransitionProperties;
  children: JSX.Element;
}
const reAnimate = {
  element: function ({
    triggerOn,
    transitionFrom = defaultTransformProperties,
    transitionTo = defaultTransformProperties,
    duration,
    transitionProperties,
    children,
  }: ElementProps) {
    const reAnimateElementRef = useRef<HTMLDivElement | null>(null);
    const [transitionNumber, startAnimation] = useNumberTransition({
      transitionFrom: 0,
      transitionTo: 100,
      duration: 1500,
      transitionType: "easeIn",
    });
    // "onMount"
    //     <reAnimate.element
    //     triggerOn="onMount"
    //     from={{ visibility: 0 }}
    //     to={{ visibility: 100 }}
    //     duration={1000}
    //   >
    // linear

    useEffect(() => {
      const element = reAnimateElementRef.current;
      if (element && transitionNumber !== "") {
        console.log("transitionNumber - ", transitionNumber);
        element.style.opacity = `${transitionNumber}%`;
        // Change the visibility by modifying the style property
      }
    }, [transitionNumber]);

    useEffect(() => {
      const element = reAnimateElementRef.current;
      if (element) {
        element.style.opacity = "0";
        //
      }
    }, []);

    return (
      <div
        onClick={startAnimation}
        ref={reAnimateElementRef}
        className="transition-element"
      >
        {children}
      </div>
    );
  },
};
export default reAnimate;
