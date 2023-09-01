// import useNumberTransition from "./hooks/useNumberTransition";

import React, { useRef, useState } from "react";
import { easeLinear, easeOut } from "./helpers/easingFunctions";

function App() {
  // const { number, startAnimation } = useNumberTransition({
  //   transitionFrom: 0,
  //   transitionTo: 10,
  //   duration: 2000,
  //   transitionType: "linear",
  // });

  const [number, setNumber] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const transitionDuration = 4000; // in milliseconds

  const startTransition = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    const increment = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = easeOut(Math.min(elapsedTime / transitionDuration, 1));
      setNumber(Math.floor(progress * 1000)); // Incrementing a percentage

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(increment);
      }
    };

    animationRef.current = requestAnimationFrame(increment);
  };

  const cancelTransition = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    setNumber(0);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={startTransition}>Start Transition</button>
      <button onClick={cancelTransition}>Cancel Transition</button>
    </div>
  );
}

export default App;
