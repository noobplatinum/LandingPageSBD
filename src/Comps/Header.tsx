import React, { useState, useEffect, useRef } from 'react';
import mainLogo from '../assets/mainlogo.png';
import vectorImage from '../assets/SZBase.svg';
import GifButton from './GifButton'; 
import { BackgroundGradient } from "../components/ui/background-gradient";
import { useTheme } from '../lib/ThemeContext';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [vectorLoaded, setVectorLoaded] = useState(false);
  const vectorRef = useRef(null);
  // Destructure darkMode and toggleDarkMode from the useTheme hook
  const { darkMode, toggleDarkMode } = useTheme();
  const [themeTransition, setThemeTransition] = useState(false);
  
  // Handle theme transition effects
  useEffect(() => {
    setThemeTransition(true);
    const timer = setTimeout(() => setThemeTransition(false), 800);
    return () => clearTimeout(timer);
  }, [darkMode]);

  // Handle SVG loading correctly
  useEffect(() => {
    // Try to use the actual SVG as an img element instead of background
    const img = new Image();
    img.onload = () => setVectorLoaded(true);
    img.onerror = (error) => console.error("Failed to load vector image:", error);
    img.src = vectorImage;

    // As a fallback, let's also try to load it with fetch 
    fetch(vectorImage)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then(() => setVectorLoaded(true))
      .catch(error => console.error("Error loading vector:", error));
  }, []);

  const handleGifClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Logo color filter based on theme
  const logoFilter = darkMode 
    ? 'brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(500%) hue-rotate(345deg) brightness(205%) contrast(95%) opacity(0.85)'  // Solid amber/gold in dark mode
    : 'brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(900%) hue-rotate(240deg) brightness(70%) contrast(90%) opacity(0.65)'; // Solid purple in light mode
  
  // SVG background opacity based on theme
  const svgOpacity = darkMode ? 0.15 : 0.3;

  return (
    <header
      className="text-white z-50 w-full top-0 left-0 py-[1vh] relative overflow-visible"
      style={{
        minHeight: '10vh',
        height: '12.5vh',
        maxHeight: '220px',
        backgroundColor: 'transparent'
      }}
    >
      {vectorLoaded && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <img
            ref={vectorRef}
            src={vectorImage}
            alt="Header background"
            className="h-full pointer-events-none transition-opacity duration-700 ease-in-out"
            style={{
              width: '80vw',
              objectFit: 'contain',
              opacity: svgOpacity,
              transition: 'opacity 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 flex justify-center items-center relative z-10 h-full">
        <div className="w-full mb-[25vh] flex justify-between items-center">
          <div className="w-[4.1vw] flex-shrink-0"></div>
          
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center">
              <BackgroundGradient
                containerClassName="rounded-full aspect-square h-[7.5vh] flex items-center justify-center"
                className="rounded-full aspect-square flex items-center justify-center w-full h-full bg-transparent"
                borderOnly={true}
                borderWidth="1px"
                animate={true}
              >
                <div className="relative h-full w-full flex items-center justify-center bg-transparent rounded-full p-[0.8vh]">
                  <img
                    src={mainLogo}
                    alt="Logo"
                    className="h-[75%] w-[75%] object-contain"
                    style={{ 
                      filter: logoFilter,
                      transition: 'filter 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
                    }}
                  />
                </div>
              </BackgroundGradient>
            </div>
          </div>
          
          <div className="flex-shrink-0 relative z-20 w-[9vh]">
            <GifButton 
              isExpanded={isExpanded} 
              handleGifClick={handleGifClick} 
              isDarkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;