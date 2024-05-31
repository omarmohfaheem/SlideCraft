import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePresentation from "./pages/CreatePresentation";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };
    loadApp();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<CreatePresentation />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
