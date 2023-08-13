import { useEffect, useRef, useState } from "react";
import { Linear } from "../utilities/linear";

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

  const linear = new Linear({ transitionFrom, transitionTo, duration });
  const [values, setValues] = useState<{
    numberX0: number | undefined;
    numberY0: number | undefined;
  }>({
    numberX0: undefined,
    numberY0: undefined,
  });
  const [intervals, setIntervals] = useState<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (
      intervals !== undefined &&
      Object.values(values).every((item) => item !== undefined)
    ) {
      intervalRef.current = setInterval(() => {
        if (values.numberX0! > values.numberY0!) {
          setNumber((prev) => prev - 1);
        } else if (values.numberX0! < values.numberY0!) {
          setNumber((prev) => prev + 1);
        }
      }, 500);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [intervals]);

  useEffect(() => {
    console.log("number, numberY0 - ", number, values.numberY0!);
    if (number == values.numberY0) clearInterval(intervalRef.current);
  }, [number]);

  function startAnimation() {
    setNumber(transitionFrom);
    const { interval, values } = linear.simple(0, 1);

    setValues((prev) => ({
      ...prev,
      numberX0: values.numberX0,
      numberY0: values.numberY0,
    }));
    setIntervals(interval);
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
