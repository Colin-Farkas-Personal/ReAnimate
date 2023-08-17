interface ConstructorParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

export class Linear {
  _transitionFrom: number;
  _transitionTo: number;
  _duration: number;

  constructor({ transitionFrom, transitionTo, duration }: ConstructorParams) {
    this._transitionFrom = transitionFrom;
    this._transitionTo = transitionTo;
    this._duration = duration;
  }

  simple(
    x0: number,
    y0: number
  ): { values: { numberX0: number; numberY0: number }; interval: number } {
    const transitionDiff = Math.abs(this._transitionTo - this._transitionFrom);
    const a = transitionDiff * x0;
    const b = transitionDiff * y0;

    const interval = Math.round(this._duration / Math.abs(b - a));

    return {
      values: {
        numberX0: a,
        numberY0: b,
      },
      interval,
    };
  }

  getDirectionNumber(
    number1: number,
    number2: number,
    prevState: number
  ): number {
    if (number1 > number2) {
      return prevState - 1;
    } else if (number1 < number2) {
      return prevState + 1;
    }

    return prevState;
  }

  complex(x0: number, easingPoint: number | string, y0: number) {
    // Check for correct easingPoint range (number)
    if (
      typeof easingPoint === "number" &&
      (easingPoint < 0 || easingPoint > 1)
    ) {
      throw new Error("easingPoint must be in range 0-1");
    }

    let easingPointNumber = easingPoint as number;
    let easingPointProcent = 100;

    // Check for correct easingPoint range (string)
    if (typeof easingPoint === "string") {
      easingPointNumber = parseFloat(easingPoint.split(" ")[0]);
      easingPointProcent = parseInt(easingPoint.split(" ")[1].replace("%", ""));

      if (easingPointNumber < 0 || easingPointNumber > 1) {
        throw new Error("easingPoint must be in the range of 0-1");
      }
      if (easingPointProcent < 0 || easingPointProcent > 100) {
        throw new Error("easingPoint procent must be in the range of 0%-100%");
      }
    }
    console.log("values - ", { easingPointNumber, easingPointProcent });

    // duration 1000
    // 0-10
    // "0.25 50%" - Spend 25% (0-2.25) for 50% of duration (500) ->
    const transitionNumbersDiff = Math.abs(
      this._transitionTo - this._transitionFrom
    );
    const numberA = transitionNumbersDiff * x0!; // 5
    const numberC = transitionNumbersDiff * y0!; // 8

    console.log("start/end - ", {
      numberA,
      numberC,
    });

    const durationAB = Math.floor(this._duration * (easingPointProcent / 100)); // 5000 -> 2500ms
    const numberAB = Math.abs(
      Math.floor(transitionNumbersDiff * easingPointNumber)
    ); // 2
    const intervalAB = Math.floor(durationAB / numberAB); // 1250ms/number
    console.log("left - ", { durationAB, numberAB, intervalAB });

    const durationBC = Math.floor(this._duration - durationAB); // 2500ms
    const numberBC = Math.abs(Math.floor(numberC - numberAB)); // 7
    const intervalBC = Math.floor(durationBC / numberBC); // 300ms
    console.log("right - ", { durationBC, numberBC, intervalBC });

    console.log("COOl", { numberA, numberAB, numberBC, numberC });

    return {
      values: {
        numberA,
        numberAB,
        numberBC,
        numberC,
      },
      intervals: {
        intervalAB,
        intervalBC,
      },
    };
  }
}
