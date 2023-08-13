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

  linearSimple(
    x0: number,
    y0: number
  ): { values: { numberX0: number; numberY0: number }; intervals: number } {
    console.log(x0, y0);
    const transitionDiff = Math.abs(this._transitionTo - this._transitionFrom);
    const a = transitionDiff * x0;
    const b = transitionDiff * y0;
    const interval = Math.round(this._duration / Math.abs(b - a));
    console.log("a, b, interval - ", a, b, interval);

    return {
      values: {
        numberX0: a,
        numberY0: b,
      },
      intervals: interval,
    };
  }
}
