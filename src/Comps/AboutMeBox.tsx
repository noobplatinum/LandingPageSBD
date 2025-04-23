import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { FlipWords } from '../components/ui/flip-words';

const AboutMeBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);
  const { darkMode } = useTheme();

  const categoryList = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Collectibles"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      {
        threshold: 0.5,
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
  }, []);

  return (
    <div ref={boxRef} className={`w-full p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/5">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
            Discover Sustainable Shopping
          </h1>
          
          <div className="flex items-center mb-6">
            <span className="text-xl mr-2">Find quality</span>
            <FlipWords 
              words={categoryList}
              duration={2000}
              className={`text-xl font-semibold ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}
            />
          </div>
          
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            At SecondChance, we believe in giving pre-loved items a new home. Our carefully curated 
            collection of second-hand goods offers sustainable shopping options at incredible prices.
          </p>
          
          <div className="flex gap-4">
            <button className={`px-6 py-2 rounded-lg transition ${
              darkMode 
                ? 'bg-amber-400 text-black hover:bg-amber-500' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}>
              Shop Now
            </button>
            <button className={`px-6 py-2 rounded-lg border transition ${
              darkMode 
                ? 'border-amber-300/50 text-amber-300 hover:bg-amber-400/10' 
                : 'border-purple-600/50 text-purple-600 hover:bg-purple-600/10'
            }`}>
              Learn More
            </button>
          </div>
        </div>
        
        <div className="md:w-2/5 flex justify-center items-center">
          <div className={`w-64 h-64 rounded-full overflow-hidden border-4 ${
            darkMode ? 'border-amber-300/30' : 'border-purple-600/30'
          }`}>
            <img 
              src="https://placehold.co/400x400?text=Our+Story" 
              alt="About" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeBox;