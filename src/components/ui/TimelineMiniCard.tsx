import React, { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import '../../lib/hovercard.css';

interface TimelineMiniCardProps {
  verticalPosition: number;
  horizontalPosition: number;
  scale?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  delay?: number;
  appearanceDelay?: number; // New prop for appearance delay
  miniCardIndex?: number;
  isVisible?: boolean;
}

const TimelineMiniCard: React.FC<TimelineMiniCardProps> = ({
  verticalPosition,
  horizontalPosition,
  scale = 1,
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  delay = 0,
  appearanceDelay = 1000,
  miniCardIndex = 1,
  isVisible = false
}) => {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const themeClass = darkMode ? 'dark-mini' : 'light-mini';

  // Set mounted after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Add delayed visibility when isVisible changes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isVisible) {
      // Add delay before showing
      timer = setTimeout(() => {
        setShouldShow(true);
      }, appearanceDelay);
    } else {
      // Hide immediately when not visible
      setShouldShow(false);
    }
    
    return () => clearTimeout(timer);
  }, [isVisible, appearanceDelay]);

  // Calculate adjusted scale (20% smaller)
  const adjustedScale = scale * 0.8;

  // Applied style with vertical offset
  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    top: `calc(${verticalPosition}vh + 350px)`,
    left: '50%',
    transform: `
      translateX(${horizontalPosition}px) 
      translateY(-50%) 
      scale(${adjustedScale}) 
      rotateX(${rotationX}deg) 
      rotateY(${rotationY}deg) 
      rotateZ(${rotationZ}deg)
    `,
    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: shouldShow && mounted ? 1 : 0,
    zIndex: 5
  };

  return (
    <div 
      className={`mini-card ${themeClass} mini-card-${miniCardIndex}`} 
      style={cardStyle}
    />
  );
};

export default TimelineMiniCard;