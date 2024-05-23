import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import AppBarHeader from "./AppBarHeader";

const Summarize = () => {
  const [, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    // Check if the text area is empty
    if (text.trim() === "") {
      setOpenModal(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTextAreaChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <AppBarHeader />
      <h1
        style={{
          display: "block",
          textAlign: "center",
          margin: "auto",
          color: "#ffffff",
          marginTop: "100px",
          marginBottom: "20px",
          fontSize: "30px",
          fontFamily: "Lexend, sans-serif",
        }}
      >
        Enter the text you want to summarize and click on the button to generate
      </h1>
      <textarea
        value={text}
        onChange={handleTextAreaChange}
        placeholder="Enter text to summarize..."
        rows={30}
        cols={120}
        style={{
          marginTop: "15px",
          marginBottom: "20px",
          margin: "auto",
          display: "block",
          fontFamily: "Lexend, sans-serif",
        }}
      />
      <Button
        onClick={handleSummarize}
        variant="contained"
        style={{
          display: "block",
          margin: "auto",
          marginTop: "10px",
          backgroundColor: "#56ccf2",
          backgroundImage: "-webkit-linear-gradient(to right,#2f80ed,#56ccf2)",
          background: "linear-gradient(to right, #2f80ed, #56ccf2)",
          fontFamily: "Lexend, sans-serif",
          fontWeight: "bold",
        }}
      >
        Generate
      </Button>
      <div>{summary}</div>

      {/* Modal for empty text validation */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <div>Please enter some text before summarizing.</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Summarize;
