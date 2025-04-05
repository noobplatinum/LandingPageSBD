import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import TimelineEntryBox from './TimelieEntryBox';
import '../../lib/categorycontainer.css';
import { DirectionAwareHover } from './direction-aware-hover';
import { AnimatePresence, motion } from 'framer-motion';

const useViewportWidthPercentage = () => {
  const [widthPercentage, setWidthPercentage] = useState(100);

  useEffect(() => {
    const checkWidth = () => {
      const screenWidth = window.innerWidth;
      const screenAvailWidth = window.screen.availWidth;
      const percentage = (screenWidth / screenAvailWidth) * 100;
      setWidthPercentage(percentage);
    };
    
    // Initial check
    checkWidth();
    
    // Add listener for resize events
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return widthPercentage;
};

// Separate function to check if viewport is below a threshold
const useIsViewportBelow = (thresholdPercentage: number) => {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const screenWidth = window.innerWidth;
      const screenAvailWidth = window.screen.availWidth;
      const percentage = (screenWidth / screenAvailWidth) * 100;
      setIsBelow(percentage < thresholdPercentage);
    };
    
    // Initial check
    checkWidth();
    
    // Add listener for resize events
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [thresholdPercentage]);

  return isBelow;
};

interface HoverCardConfig {
  side: 'left' | 'right';
  imageUrl: string;
  content: string | React.ReactNode;
  verticalOffset?: number;
  horizontalOffset?: number;
  scale?: number;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
}

interface TimelineEntryProps {
  title: string;
  logoUrl?: string;
  position: string;
  accomplishments?: string[];
  dateRange?: string;
  hoverCard?: HoverCardConfig;
}

interface CategoryContainerProps {
  title: string;
  entries: TimelineEntryProps[];
  isVisible?: boolean;
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({ 
  title, 
  entries, 
  isVisible = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { darkMode } = useTheme();
  
  // Track visibility for title animation
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  
  // Track which cards are visible based on intersection observer
  const [cardVisibility, setCardVisibility] = useState<{[key: number]: boolean}>({});
  
  // Get current viewport width as percentage of screen
  const viewportWidthPercentage = useViewportWidthPercentage();
  
  // Should cards be hidden completely? (below 45%)
  const hideCards = viewportWidthPercentage < 45;
  
  // Calculate progressive scale factor
  const getProgressiveScale = (originalScale: number = 1) => {
    if (viewportWidthPercentage >= 75) return originalScale;
    if (viewportWidthPercentage <= 45) return originalScale * 0.5;
    
    // Linear interpolation between 100% and 50% scale
    const scalePercentage = ((viewportWidthPercentage - 45) / 30);
    return originalScale * (0.5 + (scalePercentage * 0.5));
  };
  
  // Calculate progressive offset reduction
  const getProgressiveOffset = (originalOffset: number = 0) => {
    if (viewportWidthPercentage >= 75) return originalOffset;
    if (viewportWidthPercentage <= 45) return originalOffset * 0.3;
    
    // Linear interpolation
    const offsetPercentage = ((viewportWidthPercentage - 45) / 30);
    return originalOffset * (0.3 + (offsetPercentage * 0.7));
  };

  // Effect to handle title visibility
  useEffect(() => {
    if (!isVisible) {
      setIsTitleVisible(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsTitleVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isVisible]);
  
  // Prepare refs array for each entry
  useEffect(() => {
    entryRefs.current = Array(entries.length).fill(null);
    cardRefs.current = Array(entries.length).fill(null);
  }, [entries.length]);
  
  // Reset card visibility on resize beyond thresholds
  useEffect(() => {
    if (hideCards) {
      // Reset all cards to invisible when below threshold
      setCardVisibility({});
    } else if (viewportWidthPercentage >= 75 && isVisible) {
      // Make all cards potentially visible when above threshold
      const newVisibility: {[key: number]: boolean} = {};
      entries.forEach((_, index) => {
        newVisibility[index] = true;
      });
      setCardVisibility(newVisibility);
    }
  }, [hideCards, viewportWidthPercentage, entries.length, isVisible]);
  
  // Set up intersection observers for card visibility
  useEffect(() => {
    if (!isVisible || hideCards) return;
    
    const observers: IntersectionObserver[] = [];
    
    entries.forEach((entry, index) => {
      if (entry.hoverCard && entryRefs.current[index]) {
        const observer = new IntersectionObserver(
          ([e]) => {
            // Show card when entry is significantly visible
            setCardVisibility(prev => ({
              ...prev,
              [index]: e.isIntersecting && e.intersectionRatio > 0.6
            }));
          },
          { threshold: [0.6, 0.8] }
        );
        
        observer.observe(entryRefs.current[index]!);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [isVisible, entries, hideCards]);

  return (
    <div ref={containerRef} className="category-container">
      <h2 className={`category-title theme-transition-text ${darkMode ? 'dark-mode-text' : 'light-mode-text'} ${isTitleVisible ? 'title-visible' : 'title-hidden'}`}>
        {title}
      </h2>
      
      <div className="timeline-entries">
        {entries.map((entry, index) => (
          <div 
            key={index} 
            className="timeline-entry-wrapper mb-6 relative" 
            ref={el => entryRefs.current[index] = el}
          >
            {/* Main timeline entry box */}
            <TimelineEntryBox
              title={entry.title}
              logoUrl={entry.logoUrl}
              position={entry.position}
              accomplishments={entry.accomplishments}
              dateRange={entry.dateRange}
              isVisible={isVisible && isTitleVisible}
            />
            
            <AnimatePresence>
              {entry.hoverCard && isVisible && !hideCards && cardVisibility[index] && (
                <motion.div 
                  ref={el => cardRefs.current[index] = el}
                  className="absolute"
                  style={{ 
                    [entry.hoverCard.side === 'left' ? 'right' : 'left']: '100%',
                    top: entry.hoverCard.verticalOffset ? `${entry.hoverCard.verticalOffset}px` : '0px',
                    zIndex: 40,
                  }}
                  initial={{ 
                    opacity: 0, 
                    x: entry.hoverCard.side === 'left' ? -20 : 20,
                    y: 20,
                  }}
                  animate={{ 
                    opacity: 1,
                    x: entry.hoverCard.side === 'left' 
                      ? getProgressiveOffset(entry.hoverCard.horizontalOffset || -60)
                      : getProgressiveOffset(entry.hoverCard.horizontalOffset || 20),
                    y: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: entry.hoverCard.side === 'left' ? -20 : 20,
                    y: 20,
                  }}
                  transition={{ 
                    duration: 0.7,
                    ease: "easeInOut",
                    y: { duration: 0.8 }
                  }}
                >
                  {/* Apply scaling to the container div rather than the DirectionAwareHover component */}
                  <div 
                    className={`glow-container ${darkMode ? 'dark-glow' : 'light-glow'}`} 
                    style={{ 
                      borderRadius: '8px', 
                      overflow: 'hidden',
                      transition: 'transform 0.2s ease', // Fast transition for resizing
                      // Scale the entire container based on viewport and scale property
                      transform: `scale(${getProgressiveScale(entry.hoverCard.scale || 1)})`,
                      transformOrigin: entry.hoverCard.side === 'left' ? 'right center' : 'left center',
                      // Set base dimensions
                      width: entry.hoverCard.maxWidth || '250px',
                      height: 'auto',
                    }}
                  >
                    <DirectionAwareHover
                      imageUrl={entry.hoverCard.imageUrl}
                      maintainAspectRatio={true}
                      // Remove scale from here - we're applying it to the container
                      scale={undefined}
                      className="timeline-hover-card w-full h-auto"
                      childrenClassName="text-white text-lg font-medium p-2"
                    >
                      {entry.hoverCard.content}
                    </DirectionAwareHover>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryContainer;