import React, { useState, useRef } from "react";
import "../styles/slide-creation.css";
import ThemesModal from "../components/ThemesModal";
import Bubbles from "../components/Bubbles";
import Sidebar from "../components/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import Confetti from "react-confetti";

const SlideCreationPage = () => {
  const [title, setTitle] = useState("");
  const [numSlides, setNumSlides] = useState("");
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [includeImages, setIncludeImages] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [theme, setTheme] = useState("");
  const [includeTitleAndThankYouSlides, setIncludeTitleAndThankYouSlides] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("Choose a file...");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "Choose a file...");
    if (selectedFile) setErrors((prevErrors) => ({ ...prevErrors, text: "" }));
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    if (event.target.value)
      setErrors((prevErrors) => ({ ...prevErrors, text: "" }));
  };

  const handleNumSlidesChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value >= 1 && value <= 99)) {
      setNumSlides(value);
      setShowTooltip(false);
      setErrors((prevErrors) => ({ ...prevErrors, slides: "" }));
    } else if (value > 99) {
      setShowTooltip(true);
    }
  };

  const handleThemeSelection = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowModal(false);
    if (selectedTheme)
      setErrors((prevErrors) => ({ ...prevErrors, theme: "" }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!title) formErrors.title = "Title is required.";
    if (!textInput && !file)
      formErrors.text = "Text input or file upload is required.";
    if (!numSlides) {
      formErrors.slides = "Number of slides is required.";
    } else if (numSlides > 99) {
      formErrors.slides = "Maximum number of slides is 99.";
    }
    if (includeImages && !imageSource)
      formErrors.imageSource = "Image source is required.";
    if (!theme) formErrors.theme = "Theme is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("numSlides", numSlides);
    if (file) formData.append("file", file);
    formData.append("textInput", textInput || "");
    formData.append("includeImages", includeImages ? "true" : "false");
    formData.append("imageSource", imageSource);
    formData.append("theme", theme);
    formData.append(
      "includeTitleAndThankYouSlides",
      includeTitleAndThankYouSlides ? "true" : "false"
    );

    setLoading(true);
    setShowConfetti(false);

    try {
      const response = await fetch(
        "http://localhost:5000/generate_presentation",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.pptx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } else {
        console.error("Failed to generate presentation");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setNumSlides("");
    setFile(null);
    setTextInput("");
    setIncludeImages(false);
    setImageSource("");
    setTheme("");
    setIncludeTitleAndThankYouSlides(false);
    setShowTooltip(false);
    setErrors({});
    setFileName("Choose a file...");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <Sidebar />
      <h1 className="slide-creation-header">Craft Your Presentation</h1>
      <form className="slide-creation-page" onSubmit={handleSubmit}>
        <div className="left-column">
          <div>
            <label>Title of Presentation :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value)
                  setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
              }}
              required
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div>
            <label>Input Text or Upload Document :</label>
            <textarea
              value={textInput}
              onChange={handleTextInputChange}
              disabled={file !== null}
              placeholder="Enter your text here..."
              rows="10"
            />
            <p className="or">OR</p>
            <label className="file-label">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={textInput !== ""}
                required={!textInput}
                accept=".txt,.pdf,.docx"
                ref={fileInputRef}
                className="file-input"
              />
              <span className="file-custom">{fileName}</span>
            </label>
            {errors.text && <div className="error">{errors.text}</div>}
          </div>
          <div className="tip">
            <p>
              Tip: Don't use Slide Craft as an instructional tool. don't give it
              instructions, Simply enter your text.
            </p>
          </div>
        </div>
        <div className="right-column">
          <h2 className="slide-settings-header">Presentation Setup</h2>
          <div className="settings-box">
            <div className="inline-group">
              <label>Number of Slides :</label>
              <input
                type="number"
                value={numSlides}
                onChange={handleNumSlidesChange}
                min="1"
                max="99"
                required
              />
            </div>
            {showTooltip && (
              <div className="tooltip">Maximum number of slides is 99.</div>
            )}
            {errors.slides && <div className="error">{errors.slides}</div>}
            <div className="checkbox">
              <label>Additional Slides :</label>
              <label className="text-check">
                <input
                  className="box"
                  type="checkbox"
                  checked={includeTitleAndThankYouSlides}
                  onChange={(e) =>
                    setIncludeTitleAndThankYouSlides(e.target.checked)
                  }
                />
                <span className="text-1">
                  ( Include Title and Thank You Slides )
                </span>
              </label>
            </div>
            <div className="checkbox">
              <label>Include Images :</label>
              <label className="text-check">
                <input
                  type="checkbox"
                  checked={includeImages}
                  onChange={(e) => {
                    setIncludeImages(e.target.checked);
                    if (!e.target.checked) {
                      setImageSource("");
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        imageSource: "",
                      }));
                    }
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {includeImages && (
              <div>
                <label className="text-check">
                  <input
                    type="radio"
                    value="openai"
                    checked={imageSource === "openai"}
                    onChange={(e) => {
                      setImageSource(e.target.value);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        imageSource: "",
                      }));
                    }}
                  />
                  <span className="text-2"> AI Generated </span>
                </label>
                <label className="text-check radio">
                  <input
                    type="radio"
                    value="google"
                    checked={imageSource === "google"}
                    onChange={(e) => {
                      setImageSource(e.target.value);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        imageSource: "",
                      }));
                    }}
                  />
                  <span className="text-2"> Google Images</span>
                </label>
              </div>
            )}
            {errors.imageSource && (
              <div className="error">{errors.imageSource}</div>
            )}
            <div className="inline-group-2">
              <label>Theme :</label>
              <input
                type="text"
                value={theme}
                readOnly
                onClick={() => setShowModal(true)}
                placeholder="Please choose a theme"
                required
              />
            </div>
            {errors.theme && <div className="error">{errors.theme}</div>}
            <div className="action-buttons">
              <button
                className="reset-button"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="create-button"
                type="submit"
              >
                Create Presentation
              </button>
            </div>
            <div className="tip-2">
              <p>
                If there is no enough content for the number of slides required,
                blank slides will be generated to fulfill the requirement.
              </p>
            </div>
          </div>
        </div>
      </form>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <ClipLoader color="#35D55D" size={400} />
            <p>Creating your presentation... 🤖</p>
          </div>
        </div>
      )}
      {showConfetti && <Confetti />}
      <ThemesModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelectTheme={handleThemeSelection}
      />
      <Bubbles />
    </div>
  );
};

export default SlideCreationPage;
