import React, { useState } from 'react';
import { FaArrowRight, FaWallet, FaCoins } from 'react-icons/fa';
import { IoThunderstorm } from 'react-icons/io5';
import './IntroScreen.css';

const slides = [
  {
    title: "Revolutionalize your Marzive earnings",
    description: "Earn $MARZ by solvingWeb3 challenges and engaging with the community.",
    icon: FaWallet
  },
  {
    title: "Play, Solve. Earn",
    description: "Marzive gamifies problem-solving, rewarding every contribution with real value.",
    icon: FaCoins
  },
  {
    title: "Own your Web3 Journey",
    description: "A DAO-powered platform where your contributions shape the future.",
    icon: IoThunderstorm
  }
];

const IntroScreen = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="intro-container">
      <div className="device-warning">
        Please use a mobile device to access this application.
      </div>

      <div className="intro-content">
        <div className="dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="slide-icon">
          {React.createElement(slides[currentSlide].icon, { size: 64 })}
        </div>

        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].description}</p>

        <div className="buttons">

          <button onClick={handleNext} className="next-btn">
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <FaArrowRight />
          </button>
          <button onClick={handleSkip} className="skip-btn">
            Skip to App
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
