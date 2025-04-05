import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import '../../lib/timelineentry.css';
import LineDecoration from './LineDecoration';
import { DirectionAwareHover } from './direction-aware-hover';

interface TimelineEntryBoxProps {
  title: string;
  logoUrl?: string;
  position: string;
  accomplishments?: string[];
  dateRange?: string;
  isVisible?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
  hoverCard?: HoverCardConfig;
}

interface HoverCardConfig {
  side: 'left' | 'right';
  imageUrl: string;
  content: string | React.ReactNode;
  verticalOffset?: number; // in pixels
  horizontalOffset?: number; // in pixels (new)
  scale?: number; // Scaling factor for the image (new)
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string; // Minimum width to ensure visibility (new)
}

const TimelineEntryBox: React.FC<TimelineEntryBoxProps> = ({
  title,
  logoUrl,
  position,
  accomplishments = [],
  dateRange,
  isVisible: categoryIsVisible,
  onVisibilityChange,
  hoverCard
}) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();
  
  // Check if we have accomplishments to show
  const hasAccomplishments = accomplishments && accomplishments.length > 0;

  useEffect(() => {
    // Only observe if the category is visible
    if (!categoryIsVisible) {
      setIsBoxVisible(false);
      if (onVisibilityChange) onVisibilityChange(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Box lights up at 70% visibility
        const newIsVisible = entry.isIntersecting && entry.intersectionRatio >= 0.7;
        setIsBoxVisible(newIsVisible);
        
        // Notify parent if callback provided
        if (onVisibilityChange && newIsVisible !== isBoxVisible) {
          onVisibilityChange(newIsVisible);
        }
      },
      {
        threshold: 0.7, // 70% visibility threshold
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
  }, [categoryIsVisible, onVisibilityChange, isBoxVisible]);

  return (
    <div className="relative">
    
      <div 
        ref={boxRef} 
        className={`timeline-entry-box ${darkMode ? 'dark-box' : 'light-box'} ${isBoxVisible ? 'box-visible' : 'box-hidden'} ${!hasAccomplishments ? 'compact-box' : ''}`}
      >
        <div className="timeline-entry-content">
          {/* Title section with logo */}
          <div className="title-section">
            {logoUrl && (
              <div className={`org-logo ${isBoxVisible ? 'logo-visible' : 'logo-hidden'}`}>
                <img src={logoUrl} alt={`${title} logo`} />
              </div>
            )}
            <h3 className={`org-title theme-transition-text ${darkMode ? 'dark-mode-text' : 'light-mode-text'}`}>
              {title}
            </h3>
          </div>
          
          {/* Position subtitle */}
          <p className="position-subtitle">
            {position}
            {dateRange && <span className="date-range">{dateRange}</span>}
          </p>
          
          {hasAccomplishments && (
            <>
              <div className="divider-container">
                <div 
                  className="my-3 w-full max-w-[200px] transition-all duration-500" 
                  style={{
                    height: '2px',
                    background: darkMode ? "#fcd34d" : "#9333ea",
                    opacity: 0.6,
                    boxShadow: darkMode 
                      ? '0 0 4px rgba(251, 191, 36, 0.3)' 
                      : '0 0 4px rgba(147, 51, 234, 0.3)'
                  }}
                />
              </div>
              <ul className="accomplishments-list">
                {accomplishments.map((item, index) => (
                  <li 
                    key={index} 
                    className={`accomplishment-item ${isBoxVisible ? 'item-visible' : 'item-hidden'}`}
                    style={{ transitionDelay: `${0.3 + (index * 0.1)}s` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEntryBox;