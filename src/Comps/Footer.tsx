import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import SocialButtons from '../components/ui/SocialButton';

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

  // Define glow color based on theme
  const glowColor = darkMode 
    ? 'rgba(255, 180, 10, 0.85)'
    : 'rgba(128, 0, 255, 0.85)';

  return (
    <div className="relative w-full mt-[-100px]">
      {/* Footer content */}
      <div 
        ref={footerRef} 
        className={`w-full flex flex-col md:flex-row items-center justify-center md:gap-32 px-6 py-1 mb-24 transition-opacity duration-800 ease-in-out ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        {/* Left side - Text content */}
        <div className="flex flex-col items-end text-right mb-6 md:mb-0">
          <h2 className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
            darkMode ? 'text-amber-300' : 'text-purple-600'
          }`}>
            Reach Me Here!
          </h2>
          <p className={`text-lg transition-colors duration-500 ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}>
            <i>Always Open for Opportunities</i>
          </p>
        </div>
        
        {/* Right side - Social buttons - moved further apart */}
        <div className="transform scale-[1.8]">
          <SocialButtons className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} />
        </div>
      </div>
      
      {/* Decorative line similar to header */}
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