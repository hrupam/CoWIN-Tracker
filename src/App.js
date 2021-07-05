import Main from "./components/Main";
import date from "./dateGenerator";

function App() {
  return (
    <div className="App">
      <div className="header">
        <span className="title">CoWIN Tracker</span>
        <span className="date">
          Current Date: <span style={{ fontWeight: "bold" }}>{date}</span>{" "}
        </span>
      </div>
      <Main />
    </div>
  );
}

export default App;
