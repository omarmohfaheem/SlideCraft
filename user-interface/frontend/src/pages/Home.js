import React from "react";
import { useNavigate } from "react-router-dom";
// CSS Imports
import "../styles/scrollbar.css";
import "../styles/home.css";
import "../styles/content.css";
import "../styles/features.css";
import content from "../images/content.png";
import Navbar from "../components/Navbar";
import Bubbles from "../components/Bubbles";

const Home = () => {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();

  const Generate = () => {
    navigate("/slides-creator");
  };

  const handleHowToUse = () => {
    navigate("/help");
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-section">
        <div className="content-left">
          <h1 className="typing-animation">
            Effortless Slides, It is as simple as that.
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="content-buttons">
            <button onClick={Generate} className="try-now-button">
              Try Now
            </button>
            <button onClick={handleHowToUse} className="how-to-use-link">
              How to Use?
            </button>
          </div>
        </div>
        <div className="content-right">
          <img src={content} alt="Slide Craft" className="content-image" />
        </div>
      </div>
      <div className="features-section">
        <h2>Your work becomes faster</h2>
        <div className="features-container">
          <div className="feature-box">
            <div className="feature-icon">💡</div>
            <h3>Efficient Content Creation</h3>
            <p>
              With the use of advanced AI, your PowerPoint presentations are
              generated with ease. Simply provide your desired content, and our
              application will handle the structuring and summarization for each
              slide. Say goodbye to the stress of manually creating slide
              content and be confident that your message is being communicated
              effectively.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🎨</div>
            <h3>Customizable Themes</h3>
            <p>
              Give your presentation a personal flair by selecting color themes
              that suit your style. Our user-friendly tools make it easy to
              choose vibrant colors that reflect your personality and keep your
              audience engaged. Make a lasting impression with a presentation
              that feels uniquely yours.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">📝</div>
            <h3>Transform Complex Tasks into Simplicity</h3>
            <p>
              Our PowerPoint generator takes the complexity out of creating a
              well-structured presentation. It handles the challenging task of
              organizing your information into clear, concise, and engaging
              slides. It accepts long content like the documentation of your
              work to short description of your idea. No need to worry about
              information overload or slide formatting.
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p className="footer-info">
              Slide Craft is your go-to solution for creating professional and
              engaging PowerPoint presentations effortlessly. Leveraging the
              power of AI, we help you transform your ideas into visually
              appealing slides that captivate your audience.
            </p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p className="footer-email">slidecraft.help@gmail.com</p>
          </div>
        </div>
        <p className="footer-text">
          &copy; {currentYear} Slide Craft. All rights reserved.
        </p>
      </div>
      <Bubbles />
    </div>
  );
};

export default Home;
