function linearComplex(x0, easingPoint, y0, { options }) {
  // Check for correct easingPoint range (number)
  if (typeof easingPoint === "number" && (easingPoint < 0 || easingPoint > 1)) {
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
  const transitionNumbersDiff = Math.abs(transitionTo - transitionFrom);
  const numberA = transitionNumbersDiff * x0!; // 5
  const numberC = transitionNumbersDiff * y0!; // 8

  console.log("start/end - ", {
    numberA,
    numberC,
  });

  const durationAB = Math.floor(duration * (easingPointProcent / 100)); // 5000 -> 2500ms
  const numberAB = Math.abs(
    Math.floor(transitionNumbersDiff * easingPointNumber)
  ); // 2
  const intervalAB = Math.floor(durationAB / numberAB); // 1250ms/number
  console.log("left - ", { durationAB, numberAB, intervalAB });

  const durationBC = Math.floor(duration - durationAB); // 2500ms
  const numberBC = Math.abs(Math.floor(numberC - numberAB)); // 7
  const intervalBC = Math.floor(durationBC / numberBC); // 300ms
  console.log("right - ", { durationBC, numberBC, intervalBC });

  console.log("COOl", { numberA, numberAB, numberBC, numberC });

  setValues({ numberA, numberB: numberAB, numberC });
  setIntervals({ start: intervalAB, end: intervalBC });
}
