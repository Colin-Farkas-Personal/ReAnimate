import { useEffect, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";
import useLinearSimple from "./useLinearSimple";
import useLinearComplex from "./useLinearComplex";

type TransitionType = {
  linear: [x0: number, easingPoint: number | string | undefined, y0: number];
};

interface UseSmoothCountParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
  transitionType: TransitionType | "linear";
}
interface UseSmoothCountReturn {
  number: number;
  startAnimation: () => void;
}

function useSmoothCount({
  transitionFrom,
  transitionTo,
  duration,
  transitionType,
}: UseSmoothCountParams): UseSmoothCountReturn {
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
    setNumber(linearSimpleNumber);
  }, [linearSimpleNumber]);

  function startAnimation() {
    startLinearSimple(0.1, 0.8);
  }
  return { number, startAnimation };
}
export default useSmoothCount;

// if (typeof transitionType === "string" && transitionType === "linear") {
//   setLinearNumbers(0, 1);
// }

// const { linear } = transitionType as TransitionType;
// const selectedTransitionType = Object.keys(transitionType).toString();
// switch (selectedTransitionType) {
//   case "linear": {
//     const [x0, easingPoint, y0] = linear;
//     setLinearNumbers(x0, easingPoint, y0);
//     break;
//   }

//   default:
//     setLinearNumbers(0, 1);
//     break;
// }
