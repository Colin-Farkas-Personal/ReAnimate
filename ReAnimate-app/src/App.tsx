import useNumberTransition from "./hooks/useNumberTransition";

function App() {
  const { number, startAnimation } = useNumberTransition({
    transitionFrom: 0,
    transitionTo: 10,
    duration: 5000,
    transitionType: { linear: { x0: 0, y0: 1 } },
  });

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => startAnimation()}>Start Asc</button>
    </div>
  );
}

export default App;
