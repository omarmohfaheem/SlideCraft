import React from "react";
import "../styles/bubbles.css";

const Bubbles = () => {
  return (
    <div className="bubbles">
      {Array(20)
        .fill()
        .map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
    </div>
  );
};

export default Bubbles;
