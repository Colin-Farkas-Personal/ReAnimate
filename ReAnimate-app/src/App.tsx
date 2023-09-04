import useNumberTransition from "./hooks/useNumberTransition";

function App() {
  const { number, startTransition } = useNumberTransition({
    transitionFrom: 2,
    transitionTo: 14.5,
    duration: 2000,
    transitionType: { linear: { x0: 0.8, easingPoint: "0.4 75%", y0: 1 } },
    decimalPlaces: 3,
  });

  return (
    <div>
      <h1>${number}</h1>
      <button onClick={startTransition}>Start Transition</button>
      {/* <button onClick={cancelTransition}>Cancel Transition</button> */}
    </div>
  );
}

export default App;
