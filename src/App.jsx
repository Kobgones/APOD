import "./App.css";
import NavBar from "./components/NavBar";
import Apod from "./components/Apod";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Apod />
      </header>
    </div>
  );
}

export default App;
