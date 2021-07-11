import Main from "./components/Main";
// import HooksMain from "./components/HooksMain";
import { date } from "./dateGenerator";

function App() {
  return (
    <div
      style={{ backgroundColor: "#cad5e280", minHeight: "100vh" }}
      className="App"
    >
      <div className="header">
        <span style={{ fontSize: "17px" }}>Made with ❤️ by Rupam Hari</span>
        <span className="title">CoWIN Tracker</span>
        <span className="date">
          Date: <span style={{ fontWeight: "bold" }}>{date}</span>{" "}
        </span>
      </div>
      <Main />
    </div>
  );
}

export default App;
