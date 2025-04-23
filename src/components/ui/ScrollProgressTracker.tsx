import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const ScrollProgressTracker = () => {
  const { darkMode } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [, setScrollingDown] = useState(true);
  const prevScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const scrollThrottleMs = 16; // ~60fps
  const [themeTransition, setThemeTransition] = useState(false);
  
  // Handle theme transition effects
  useEffect(() => {
    setThemeTransition(true);
    const timer = setTimeout(() => setThemeTransition(false), 800);
    return () => clearTimeout(timer);
  }, [darkMode]);
  
  useEffect(() => {
    const updateDocumentHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
    };
    
    const handleScroll = () => {
      const now = Date.now();
      // Throttle scroll event processing
      if (now - lastScrollTimeRef.current < scrollThrottleMs) return;
      lastScrollTimeRef.current = now;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
      
      // Detect scroll direction
      const isScrollingDown = scrollTop > prevScrollRef.current;
      setScrollingDown(isScrollingDown);
      prevScrollRef.current = scrollTop;
      
      setScrollProgress(progress);
    };
    
    // Animation loop with optimized updates - made even slower and "heavier" feeling
    const animateProgress = () => {
      setDisplayProgress(prev => {
        // Adjust smoothing factor based on distance to thresholds to prevent jams
        const distanceToThreshold = Math.min(
          Math.abs(prev - 0.02), 
          Math.abs(prev - 0.96)
        );
        
        // Further reduced smoothing factors to make movement even slower and heavier
        // Use an even slower animation factor overall but slightly faster near thresholds
        const smoothingFactor = distanceToThreshold < 0.05 ? 0.02 : 0.004;
        
        const diff = scrollProgress - prev;
        const delta = diff * smoothingFactor;
        
        // Require a smaller difference to snap to exact position
        return Math.abs(diff) < 0.0003 ? scrollProgress : prev + delta;
      });
      
      animationRef.current = requestAnimationFrame(animateProgress);
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDocumentHeight);
    
    // Initialize on mount
    updateDocumentHeight();
    handleScroll();
    
    // Start the animation loop
    animationRef.current = requestAnimationFrame(animateProgress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDocumentHeight);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress]);
  
  const topDiamondActive = displayProgress > 0.025;
  const bottomDiamondActive = displayProgress >= 0.95;
  
  const trackColor = darkMode ? 'bg-gray-700/50' : 'bg-gray-300/50';

  const progressColor = darkMode ? 'bg-amber-400' : 'bg-purple-500';
  const glowColor = darkMode ? 'bg-amber-300' : 'bg-purple-600';
  const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300';
  const shadowColor = darkMode ? 'rgba(251, 191, 36, 0.6)' : 'rgba(168, 85, 247, 0.4)';

  const themeTransitionClass = themeTransition ? 'animate-color-shift' : '';

  return (
  <div className="absolute left-[2vw] top-0 z-40 pointer-events-none hidden sm:block" style={{ height: documentHeight }}>
      <div className="h-full flex flex-col items-center justify-between py-8">
        <div className={`w-6 h-6 relative ${themeTransitionClass}`}>
          <div 
            className={`absolute inset-0 ${glowColor} blur-lg transform scale-[2.2] rotate-45 rounded-lg transition-all duration-800 ${
              topDiamondActive ? (darkMode ? 'opacity-40' : 'opacity-30') : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.7s ease, background-color 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
          />
          
          <div 
            className={`absolute inset-0 transform rotate-45 rounded-lg transition-all duration-700 will-change-transform ${
              topDiamondActive 
                ? `${progressColor} ${darkMode ? 'shadow-amber-400/50' : 'shadow-purple-500/40'}` 
                : `bg-transparent border-2 ${borderColor}`
            }`}
            style={{ transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1), background-color 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
          />
        </div>
        
        <div className="relative flex-grow w-0.5 mx-auto my-4">
          <div className={`absolute top-0 left-0 w-full h-full ${trackColor} transition-colors duration-800`} />
          <div 
            className={`absolute top-0 left-0 w-full ${progressColor} will-change-transform ${themeTransitionClass}`}
            style={{ 
              height: `${displayProgress * 100}%`,
              boxShadow: displayProgress > 0 ? `0 0 8px ${shadowColor}` : 'none',
              filter: darkMode 
                ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))'
                : 'drop-shadow(0 0 3px rgba(168, 85, 247, 0.3))',
              transition: 'height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease, background-color 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          />
        </div>
        
        <div className={`w-6 h-6 relative ${themeTransitionClass}`}>
          <div 
            className={`absolute inset-0 ${glowColor} blur-lg transform scale-[2.2] rotate-45 rounded-lg transition-all duration-800 ${
              bottomDiamondActive ? (darkMode ? 'opacity-40' : 'opacity-30') : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.7s ease, background-color 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
          />
          
          <div 
            className={`absolute inset-0 transform rotate-45 rounded-lg transition-all duration-700 will-change-transform ${
              bottomDiamondActive 
                ? `${progressColor} ${darkMode ? 'shadow-amber-400/50' : 'shadow-purple-500/40'}` 
                : `bg-transparent border-2 ${borderColor}`
            }`}
            style={{ transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1), background-color 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollProgressTracker;