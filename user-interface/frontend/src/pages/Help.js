import React, { useState } from "react";
import "../styles/help.css";
import { useNavigate } from "react-router-dom";
import step1 from "../images/steps/step1.png";
import step2 from "../images/steps/step2.png";
import step3 from "../images/steps/step3.png";
import step4 from "../images/steps/step4.png";
import step5 from "../images/steps/step5.png";
import Bubbles from "./../components/Bubbles";
import Sidebar from "./../components/Sidebar";

const Help = () => {
  const navigate = useNavigate();
  const handleTryNow = () => {
    navigate("/slides-creator");
  };
  const steps = [
    {
      title: "Step 1: Enter Title",
      content:
        'Provide a title for your presentation in the "Title of Presentation" field.',
      icon: "📝",
      image: step1,
    },
    {
      title: "Step 2: Input Text or Upload Document",
      content:
        "You can either type your text directly into the text area or upload a document (PDF, TXT, or DOCX).",
      icon: "📄",
      image: step2,
    },
    {
      title: "Step 3: Setup Presentation",
      content:
        "Customize your presentation by setting the number of slides, choosing whether to include additional title and thank you slides, deciding if you want to include images, selecting a theme.",
      icon: "⚙️",
      image: step3,
    },
    {
      title: "Step 4: Create Presentation",
      content:
        'Once all the fields are filled and options selected, click on "CREATE PRESENTATION" to generate your slides.',
      icon: "🚀",
      image: step4,
    },
    {
      title: "Step 5: Reset",
      content: 'Use the "RESET" button to clear all fields and start over.',
      icon: "🔄",
      image: step5,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) =>
      prevStep === 0 ? steps.length - 1 : prevStep - 1
    );
  };

  return (
    <div>
      <Sidebar />
      <h1 className="help-header">How It Works</h1>
      <div className="help-container">
        <div className="content-container">
          <div className="steps-container">
            <p className="steps-paragraph">
              Follow these steps to create your presentation using Slide Craft:
            </p>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step ${index === currentStep ? "active" : ""}`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="step-content">
                  <span className="step-icon">{step.icon}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="faq-container">
              <h2 className="faq-h2">Frequently Asked Questions</h2>
              <div className="faq-item">
                <h4>How do I upload a document?</h4>
                <p>
                  Click on the "Choose a File..." button under the text area to
                  upload a document.
                </p>
              </div>
              <div className="faq-item">
                <h4>Can I customize the theme of the presentation?</h4>
                <p>
                  Yes, you can select a theme from the menu in the presentation
                  setup section.
                </p>
              </div>
              <div className="faq-item">
                <h4>How do I include images in my presentation?</h4>
                <p>
                  Check the "Include Images" checkbox in the presentation setup
                  section to include images and Choose your preferred image
                  source.
                </p>
              </div>
            </div>
          </div>
          <div></div>
          <div className="image-container">
            <p className="image-header">
              Follow these Images for more clarification:
            </p>
            <div className="image-slider">
              <button className="arrow-button left" onClick={prevStep}>
                &lt;
              </button>
              <div className="image-container">
                <img
                  src={steps[currentStep].image}
                  alt={`Step ${currentStep + 1}`}
                />
              </div>
              <button className="arrow-button right" onClick={nextStep}>
                &gt;
              </button>
            </div>
            <button onClick={handleTryNow} className="try-now">
              Try Now
            </button>
          </div>
          <Bubbles />
        </div>
      </div>
    </div>
  );
};

export default Help;
