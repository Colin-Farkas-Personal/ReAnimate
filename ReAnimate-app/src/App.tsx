import reAnimate from "./components/animate.element";

function App() {
  return (
    <section>
      <reAnimate.element
        triggerOn="onMount"
        transitionFrom={{ opacity: 0 }}
        transitionTo={{ opacity: 100 }}
        duration={3000}
      >
        <h1>Number text</h1>
      </reAnimate.element>
    </section>
  );
}

export default App;
