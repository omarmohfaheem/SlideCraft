import React, { useState } from "react";
import "../styles/slide-creation.css";
import ThemesModal from "../components/ThemesModal";
import Bubbles from "../components/Bubbles";
import Sidebar from "../components/Sidebar";

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
  const [generateNarrations, setGenerateNarrations] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = React.useRef();
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file chosen");
    if (selectedFile) setErrors((prevErrors) => ({ ...prevErrors, text: "" }));
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    if (event.target.value)
      setErrors((prevErrors) => ({ ...prevErrors, text: "" }));
  };

  const handleNumSlidesChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value >= 1 && value <= 15)) {
      setNumSlides(value);
      setShowTooltip(false);
      setErrors((prevErrors) => ({ ...prevErrors, slides: "" }));
    } else if (value > 15) {
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
    } else if (numSlides > 15) {
      formErrors.slides = "Maximum number of slides is 15.";
    }
    if (includeImages && !imageSource)
      formErrors.imageSource = "Image source is required.";
    if (!theme) formErrors.theme = "Theme is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    // Set default values
    if (!theme) setTheme("Modern");
    if (includeImages && !imageSource) setImageSource("openai");

    console.log({
      title,
      numSlides,
      file,
      textInput,
      includeImages,
      imageSource,
      theme,
      includeTitleAndThankYouSlides,
      generateNarrations,
    });
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
    setGenerateNarrations(false);
    setShowTooltip(false);
    setErrors({});
    setFileName("No file chosen");
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
                max="15"
                required
              />
            </div>
            {showTooltip && (
              <div className="tooltip">Maximum number of slides is 15.</div>
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
                    if (!e.target.checked)
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        imageSource: "",
                      }));
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
            <div className="checkbox">
              <label>Generate Narrations :</label>
              <label className="text-check">
                <input
                  type="checkbox"
                  checked={generateNarrations}
                  onChange={(e) => setGenerateNarrations(e.target.checked)}
                />
              </label>
            </div>
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
          </div>
        </div>
      </form>
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
