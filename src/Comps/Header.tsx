import React, { useState, useEffect } from 'react';
import mainLogo from '../assets/mainlogo.png';
import GifButton from './GifButton';
import { BackgroundGradient } from "../components/ui/background-gradient";
import { useTheme } from '../lib/ThemeContext';
import { FaShoppingCart, FaSearch, FaHeart, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const [themeTransition, setThemeTransition] = useState(false);

  useEffect(() => {
    setThemeTransition(true);
    const timer = setTimeout(() => setThemeTransition(false), 800);
    return () => clearTimeout(timer);
  }, [darkMode]);

  const handleGifClick = () => {
    setIsExpanded(!isExpanded);
  };

  const logoFilter = darkMode
    ? 'brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(500%) hue-rotate(345deg) brightness(205%) contrast(95%) opacity(0.85)'
    : 'brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(900%) hue-rotate(240deg) brightness(70%) contrast(90%) opacity(0.65)';

  const glowColor = darkMode 
    ? 'rgba(255, 180, 10, 0.85)'
    : 'rgba(128, 0, 255, 0.85)';

  const storeName = "SecondChance";
  const storeTagline = "Quality Finds, Second Life";

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
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
        <div 
          className="transition-all duration-700 ease-in-out"
          style={{
            width: '56vw',
            height: '2px',
            borderTop: `2px solid ${darkMode ? 'rgba(255, 175, 0, 0.8)' : 'rgba(128, 0, 255, 0.8)'}`,
            boxShadow: `0 0 15px ${glowColor}`,
            opacity: darkMode ? 0.75 : 0.65,
            backgroundColor: 'transparent',
            transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="w-full flex justify-between items-center h-full">
          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className={`text-sm font-medium hover:underline ${darkMode ? 'text-amber-200' : 'text-purple-700'}`}>
              New Arrivals
            </a>
            <a href="#" className={`text-sm font-medium hover:underline ${darkMode ? 'text-amber-200' : 'text-purple-700'}`}>
              Categories
            </a>
            <a href="#" className={`text-sm font-medium hover:underline ${darkMode ? 'text-amber-200' : 'text-purple-700'}`}>
              Deals
            </a>
          </div>
          
          <div className="lg:hidden flex items-center">
            <button className={`p-2 rounded-full ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
              <FaBars size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
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
                  alt="SecondChance Logo"
                  className="h-[75%] w-[75%] object-contain"
                  style={{
                    filter: logoFilter,
                    transition: 'filter 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
                  }}
                />
              </div>
            </BackgroundGradient>
            
            <div className="flex flex-col">
              <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
                {storeName}
              </h1>
              <p className={`text-sm italic ${darkMode ? 'text-amber-200/70' : 'text-purple-500/70'}`}>
                {storeTagline}
              </p>
            </div>

            <div className="flex-shrink-0 relative z-20 ml-4">
              <GifButton
                isExpanded={isExpanded}
                handleGifClick={handleGifClick}
                isDarkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button className={`p-2 rounded-full hover:bg-opacity-20 ${
              darkMode ? 'hover:bg-amber-300/20 text-amber-300' : 'hover:bg-purple-600/20 text-purple-600'
            }`}>
              <FaSearch size={18} />
            </button>
            <button className={`p-2 rounded-full hover:bg-opacity-20 ${
              darkMode ? 'hover:bg-amber-300/20 text-amber-300' : 'hover:bg-purple-600/20 text-purple-600'
            }`}>
              <FaHeart size={18} />
            </button>
            <button className={`p-2 rounded-full hover:bg-opacity-20 ${
              darkMode ? 'hover:bg-amber-300/20 text-amber-300' : 'hover:bg-purple-600/20 text-purple-600'
            }`}>
              <FaShoppingCart size={18} />
            </button>
          </div>
          
          <div className="lg:hidden flex items-center w-[20px]"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;