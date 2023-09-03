import useNumberTransition from "./hooks/useNumberTransition";

function App() {
  const { number, startTransition } = useNumberTransition({
    transitionFrom: 0,
    transitionTo: 10,
    duration: 2000,
    transitionType: "linear",
  });

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={startTransition}>Start Transition</button>
      {/* <button onClick={cancelTransition}>Cancel Transition</button> */}
    </div>
  );
}

export default App;
