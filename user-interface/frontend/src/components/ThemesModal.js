import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/themes-modal.css";
import abstract from "../images/themes/abstract.jpg";
import business from "../images/themes/business.jpg";
import creative from "../images/themes/creative.jpg";
import dark from "../images/themes/dark.jpg";
import modern from "../images/themes/modern.jpg";
import technology from "../images/themes/technology.jpg";

const ThemesModal = ({ show, onClose, onSelectTheme }) => {
  const themes = [
    { name: "Abstract", img: abstract },
    { name: "Business", img: business },
    { name: "Creative", img: creative },
    { name: "Dark", img: dark },
    { name: "Modern", img: modern },
    { name: "Technology", img: technology },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h2>Select a Theme</h2>
            <div className="theme-list">
              {themes.map((theme) => (
                <div
                  className="theme-item"
                  key={theme.name}
                  onClick={() => onSelectTheme(theme.name)}
                >
                  <img src={theme.img} alt={theme.name} className="theme-img" />
                  <p>{theme.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemesModal;
