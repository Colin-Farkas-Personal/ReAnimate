import { useEffect, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";

interface UseLinearSimpleParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}
interface UseLinearSimpleReturn {
  linearSimpleNumber: number;
  startLinearSimple: (x0: number, y0: number) => void;
}

interface IValues {
  numberX0: number | undefined;
  numberY0: number | undefined;
}
const valuesDefault = {
  numberX0: undefined,
  numberY0: undefined,
};

const intervalSpeedpeedDefault = undefined;

function useLinearSimple({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearSimpleParams): UseLinearSimpleReturn {
  const [linearSimpleNumber, setLinearSimpleNumber] =
    useState<number>(transitionFrom);

  const linear = new Linear({ transitionFrom, transitionTo, duration });
  const [values, setValues] = useState<IValues>(valuesDefault);
  const [intervalSpeed, setIntervalSpeed] = useState<number | undefined>(
    intervalSpeedpeedDefault
  );
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (
      intervalSpeed !== undefined &&
      Object.values(values).every((item) => item !== undefined)
    ) {
      intervalRef.current = setInterval(() => {
        if (values.numberX0! > values.numberY0!) {
          setLinearSimpleNumber((prev) => prev - 1);
        } else if (values.numberX0! < values.numberY0!) {
          setLinearSimpleNumber((prev) => prev + 1);
        }
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

    console.log("interval, value - ", interval, values);

    setValues((prev) => ({
      ...prev,
      numberX0: values.numberX0,
      numberY0: values.numberY0,
    }));
    setIntervalSpeed(interval);
  }

  function reset() {
    setValues((prev) => ({
      ...prev,
      numberX0: undefined,
      numberY0: undefined,
    }));
    setIntervalSpeed(undefined);
  }

  return { linearSimpleNumber, startLinearSimple };
}

export default useLinearSimple;
