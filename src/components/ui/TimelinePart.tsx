import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import CategoryContainer from './CategoryContainer';
import '../../lib/timelinepart.css';

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

interface CategoryProps {
  title: string;
  entries: {
    title: string;
    logoUrl?: string;
    position: string;
    accomplishments?: string[];
    dateRange?: string;
    hoverCard?: HoverCardConfig; // Added this line
  }[];
}


interface TimelinePartProps {
  romanNumeral: "I" | "II" | "III";
  subtitle: string;
  categories: CategoryProps[];
  isLastPart?: boolean;
}

const TimelinePart: React.FC<TimelinePartProps> = ({
  romanNumeral,
  subtitle,
  categories,
  isLastPart = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [isCircleActive, setIsCircleActive] = useState(false);
  const partRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newIsVisible = entry.isIntersecting;
        setIsVisible(newIsVisible);

        // Activate/deactivate circle based on visibility
        if (newIsVisible) {
          setTimeout(() => {
            setIsCircleActive(true);
          }, 300); // Slight delay before circle activates
        } else {
          setIsCircleActive(false); // Immediately deactivate when scrolled away
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (partRef.current) {
      observer.observe(partRef.current);
    }

    return () => {
      if (partRef.current) {
        observer.unobserve(partRef.current);
      }
    };
  }, []);

  // Only start tracking line progress after circle is active
  useEffect(() => {
    if (!isCircleActive) {
      setLineProgress(0);
      return;
    }

    // Delay the line animation to start after circle has activated
    const lineTimer = setTimeout(() => {
      const handleScroll = () => {
        if (!partRef.current) return;

        const rect = partRef.current.getBoundingClientRect();
        const partHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate how much of the part has been scrolled past
        // Start filling from when the circle is 20% down the viewport
        const startPoint = rect.top + 300; // Adjusted for larger circle (300px)
        const endPoint = rect.bottom - 100; // 100px above bottom
        const totalScrollDistance = endPoint - startPoint;

        // How far we've scrolled in this range
        const scrolledPast = Math.min(
          Math.max(0, window.innerHeight * 0.2 - startPoint),
          totalScrollDistance
        );

        // Calculate progress as a percentage
        let progress = Math.max(0, Math.min(1, scrolledPast / totalScrollDistance));

        // Smooth out the progress update
        setLineProgress(prev => {
          const diff = progress - prev;
          return Math.abs(diff) < 0.001 ? progress : prev + diff * 0.08;
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initialize on mount

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, 600); // Delay line animation after circle activates

    return () => clearTimeout(lineTimer);
  }, [isCircleActive]);

  return (
    <div ref={partRef} className="timeline-part relative">
      {/* Gradient circle with Roman numeral - always visible but changes state */}
      <div
        className={`
          numeral-circle 
          ${isCircleActive ? 'circle-active' : 'circle-inactive'}
          transition-all duration-700
        `}
      >
        <div className="roman-numeral">{romanNumeral}</div>
        <div className="part-subtitle">{subtitle}</div>
      </div>

      {/* Remove the Tailwind-based line that was here */}

      {/* Categories container */}
      <div className="categories-container">
        {categories.map((category: CategoryProps, index: number) => (
          <CategoryContainer
            key={index}
            title={category.title}
            entries={category.entries}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelinePart;