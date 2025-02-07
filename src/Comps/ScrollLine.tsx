import React, { useEffect, useState } from 'react';

const ScrollLine = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [shine, setShine] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);

      const markerY = (percent / 100) * window.innerHeight;
      const middle = window.innerHeight / 2;
      setShine(Math.abs(markerY - middle) < 1000);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-5 top-0 h-full w-2 bg-gray-500">
      <div 
        style={{ top: `${scrollPercent}%` }} 
        className={`absolute left-0 w-2 h-4 transform -translate-y-1/2 transition-colors duration-300 z-10 ${
          shine ? 'bg-yellow-500' : 'bg-gray-500'
        }`}
      />
    </div>
  );
};

export default ScrollLine;