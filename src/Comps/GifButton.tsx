import React, { useEffect, useState, useRef } from 'react';
import backgroundGif from '../assets/bgpurple.gif';
import whatsapp from '../assets/icons/Whatsapp.png';
import instagram from '../assets/icons/Instagram.png';
import linkedin from '../assets/icons/Linkedin.png';
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
  
  // Updated filter for a more yellow tone - adjusted to get a yellow/orange color that matches the buttons
  const darkModeFilter = isDarkMode ? 
    { filter: 'hue-rotate(138deg) brightness(1.55) saturate(1.5)', transition: 'none' } : 
    { transition: 'none' };
    
  // Child buttons gradient style - keep animations here
  const darkModeChildButtonStyle = isDarkMode ? {
    background: 'linear-gradient(to right, #ffcc00, #ffa500)',
    filter: 'brightness(1.05)',
    transition: 'all 0.5s ease'
  } : {
    transition: 'all 0.5s ease'
  };
  
  // Main button flat style - remove transition
  const darkModeMainButtonStyle = isDarkMode ? {
    backgroundColor: '#ffd000',
    transition: 'none'
  } : {
    transition: 'none'
  };
  
  const HEADER_HEIGHT = 11.5; // vh
  
  // Define positions for inside and outside header
  const INSIDE_HEADER_TOP = 1.4; // vh (moved up from 3.2vh)
  const OUTSIDE_HEADER_TOP = 3.5; // vh (original position)

  const icons = [whatsapp, instagram, linkedin, sun];

  const handleSunMoonToggle = (index: number) => {
    if (index === 3) {
      setIsSun(!isSun);
      toggleDarkMode(); 
    }
  };

  useEffect(() => {
    let lastScrollPos = window.scrollY;
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
      const newY = window.scrollY;
      const headerHeightPx = (HEADER_HEIGHT * window.innerHeight) / 100;
      
      // Check if button is inside header
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
        // Slide down first with slower timing
        setSlidePosition(true);
        setTimeout(() => {
          setShowExtension(true);
          // Increased delays between icons appearing
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
          // Extended final transition time
          setTimeout(() => setIsTransitioning(false), 1100);
        }, 600); // Increased from 400ms to 600ms
      } else {
        // Outside header behavior - also slowed down
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
        // Hide buttons first with slower timing
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
        // Extended wait before hiding extension and sliding back
        setTimeout(() => {
          setShowExtension(false);
          // Longer delay before sliding back up
          setTimeout(() => {
            setSlidePosition(false);
            setIsTransitioning(false);
          }, 350); // Increased from 200ms to 350ms
        }, 500); // Increased from 400ms to 500ms
      } else {
        // Outside header behavior - also slowed down
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
        }, 500); // Increased from 400ms to 500ms
      }
    }
  }, [isExpanded, isScrolledDown]);

  // Increase slide distance from 160 to 190 for more movement
  const SLIDE_DISTANCE = 12; // vh (was 190px before)
  const slideOffset = slidePosition ? SLIDE_DISTANCE : 0; 
  
  // Convert scrollInertia to vh units too for consistency
  const inertiaVh = scrollInertia * 0.2; // Approximate vh equivalent
  
  const totalOffset = `${slideOffset + inertiaVh}vh`; // Now using vh units
  const topPosition = isInsideHeader ? INSIDE_HEADER_TOP : OUTSIDE_HEADER_TOP;

  return (
    <div
      onAnimationEnd={() => setWobble(false)}
      className={`fixed right-[2vw] transform transition-all duration-800 ${
        wobble ? (scrollDirection === 'down' ? 'animate-wobble-up' : 'animate-wobble-down') : ''
      }`}
      style={!wobble ? { 
        transform: `translateY(${totalOffset})`, // No need for 'px' since using vh
        top: `${topPosition}vh` 
      } : {
        top: `${topPosition}vh`
      }}
    >
      <div className="relative">
      <div className={`flex items-center gap-[1vh] text-white p-[1vh] transition-opacity duration-500 ${
          showExtension ? 'opacity-100' : 'opacity-0'
        } absolute`}
        style={{ right: '100%', marginRight: '1vh' }}
      >
        {icons.map((icon, index) => (
          <button
            key={index}
            onClick={() => handleSunMoonToggle(index)}
            className={`text-white rounded-full h-[8vh] w-[8vh] flex items-center justify-center 
                  transition-transform duration-500 border border-gray-200 hover:scale-110 ${
              buttonVisibility[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            } ${!isDarkMode ? 'bg-gradient-to-r from-[#84afff] to-[#ae6dda]' : ''}`}
            // Apply the dark mode style to child buttons with transition
            style={darkModeChildButtonStyle}
          >
            {index === 3 ? (
              <div className={`relative w-[3vh] h-[3vh] transition-transform duration-500 ${!isDarkMode ? '' : 'rotate-720'}`}>
                <img 
                  src={sun} 
                  alt="Sun" 
                  className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ${!isDarkMode ? 'opacity-100' : 'opacity-0'}`} 
                />
                <img 
                  src={moon} 
                  alt="Moon" 
                  className={`w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-500 ${!isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                  // Make moon visible in dark mode
                  style={isDarkMode ? { filter: 'brightness(0) invert(1)', transition: 'filter 0.5s ease' } : { transition: 'filter 0.5s ease' }}
                />
              </div>
            ) : (
              <img 
                src={icon} 
                alt={`Icon ${index + 1}`} 
                className="w-[3vh] h-[3vh] object-contain"
                style={isDarkMode ? { filter: 'brightness(0) invert(1)', transition: 'filter 0.5s ease' } : { transition: 'filter 0.5s ease' }}
              />
            )}
          </button>
        ))}
      </div>
      <div 
        className={`w-[9vh] h-[9vh] rounded-full overflow-hidden flex items-center justify-center ${!isDarkMode ? 'bg-[#ae6dda]' : ''}`}
        onClick={handleGifClick}
        // Apply flat color to main button with transition
        style={darkModeMainButtonStyle}
      >
        <img 
          src={backgroundGif} 
          alt="Background GIF" 
          className="w-[7vh] h-[7vh] object-contain cursor-pointer"
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