import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import '../lib/experiencebox.css';
import { FileText } from 'lucide-react'; // Use FileText icon instead of UserRound
import meteorImage from '../assets/meteor.png';
import LineDecoration from '../components/ui/LineDecoration'; // Import the correct component with capital L

interface ExperienceBoxProps {
  title?: string;
  paragraphs?: string[];
  cvLink?: string;
}

const ExperienceBox: React.FC<ExperienceBoxProps> = ({ title, paragraphs, cvLink }) => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);
  const { darkMode } = useTheme();

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
    <div ref={boxRef} className={`experience-box ${darkMode ? 'dark-box' : 'light-box'} ${isVisible ? 'box-visible' : 'box-hidden'}`}>
      <div className="experience-content">
        <h1 className={`experience-title theme-transition-text ${darkMode ? 'dark-mode-text' : 'light-mode-text'}`}>
          {title || "Experience & Education"}
        </h1>
        
        {/* Use the existing LineDecoration component properly */}
        <div className="divider-container">
          <LineDecoration 
            color={darkMode ? "#fcd34d" : "#9333ea"} 
            opacity={0.5}
            height={2}
            className="my-4 max-w-[120px]"
          />
        </div>
        
        {/* Two paragraphs of text */}
        {paragraphs?.map((paragraph: string, index: number) => (
          <p key={index} className={`experience-text ${index > 0 ? 'mt-4' : ''}`}>
            {paragraph}
          </p>
        )) || (
          <>
            <p className="experience-text">
              With over 5 years of experience in software development, I've worked on a variety of projects ranging from web applications to embedded systems. I specialize in creating responsive, user-friendly interfaces and developing robust backend systems.
            </p>
            <p className="experience-text mt-4">
              I hold a Bachelor's degree in Computer Science from State University, where I graduated with honors. During my academic career, I focused on artificial intelligence and machine learning, completing my thesis on neural network optimization techniques.
            </p>
          </>
        )}
      </div>
      
      {/* CV section */}
      <div className={`cv-container ${isVisible ? 'cv-visible' : 'cv-hidden'}`}>
        <span className="cv-text">My CV</span>
        <a 
          href={cvLink || "https://drive.google.com/file/placeholder"}
          target="_blank"
          rel="noopener noreferrer"
          className={`cv-button ${darkMode ? 'dark-cv-button' : 'light-cv-button'}`}
          aria-label="Download CV"
        >
          <FileText size={28} />
        </a>
      </div>
      
      {/* Meteor image */}
      <div className={`meteor-container ${isVisible ? 'meteor-visible' : 'meteor-hidden'}`} style={{ opacity: isVisible ? (darkMode ? 0.3 : 0.1) : 0 }}>
        <img src={meteorImage} alt="Meteor" className="meteor-image" />
      </div>
    </div>
  );
};

export default ExperienceBox;