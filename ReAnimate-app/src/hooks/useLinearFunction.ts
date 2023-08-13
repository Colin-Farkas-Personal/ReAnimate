import React, { useEffect, useState } from "react";
import { Linear } from "../utilities/linear";

interface useLinearFunctionParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}
interface useLinearFunctionReturn {
  values: typeof valuesDefault;
  intervals: typeof intervalsDefault;
  setLinearNumbers: (
    x0: number,
    y0: number,
    easingPoint?: number | string
  ) => void;
}

const valuesDefault = {
  numberX0: 0,
  numberEeasingPoint: 0,
  numberY0: 0,
};
const intervalsDefault = {
  a: 0,
  b: 0,
};

function useLinearFunction({
  transitionFrom,
  transitionTo,
  duration,
}: useLinearFunctionParams): useLinearFunctionReturn {
  const [values, setValues] = useState(valuesDefault);
  const [intervals, setIntervals] = useState(intervalsDefault);
  const linear = new Linear({ transitionFrom, transitionTo, duration });

  function setLinearNumbers(
    x0: number,
    y0: number,
    easingPoint?: number | string | undefined
  ) {
    console.log("params - ", x0, y0, easingPoint);
    if (arguments.length == 2) {
      console.log("x0 - ", transitionFrom);
      const simple = linear.linearSimple(x0, y0);

      setValues((prev) => ({
        ...prev,
        numberX0: simple.values.numberX0,
        numberY0: simple.values.numberY0,
      }));

      setIntervals((prev) => ({
        ...prev,
        a: simple.intervals,
      }));
    }
  }

  return { values, intervals, setLinearNumbers };
}

export default useLinearFunction;
