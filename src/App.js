import Header from "./components/reusableComponents/Header";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div
      style={{ backgroundColor: "#cad5e280", minHeight: "100vh" }}
      className="App"
    >
      <Header />
      <MainComponent />
    </div>
  );
}

export default App;
