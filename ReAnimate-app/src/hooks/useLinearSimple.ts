import { useEffect, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";
import isObjEmpty from "../helpers/isObjEmpty";

interface UseLinearSimpleParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}
interface UseLinearSimpleReturn {
  linearSimpleNumber: number | undefined;
  startLinearSimple: (x0: number, y0: number) => void;
}

interface IValues {
  numberX0?: number;
  numberY0?: number;
}
function useLinearSimple({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearSimpleParams): UseLinearSimpleReturn {
  const [linearSimpleNumber, setLinearSimpleNumber] = useState<
    number | undefined
  >();

  const linear = new Linear({ transitionFrom, transitionTo, duration });
  const [values, setValues] = useState<IValues>({});
  const [intervalSpeed, setIntervalSpeed] = useState<number | undefined>();
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (intervalSpeed && !isObjEmpty(values)) {
      intervalRef.current = setInterval(() => {
        setLinearSimpleNumber((prev) =>
          linear.getDirectionNumber(values.numberX0!, values.numberY0!, prev!)
        );
      }, intervalSpeed);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [intervalSpeed]);

  useEffect(() => {
    if (linearSimpleNumber == values.numberY0) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      reset();
    }
  }, [linearSimpleNumber]);

  function startLinearSimple(x0: number, y0: number) {
    // Reset on every new call
    setLinearSimpleNumber(transitionFrom);

    const { interval, values } = linear.simple(x0, y0);
    setValues(values);
    setIntervalSpeed(interval);
  }

  function reset() {
    setValues({});
    setIntervalSpeed(undefined);
  }

  return { linearSimpleNumber, startLinearSimple };
}

export default useLinearSimple;
