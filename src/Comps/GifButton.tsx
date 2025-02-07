import React, { useEffect, useState, useRef } from 'react';
import backgroundGif from '../assets/background.gif';
import whatsapp from '../assets/icons/Whatsapp.png';
import instagram from '../assets/icons/Instagram.png';
import linkedin from '../assets/icons/Linkedin.png';
import sun from '../assets/icons/Sun.png';
import moon from '../assets/icons/Moon.png';
import '../index.css';

interface GifButtonProps {
  isExpanded: boolean;
  handleGifClick: () => void;
}

const GifButton: React.FC<GifButtonProps> = ({ isExpanded, handleGifClick }) => {
  const [showExtension, setShowExtension] = useState(false);
  const [buttonVisibility, setButtonVisibility] = useState([false, false, false, false]);
  const [slidePosition, setSlidePosition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSun, setIsSun] = useState(true);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [wobble, setWobble] = useState(false);
  const [scrollInertia, setScrollInertia] = useState(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  const icons = [whatsapp, instagram, linkedin, isSun ? sun : moon];

  const handleSunMoonToggle = (index: number) => {
    if (index === 3) {
      setIsSun(!isSun);
    }
  };

  useEffect(() => {
    let lastScrollPos = window.scrollY;
    const handleScroll = () => {
      const newY = window.scrollY;
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
    };
    window.addEventListener('scroll', handleScroll);
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
          const delays = [0, 250, 500, 750];
          delays.forEach((delay, index) => {
            setTimeout(() => {
              setButtonVisibility(prev => {
                const next = [...prev];
                next[3 - index] = true;
                return next;
              });
            }, delay);
          });
          setTimeout(() => setIsTransitioning(false), 750);
        }, 1000);
      } else {
        setShowExtension(true);
        const delays = [0, 250, 500, 750];
        delays.forEach((delay, index) => {
          setTimeout(() => {
            setButtonVisibility(prev => {
              const next = [...prev];
              next[3 - index] = true;
              return next;
            });
          }, delay);
        });
        setTimeout(() => setIsTransitioning(false), 750);
      }
    } else {
      if (!isScrolledDown) {
        const delays = [0, 100, 200, 300];
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
          setSlidePosition(false);
          setIsTransitioning(false);
        }, 400);
      } else {
        const delays = [0, 100, 200, 300];
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
        }, 400);
      }
    }
  }, [isExpanded, isScrolledDown]);

  const handleClick = () => {
    if (!isTransitioning) {
      handleGifClick();
    }
  };

  const slideOffset = slidePosition ? 128 : 0;
  const totalOffset = slideOffset + scrollInertia;

  return (
    <div
      onAnimationEnd={() => setWobble(false)}
      className={`fixed right-10 top-15 -mt-3 transform transition-transform duration-1000 ${
        wobble ? (scrollDirection === 'down' ? 'animate-wobble-up' : 'animate-wobble-down') : ''
      }`}

      style={!wobble ? { transform: `translateY(${totalOffset}px)` } : {}}
    >
      <div className="relative">
        <div
          className={`flex items-center gap-4 text-white p-2 transition-opacity duration-500 ${
            showExtension ? 'opacity-100' : 'opacity-0'
          } absolute`}
          style={{ right: '100%', marginRight: '15px' }}
        >
          {icons.map((icon, index) => (
            <button
              key={index}
              onClick={() => handleSunMoonToggle(index)}
              className={`bg-gradient-to-r from-[#c6daff] to-[#88B1FF] text-white rounded-full w-20 h-20 flex items-center justify-center 
                transition-all duration-500 border border-gray-200 ${
                buttonVisibility[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <img src={icon} alt={`Icon ${index + 1}`} className="w-12 h-12 object-contain" />
            </button>
          ))}
        </div>
        <div 
          className="w-24 h-24 rounded-full overflow-hidden bg-[#88B1FF] flex items-center justify-center"
          onClick={handleClick}
        >
          <img src={backgroundGif} alt="Background GIF" className="w-20 h-20 object-contain cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default GifButton;