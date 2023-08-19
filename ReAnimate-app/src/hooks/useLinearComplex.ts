import { useEffect, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";
import isObjEmpty from "../helpers/isObjEmpty";

// hook for getting linear number with easingPoint
interface UseLinearComplexParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}
interface UseLinearComplexReturn {
  linearComplexNumber: number;
  startLinearComplex: (
    x0: number,
    easingPoint: number | string,
    y0: number
  ) => void;
}

interface IValues {
  numberX0?: number;
  numberMid?: number;
  numberY0?: number;
}

interface IIntervalSpeed {
  interval1?: number;
  interval2?: number;
}

function useLinearComplex({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearComplexParams): UseLinearComplexReturn {
  const [linearComplexNumber, setLinearComplexNumber] =
    useState<number>(transitionFrom);

  const linear = new Linear({ transitionFrom, transitionTo, duration });
  const [values, setValues] = useState<IValues>({});
  const [intervalSpeeds, setIntervalSpeeds] = useState<IIntervalSpeed>({});
  const intervalARef = useRef<number | undefined>(undefined);
  const intervalBRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (
      !isObjEmpty(intervalSpeeds) &&
      !isObjEmpty(values) &&
      !intervalARef.current
    ) {
      // First interval
      intervalARef.current = setInterval(() => {
        setLinearComplexNumber((prev) =>
          linear.getDirectionNumber(values.numberX0!, values.numberMid!, prev)
        );
      }, intervalSpeeds.interval1);
    }
  }, [intervalSpeeds.interval1]);

  useEffect(() => {
    if (intervalARef.current && linearComplexNumber == values.numberMid) {
      clearInterval(intervalARef.current);
      intervalARef.current = undefined;

      // Second interval
      intervalBRef.current = setInterval(() => {
        setLinearComplexNumber((prev) =>
          linear.getDirectionNumber(values.numberMid!, values.numberY0!, prev)
        );
      }, intervalSpeeds.interval2);
    }
  }, [linearComplexNumber]);

  useEffect(() => {
    if (intervalBRef.current && linearComplexNumber == values.numberY0) {
      clearInterval(intervalBRef.current);
      intervalBRef.current = undefined;
      reset();
    }
  }, [linearComplexNumber]);

  function startLinearComplex(
    x0: number,
    easingPoint: number | string,
    y0: number
  ) {
    const { values: newValues, intervals } = linear.complex(
      x0,
      easingPoint,
      y0
    );
    setLinearComplexNumber(newValues.numberX0 || 0);
    setValues(newValues);
    setIntervalSpeeds(intervals);
  }

  function reset() {
    setValues({});
    setIntervalSpeeds({});
  }
  return { linearComplexNumber, startLinearComplex };
}

export default useLinearComplex;
