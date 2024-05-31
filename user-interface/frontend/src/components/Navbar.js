import React from "react";
import icon from "../images/slide-craft-icon.png";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={icon} alt="Slide Craft" className="navbar-logo" />
        <h1 className="navbar-title">Slide Craft</h1>
      </div>
      <div className="navbar-center">
        <button className="navbar-button">Home</button>
        <button className="navbar-button">Features</button>
        <button className="navbar-button">Help</button>
      </div>
    </div>
  );
};

export default Navbar;
