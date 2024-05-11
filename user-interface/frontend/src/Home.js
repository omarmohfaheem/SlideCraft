import { React, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./slide-craft.png";
import AppBarHeader from "./AppBarHeader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setLoading(true);
    // Simulate some asynchronous task, like fetching data
    setTimeout(() => {
      // Hide loading screen after some time (simulating async task completion)
      setLoading(false);
    }, 500); // Change 2000 to the actual time your task takes

    // Navigate to the next page after the async task is completed
    setTimeout(() => {
      navigate("/summarize");
    }, 500);
  };
  return (
    <div>
      <div className="App-header">
        <AppBarHeader />
      </div>
      <div className="App-body">
        <p
          style={{
            display: "block",
            margin: "auto",
            marginBottom: "-150px",
            marginLeft: "100px",
            marginTop: "100px",
            fontSize: "75px",
            fontFamily: "Lexend, sans-serif",
          }}
        >
          <p>
            Effortless Slides Generation.
            <br />
            It is as simple as that.
          </p>
        </p>
        <div className="App-logo">
          <img width="700px" src={logo} alt="Slide Craft" />
        </div>

        <div>
          {loading && (
            <div className="loading-screen">
              <div className="spinner"></div>
            </div>
          )}
          <Button
            onClick={handleButtonClick}
            variant="contained"
            style={{
              width: "150px",
              height: "50px",
              display: "block",
              margin: "auto",
              marginTop: "-350px",
              marginLeft: "-850px",
              backgroundColor: "#56ccf2",
              backgroundImage:
                "-webkit-linear-gradient(to right,#2f80ed,#56ccf2)",
              background: "linear-gradient(to right, #2f80ed, #56ccf2)",
              fontFamily: "Lexend, sans-serif",
            }}
          >
            Get Started
          </Button>
        </div>

        <Typography
          className="footer"
          variant="body2"
          style={{
            textAlign: "center",
            fontFamily: "Lexend, sans-serif",
            marginTop: "90px",
          }}
        >
          &copy; Slide Craft {new Date().getFullYear()}
        </Typography>
      </div>
    </div>
  );
};

export default Home;
