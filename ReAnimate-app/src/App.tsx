import useNumberTransition from "./hooks/useNumberTransition";

function App() {
  const { number, startTransition } = useNumberTransition({
    transitionFrom: 0,
    transitionTo: 100,
    duration: 4000,
    transitionType: { cubicBezier: { x1: 0.42, x2: 0, y1: 1.0, y2: 1.0 } },
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
