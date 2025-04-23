import React, { useEffect, useState, useRef } from 'react';
import backgroundGif from '../assets/bgpurple.gif';
// Replace these imports with React icons
import { FaInfoCircle, FaShoppingBag, FaEnvelope } from 'react-icons/fa'; 
import sun from '../assets/icons/Sun.png';
import moon from '../assets/icons/Moon.png';
import '../index.css';

interface GifButtonProps {
  isExpanded: boolean;
  handleGifClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const GifButton: React.FC<GifButtonProps> = ({ isExpanded, handleGifClick, isDarkMode, toggleDarkMode }) => {
  const [showExtension, setShowExtension] = useState(false);
  const [buttonVisibility, setButtonVisibility] = useState([false, false, false, false]);
  const [slidePosition, setSlidePosition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSun, setIsSun] = useState(true);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [wobble, setWobble] = useState(false);
  const [scrollInertia, setScrollInertia] = useState(0);
  const [isInsideHeader, setIsInsideHeader] = useState(true);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  // Add this navItems array to replace 'icons'
  const navItems = [
    { icon: <FaInfoCircle size="100%" />, sectionId: 'aboutMe', label: 'About' },
    { icon: <FaShoppingBag size="100%" />, sectionId: 'browseItems', label: 'Shop' },
    { icon: <FaEnvelope size="100%" />, sectionId: 'newsletter', label: 'Contact' },
    { icon: null, sectionId: 'theme', label: 'Theme' } // Special case for theme toggle
  ];
  
  const darkModeFilter = isDarkMode ? 
    { filter: 'hue-rotate(138deg) brightness(1.55) saturate(1.5)', transition: 'none' } : 
    { transition: 'none' };
    
  const darkModeChildButtonStyle = isDarkMode ? {
    background: 'linear-gradient(to right, #ffcc00, #ffa500)',
    filter: 'brightness(1.05)',
    transition: 'all 0.5s ease'
  } : {
    transition: 'all 0.5s ease'
  };
  
  const darkModeMainButtonStyle = isDarkMode ? {
    backgroundColor: '#ffd000',
    transition: 'none'
  } : {
    transition: 'none'
  };
  
  const HEADER_HEIGHT = 11.5;
  const INSIDE_HEADER_TOP = 1.4;
  const OUTSIDE_HEADER_TOP = 3.5;
  
  // You can remove this line since we replaced it with navItems
  // const icons = [whatsapp, instagram, linkedin, sun];

  // Add this handleNavigation function to replace handleSunMoonToggle
  const handleNavigation = (index: number) => {
    if (index === 3) {
      // Theme toggle remains the same
      setIsSun(!isSun);
      toggleDarkMode();
      return;
    }
    
    // Get the section ID and scroll to it
    const sectionId = navItems[index].sectionId;
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Close the menu
      handleGifClick();
      
      // Scroll with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    let lastScrollPos = window.scrollY;
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
      const newY = window.scrollY;
      const headerHeightPx = (HEADER_HEIGHT * window.innerHeight) / 100;
      
      setIsInsideHeader(newY < headerHeightPx - 50); 
      setIsScrolledDown(newY > 136);
      const direction = newY > lastScrollPos ? 'down' : 'up';
      setScrollDirection(direction);
      setScrollInertia(direction === 'down' ? -10 : 10);

      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        setScrollInertia(0);
        setWobble(true);
      }, 100);
      lastScrollPos = newY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (isExpanded) {
      if (!isScrolledDown) {
        setSlidePosition(true);
        setTimeout(() => {
          setShowExtension(true);
          const delays = [0, 350, 700, 1050];
          delays.forEach((delay, index) => {
            setTimeout(() => {
              setButtonVisibility(prev => {
                const next = [...prev];
                next[3 - index] = true;
                return next;
              });
            }, delay);
          });
          setTimeout(() => setIsTransitioning(false), 1100);
        }, 600);
      } else {
        setShowExtension(true);
        const delays = [0, 350, 700, 1050];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setButtonVisibility(prev => {
              const next = [...prev];
              next[3 - index] = true;
              return next;
            });
          }, delay);
        });
        setTimeout(() => setIsTransitioning(false), 1100);
      }
    } else {
      if (!isScrolledDown) {
        const delays = [0, 150, 300, 450];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setButtonVisibility(prev => {
              const next = [...prev];
              next[index] = false;
              return next;
            });
          }, delay);
        });
        setTimeout(() => {
          setShowExtension(false);
          setTimeout(() => {
            setSlidePosition(false);
            setIsTransitioning(false);
          }, 350);
        }, 500);
      } else {
        const delays = [0, 150, 300, 450];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setButtonVisibility(prev => {
              const next = [...prev];
              next[index] = false;
              return next;
            });
          }, delay);
        });
        setTimeout(() => {
          setShowExtension(false);
          setIsTransitioning(false);
        }, 500);
      }
    }
  }, [isExpanded, isScrolledDown]);

  const SLIDE_DISTANCE = 12; // vh
  const slideOffset = slidePosition ? SLIDE_DISTANCE : 0;
  const inertiaVh = scrollInertia * 0.2;
  const totalOffset = `${slideOffset + inertiaVh}vh`;
  const topPosition = isInsideHeader ? INSIDE_HEADER_TOP : OUTSIDE_HEADER_TOP;

  return (
    <div
      onAnimationEnd={() => setWobble(false)}
      className={`fixed right-[2vw] z-50 transform transition-all duration-800 ${
        wobble ? (scrollDirection === 'down' ? 'animate-wobble-up' : 'animate-wobble-down') : ''
      }`}
      style={!wobble ? { 
        transform: `translateY(${totalOffset})`,
        top: `${topPosition}vh` 
      } : {
        top: `${topPosition}vh`
      }}
    >
      <div className="relative">
        {/* Navigation buttons container */}
        <div className={`flex items-center gap-[0.8vh] sm:gap-[1vh] md:gap-[1.2vh] text-white p-[0.8vh] transition-opacity duration-500 ${
            showExtension ? 'opacity-100' : 'opacity-0'
          } absolute`}
          style={{ right: '100%', marginRight: '1vh' }}
        >
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(index)}
              title={item.label}
              className={`text-white rounded-full 
                xs:h-[4vh] xs:w-[4vh] sm:h-[5vh] sm:w-[5vh] md:h-[6vh] md:w-[6vh] lg:h-[6.5vh] lg:w-[6.5vh] 
                flex items-center justify-center 
                transition-transform duration-500 border border-gray-200 hover:scale-110 ${
                buttonVisibility[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              } ${!isDarkMode ? 'bg-gradient-to-r from-[#84afff] to-[#ae6dda]' : ''}`}
              style={darkModeChildButtonStyle}
            >
              {index === 3 ? (
                <div className={`relative w-[45%] h-[45%] transition-transform duration-500 ${!isDarkMode ? '' : 'rotate-720'}`}>
                  <img 
                    src={sun} 
                    alt="Light Mode" 
                    className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ${!isDarkMode ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  <img 
                    src={moon} 
                    alt="Dark Mode" 
                    className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ${!isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                    style={isDarkMode ? { filter: 'brightness(0) invert(1)', transition: 'filter 0.5s ease' } : { transition: 'filter 0.5s ease' }}
                  />
                </div>
              ) : (
                <div className="w-[45%] h-[45%] flex items-center justify-center"
                  style={isDarkMode ? { color: 'white' } : {}}
                >
                  {item.icon}
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div 
          className={`rounded-full overflow-hidden flex items-center justify-center ${!isDarkMode ? 'bg-[#ae6dda]' : ''}
            h-[5vh] w-[5vh] sm:h-[6vh] sm:w-[6vh] md:h-[7vh] md:w-[7vh] lg:h-[8vh] lg:w-[8vh]`}
          onClick={handleGifClick}
          style={darkModeMainButtonStyle}
        >
          <img 
            src={backgroundGif} 
            alt="Menu" 
            className="w-[80%] h-[80%] object-contain cursor-pointer"
            style={{
              ...darkModeFilter
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GifButton;