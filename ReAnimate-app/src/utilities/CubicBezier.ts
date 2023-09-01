interface ConstructorParams {
  transitionFrom: number;
  transitionTo: number;
  duration: number;
}

class cubicBezier {
  private _transitionFrom: number;
  private _transitionTo: number;
  private _duration: number;

  constructor({ transitionFrom, transitionTo, duration }: ConstructorParams) {
    this._transitionFrom = transitionFrom;
    this._transitionTo = transitionTo;
    this._duration = duration;
  }
}
