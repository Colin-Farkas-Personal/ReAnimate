import { useEffect, useRef, useState } from "react";
import { Linear } from "../utilities/Linear";

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
  numberA: number | undefined;
  numberAB: number | undefined;
  numberBC: number | undefined;
  numberC: number | undefined;
}
const valuesDefault = {
  numberA: undefined,
  numberAB: undefined,
  numberBC: undefined,
  numberC: undefined,
};

interface IIntervalSpeed {
  intervalAB: number | undefined;
  intervalBC: number | undefined;
}
const intervalSpeedpeedDefault = {
  intervalAB: undefined,
  intervalBC: undefined,
};

function useLinearComplex({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearComplexParams): UseLinearComplexReturn {
  const [linearComplexNumber, setLinearComplexNumber] =
    useState<number>(transitionFrom);

  const linear = new Linear({ transitionFrom, transitionTo, duration });
  const [values, setValues] = useState<IValues>(valuesDefault);
  const [intervalSpeed, setIntervalSpeed] = useState<IIntervalSpeed>(
    intervalSpeedpeedDefault
  );
  const intervalARef = useRef<number | undefined>(undefined);
  const intervalBRef = useRef<number | undefined>(undefined);

  function getFactor(number1: number, number2: number, prev: number): number {
    if (number1 > number2) {
      return prev - 1;
    } else if (number1 < number2) {
      return prev + 1;
    }

    return prev;
  }

  useEffect(() => {
    console.log("all values - ", values);
    console.log("intervalBRef - ", intervalBRef);

    if (
      Object.values(intervalSpeed).every((item) => item !== undefined) &&
      Object.values(values).every((item) => item !== undefined) &&
      !intervalARef.current
    ) {
      console.log("values, intervalSpeed - ", values, intervalSpeed);

      // First part
      intervalARef.current = setInterval(() => {
        setLinearComplexNumber((prev) =>
          getFactor(values.numberA!, values.numberAB!, prev)
        );
      }, intervalSpeed.intervalAB);
    }
  }, [intervalSpeed.intervalAB]);

  useEffect(() => {
    if (intervalARef.current && linearComplexNumber == values.numberAB) {
      clearInterval(intervalARef.current);
      intervalARef.current = undefined;

      // Second part
      intervalBRef.current = setInterval(() => {
        setLinearComplexNumber((prev) =>
          getFactor(values.numberAB!, values.numberC!, prev)
        );
      }, intervalSpeed.intervalBC);
    }
  }, [linearComplexNumber]);

  useEffect(() => {
    if (intervalBRef.current && linearComplexNumber == values.numberC) {
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
    const { values, intervals } = linear.complex(x0, easingPoint, y0);
    setLinearComplexNumber(values.numberA);

    setValues((prev) => ({
      ...prev,
      numberA: values.numberA,
      numberAB: values.numberAB,
      numberBC: values.numberBC,
      numberC: values.numberC,
    }));

    setIntervalSpeed((prev) => ({
      ...prev,
      intervalAB: intervals.intervalAB,
      intervalBC: intervals.intervalBC,
    }));
  }

  function reset() {
    setValues((prev) => ({
      ...prev,
      numberA: undefined,
      numberAB: undefined,
      numberBC: undefined,
      numberC: undefined,
    }));

    setIntervalSpeed((prev) => ({
      ...prev,
      intervalAB: undefined,
      intervalBC: undefined,
    }));
  }
  return { linearComplexNumber, startLinearComplex };
}

export default useLinearComplex;
