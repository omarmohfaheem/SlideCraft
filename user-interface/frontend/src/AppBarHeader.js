import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

// const returnToTop = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };
const AppBarHeader = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <div>
      {" "}
      <AppBar
        style={{
          backgroundColor: "#56ccf2",
          backgroundImage: "-webkit-linear-gradient(to right,#2f80ed,#56ccf2)",
          background: "linear-gradient(to right, #2f80ed, #56ccf2)",
        }}
      >
        <Toolbar>
          <Typography
            onClick={handleButtonClick}
            className="title"
            variant="h6"
            style={{
              fontSize: "30px",
              fontFamily: "Lexend, sans-serif",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Slide Craft
          </Typography>
          <Button
            onClick={handleButtonClick}
            color="inherit"
            style={{ fontFamily: "Lexend, sans-serif", margin: "0 30px" }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/help")}
            color="inherit"
            style={{ fontFamily: "Lexend, sans-serif", margin: "0 -30px" }}
          >
            Help
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarHeader;
