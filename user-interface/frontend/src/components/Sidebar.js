import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isAnimating, setAnimating] = useState(false);

  const handleDelayedNavigation = (path) => {
    setAnimating(true); // Start the animation
    setTimeout(() => {
      navigate(path);
      setAnimating(false); // Reset animation state
    }, 500); // Matches the duration of the animation
  };

  return (
    <div className={`sidebar ${isAnimating ? "fade-out" : ""}`}>
      <div className="sidebar-logo"></div>
      <ul className="sidebar-links">
        <li>
          <button
            className="sidebar-link"
            title="Home"
            onClick={() => handleDelayedNavigation("/")}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
        </li>
        <li>
          <button
            className="sidebar-link"
            title="Slide Generator"
            onClick={() => handleDelayedNavigation("/slides-creator")}
          >
            <FontAwesomeIcon icon={faFile} />
          </button>
        </li>
        <li>
          <button
            className="sidebar-link"
            title="How It Works"
            onClick={() => handleDelayedNavigation("/help")}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
