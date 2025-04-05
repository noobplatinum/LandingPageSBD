import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import '../lib/aboutmebox.css';
import { FlipWords } from '../components/ui/flip-words'; // Import the FlipWords component
import jupiterImage from '../assets/jupiter.png';
import { Mails } from 'lucide-react'; // Import the Mail icon from lucide-react

const AboutMeBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);
  const { darkMode } = useTheme();

  const interestsList = [
    "Web / App Development",
    "Robotics / Avionics",
    "Machine Learning / AI",
    "Digital Sys / Arc"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on 50% threshold
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <div ref={boxRef} className={`about-box ${darkMode ? 'dark-box' : 'light-box'} ${isVisible ? 'box-visible' : 'box-hidden'}`}>
      <div className="about-content">
        <h1 className={`dev-name theme-transition-text ${darkMode ? 'dark-mode-text' : 'light-mode-text'}`}>
          John Smith
        </h1>
        
        <div className="interest-container">
          <span className="interest-prefix">Passionate in</span>
          <FlipWords 
            words={interestsList} 
            duration={5000}
            className={`interest-words theme-transition-text ${darkMode ? 'dark-mode-text' : 'light-mode-text'}`} 
          />
        </div>
        
        <div className="about-divider"></div>
        
        <p className="about-text">
          I'm a passionate developer focused on creating beautiful, responsive, and performant web applications.
          With experience in React, TypeScript, and modern CSS techniques, I bring designs to life with subtle
          animations and thoughtful interactions.
        </p>
        <p className="about-text mt-4">
          When I'm not coding, you might find me exploring new technologies, contributing to open source,
          or thinking about how to make the web more accessible and enjoyable for everyone.
        </p>
      </div>
      
      <button 
        className={`mail-button ${darkMode ? 'dark-mail-button' : 'light-mail-button'} ${isVisible ? 'mail-button-visible' : 'mail-button-hidden'}`}
        aria-label="Contact me"
      >
        <Mails size={24} />
      </button>
      
      <div className={`jupiter-container ${isVisible ? 'jupiter-visible' : 'jupiter-hidden'}`} style={{ opacity: isVisible ? (darkMode ? 0.4 : 0.15) : 0 }}>
        <img src={jupiterImage} alt="Jupiter" className="jupiter-image" />
      </div>
    </div>
  );
};

export default AboutMeBox;