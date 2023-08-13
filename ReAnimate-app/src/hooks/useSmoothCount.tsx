import { useEffect, useRef, useState } from "react";
import useLinearFunction from "./useLinearFunction";

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
  const { values, intervals, setLinearNumbers } = useLinearFunction({
    transitionFrom,
    transitionTo,
    duration,
  });
  const [number, setNumber] = useState<number>(transitionFrom);
  const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    if (intervals.a !== 0) {
      console.log("a - ", intervals.a);
      intervalRef.current = setInterval(() => {
        setNumber((prev) => prev + 1);
      }, intervals.a);
    }
  }, [intervals.a]);

  function startAnimation() {
    clearInterval(intervalRef.current);
    setLinearNumbers(0.1, 1);
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
