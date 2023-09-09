import useNumberTransition from "./hooks/useNumberTransition";

function App() {
  const [number1, startTransition1] = useNumberTransition({
    transitionFrom: 0,
    transitionTo: 9999,
    duration: 2000,
    transitionType: "linear",
  });
  const [number2, startTransition2] = useNumberTransition({
    transitionFrom: 0,
    transitionTo: 9999,
    duration: 2000,
    transitionType: "easeOut",
  });

  return (
    <div>
      <h1>${number1}</h1>
      <h1>${number2}</h1>
      <button
        onClick={() => {
          startTransition1();
          startTransition2();
        }}
      >
        Start Transition
      </button>
      {/* <button onClick={cancelTransition}>Cancel Transition</button> */}
    </div>
  );
}

export default App;
