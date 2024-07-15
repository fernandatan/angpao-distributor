import { Route, Routes } from "react-router-dom";
import Home from "./components/homePage/homePage";
import Result from "./components/resultPage/resultPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;