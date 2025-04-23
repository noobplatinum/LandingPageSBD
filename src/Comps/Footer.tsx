import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import mainLogo from '../assets/mainlogo.png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const glowColor = darkMode 
    ? 'rgba(255, 180, 10, 0.85)'
    : 'rgba(128, 0, 255, 0.85)';
    
  const logoFilter = darkMode
    ? 'brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(500%) hue-rotate(345deg) brightness(205%) contrast(95%) opacity(0.85)'
    : 'brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(900%) hue-rotate(240deg) brightness(70%) contrast(90%) opacity(0.65)';

  return (
    <div className="relative w-full mt-[-100px]">
      <div 
        ref={footerRef} 
        className={`w-full flex flex-col md:flex-row items-center justify-center md:gap-32 px-6 py-1 mb-6 transition-opacity duration-800 ease-in-out ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        <div className="flex flex-col items-end text-right mb-6 md:mb-0">
          <h2 className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
            darkMode ? 'text-amber-300' : 'text-purple-600'
          }`}>
            SecondChance
          </h2>
          <p className={`text-lg transition-colors duration-500 ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}>
            <i>Quality Finds, Second Life</i>
          </p>
        </div>
        
        <div className="relative">
          <div className={`rounded-full border-2 ${darkMode ? 'border-amber-300/50' : 'border-purple-600/50'} p-2 overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`rounded-full w-16 h-16 flex items-center justify-center overflow-hidden bg-opacity-20 ${darkMode ? 'bg-amber-300' : 'bg-purple-600'}`}>
              <img 
                src={mainLogo} 
                alt="SecondChance Logo" 
                className="w-10 h-10 object-contain"
                style={{
                  filter: logoFilter,
                  transition: 'filter 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}
              />
            </div>
          </div>
          <p className={`text-xs text-center mt-2 ${darkMode ? 'text-amber-200/70' : 'text-purple-500/70'}`}>
            © 2025 SecondChance
          </p>
        </div>
      </div>
      
      <div className="flex justify-center items-start w-full pointer-events-none">
        <div 
          className="transition-all duration-700 ease-in-out"
          style={{
            width: '56vw',
            height: '2px',
            borderBottom: `2px solid ${darkMode ? 'rgba(255, 175, 0, 0.8)' : 'rgba(128, 0, 255, 0.8)'}`,
            boxShadow: `0 0 15px ${glowColor}`,
            opacity: darkMode ? 0.75 : 0.65,
            backgroundColor: 'transparent',
            transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
            marginTop: '12px'
          }}
        />
      </div>
    </div>
  );
};

export default Footer;