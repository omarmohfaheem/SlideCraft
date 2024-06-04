import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SlideCreationPage from "./pages/SlideCreationPage";
import Help from "./pages/Help";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const simulateLoading = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    const loadApp = async () => {
      await simulateLoading(3000);
      setInitialLoad(false);
    };
    loadApp();
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      setIsLoading(true);
      await simulateLoading(1000);
      setIsLoading(false);
    };

    handleRouteChange();
  }, [location.pathname]);

  return (
    <div className="App">
      {initialLoad || isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/slides-creator" element={<SlideCreationPage />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
