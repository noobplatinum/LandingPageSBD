import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../lib/ThemeContext';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  transitionDuration?: number; 
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  interval = 6000, 
  transitionDuration = 1500 
}) => {
  const { darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }

      autoplayTimerRef.current = setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, transitionDuration);
        
        startAutoplay();
      }, interval);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, images.length, interval, transitionDuration, isVisible]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };

  return (
    <div 
      ref={carouselRef}
      className="w-full relative overflow-hidden"
      style={{
        height: 'calc(50vh - 12.5vh)',
        minHeight: '300px',
        maxHeight: '600px',
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all ${
              index === currentIndex 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0'
            }`}
            style={{ 
              transitionProperty: 'opacity, transform',
              transitionDuration: `${transitionDuration}ms`,
              transitionTimingFunction: 'ease-in-out',
              transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
            }}
          >
            <img 
              src={image} 
              alt={`Carousel slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            <div 
              className="absolute inset-0 bg-gradient-to-b"
              style={{
                background: darkMode 
                  ? 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(10,10,10,0.9) 100%)'
                  : 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,0.9) 100%)'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? darkMode 
                  ? 'bg-amber-300 w-10'
                  : 'bg-purple-600 w-10'
                : darkMode 
                  ? 'bg-amber-300/30 hover:bg-amber-300/50'
                  : 'bg-purple-600/30 hover:bg-purple-600/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-center transform transition-all duration-700">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          darkMode ? 'text-amber-300' : 'text-purple-700'
        }`}>
          SecondChance Marketplace
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Discover quality pre-loved items at incredible prices
        </p>
      </div>
    </div>
  );
};

export default ImageCarousel;