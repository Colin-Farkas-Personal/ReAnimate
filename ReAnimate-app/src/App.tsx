import useSmoothCount from "./hooks/useSmoothCount";

function App() {
  const { number, startAnimation } = useSmoothCount({
    transitionFrom: 0,
    transitionTo: 10,
    duration: 300,
    transitionType: { linear: [0.5, "0.25 50%", 0.8] },
  });

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => startAnimation()}>Start Asc</button>
    </div>
  );
}

export default App;
