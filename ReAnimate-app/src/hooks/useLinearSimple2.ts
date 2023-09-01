import { useState, useEffect } from "react";
import { Linear } from "../utilities/Linear";
import { easeLinear } from "../helpers/easingFunctions";

interface UseLinearSimple2Params {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

interface UseLinearSimple2Return {
  linearSimpleNumber2: number | undefined;
  startLinearSimple2: (x0: number, y0: number) => void;
}

function useLinearSimple2({
  transitionFrom,
  transitionTo,
  duration,
}: UseLinearSimple2Params): UseLinearSimple2Return {
  const [linearSimpleNumber2, setLinearSimpleNumber2] = useState<
    number | undefined
  >(transitionFrom);
  const linear = new Linear({ transitionFrom, transitionTo, duration });

  let startTime: number;
  function startLinearSimple2(x0: number, y0: number) {
    const { values } = linear.simple(x0, y0);
    setLinearSimpleNumber2(values.numberX0);

    const transitionDiff = linear.getTransitionDiff();

    function transition(timeStamp: number) {
      const timestamp = timeStamp || new Date().getTime();
      const runtime = timestamp - startTime;
      const progress = Math.min(runtime / duration, 1);

      const currentNumber = easeLinear(transitionDiff * progress);

      console.log("currentNumber - ", currentNumber);
      setLinearSimpleNumber2(currentNumber);

      if (runtime < duration) {
        requestAnimationFrame((timestamp) => {
          transition(timestamp);
        });
      }
    }

    requestAnimationFrame((timeStamp) => {
      startTime = timeStamp || new Date().getTime();
      transition(timeStamp);
    });
  }
  return { linearSimpleNumber2, startLinearSimple2 };
}

export default useLinearSimple2;
