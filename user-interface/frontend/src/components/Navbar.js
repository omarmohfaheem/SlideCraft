import React from "react";
import icon from "../images/slide-craft-icon.png";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleFeatures = () => {
    window.scrollBy({
      top: "550",
      behavior: "smooth",
    });
  };
  const handleAbout = () => {
    window.scrollBy({
      top: "1000",
      behavior: "smooth",
    });
  };
  const handleHowItWorks = () => {
    navigate("/help");
  };
  const handleGetStarted = () => {
    navigate("/slides-creator");
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={icon} alt="Slide Craft" className="navbar-logo" />
        <h1 className="navbar-title">Slide Craft</h1>
      </div>
      <div className="navbar-center">
        <button onClick={handleFeatures} className="navbar-button">
          Features
        </button>
        <button onClick={handleHowItWorks} className="navbar-button">
          How It Works
        </button>
        <button onClick={handleAbout} className="navbar-button">
          About
        </button>
      </div>
      <div className="navbar-right">
        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Navbar;
