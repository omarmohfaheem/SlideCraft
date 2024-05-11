import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Summarize from "./Summarize";
import Help from "./Help";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/summarize" element={<Summarize />}></Route>
        <Route path="/help" element={<Help />}></Route>
      </Routes>
    </div>
  );
}

export default App;
