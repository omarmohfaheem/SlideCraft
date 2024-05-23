import { React, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBarHeader from "./AppBarHeader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    setTimeout(() => {
      navigate("/summarize");
    }, 500);
  };
  return (
    <div>
      <div className="App-header">{<AppBarHeader />}</div>
      <div className="App-body">
        <p>
          <p>
            Effortless Slides Generation.
            <br />
            It is as simple as that.
          </p>
        </p>

        <div>
          {loading && (
            <div className="loading-screen">
              <div className="spinner"></div>
            </div>
          )}
          <Button onClick={handleButtonClick}>Get Started</Button>
        </div>

        <Typography className="footer">
          &copy; Slide Craft {new Date().getFullYear()}
        </Typography>
      </div>
    </div>
  );
};

export default Home;
