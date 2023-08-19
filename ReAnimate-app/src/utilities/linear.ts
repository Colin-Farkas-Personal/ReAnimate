interface ConstructorParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

export class Linear {
  private _transitionFrom: number;
  private _transitionTo: number;
  private _duration: number;

  constructor({ transitionFrom, transitionTo, duration }: ConstructorParams) {
    this._transitionFrom = transitionFrom;
    this._transitionTo = transitionTo;
    this._duration = duration;
  }

  private getTransitionDiff(): number {
    return Math.abs(this._transitionTo - this._transitionFrom);
  }

  private calculateInterval(diff: number): number {
    return Math.round(this._duration / Math.abs(diff));
  }

  simple(
    x0: number,
    y0: number
  ): { values: { numberX0: number; numberY0: number }; interval: number } {
    const transitionDiff = this.getTransitionDiff();
    const a = transitionDiff * x0;
    const b = transitionDiff * y0;

    const interval = this.calculateInterval(b - a);

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

  private validateEasingPoint(easingPoint: number | string): void {
    if (typeof easingPoint === "number") {
      if (easingPoint < 0 || easingPoint > 1) {
        throw new Error("easingPoint must be in range 0-1");
      }
    } else if (typeof easingPoint === "string") {
      const [easingPointNumber, easingPointProcent] = easingPoint.split(" ");
      const number = parseFloat(easingPointNumber);
      const percent = parseInt(easingPointProcent.replace("%", ""));

      if (isNaN(number) || number < 0 || number > 1) {
        throw new Error("easingPoint must be in the range of 0-1");
      }
      if (isNaN(percent) || percent < 0 || percent > 100) {
        throw new Error("easingPoint percent must be in the range of 0%-100%");
      }
    } else {
      throw new Error("Invalid easingPoint type");
    }
  }

  complex(x0: number, easingPoint: number | string, y0: number) {
    this.validateEasingPoint(easingPoint);

    let easingPointNumber =
      typeof easingPoint === "number"
        ? easingPoint
        : parseFloat(easingPoint.split(" ")[0]);
    let easingPointProcent =
      typeof easingPoint === "string"
        ? parseInt(easingPoint.split(" ")[1].replace("%", ""))
        : 50;

    const transitionDiff = this.getTransitionDiff();
    const numberX0 = transitionDiff * x0;
    const numberY0 = transitionDiff * y0;

    const durationMid = Math.floor(this._duration * (easingPointProcent / 100));
    const numberMid = Math.abs(Math.floor(transitionDiff * easingPointNumber));
    const interval1 = Math.floor(durationMid / numberMid);

    const durationMidY0 = Math.floor(this._duration - durationMid);
    const numberMidY0 = Math.abs(Math.floor(numberY0 - numberMid));
    const interval2 = Math.floor(durationMidY0 / numberMidY0);

    return {
      values: {
        numberX0,
        numberMid,
        numberY0,
      },
      intervals: {
        interval1,
        interval2,
      },
    };
  }
}
