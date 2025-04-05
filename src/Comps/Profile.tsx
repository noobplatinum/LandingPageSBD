import React, { useEffect, useRef, useState } from 'react';
import '../lib/hovercard.css'; 
import profileImage from '../assets/profile.jpg';
import { useTheme } from '../lib/ThemeContext';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on 60% threshold
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      {
        threshold: 0.6, // 60% visibility threshold
        rootMargin: '0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="profile-wrapper" ref={containerRef}>
      <div className={`container noselect ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className="canvas">
          {/* Trackers for the hover effect */}
          <div className="tracker tr-1"></div>
          <div className="tracker tr-2"></div>
          <div className="tracker tr-3"></div>
          <div className="tracker tr-4"></div>
          <div className="tracker tr-5"></div>
          <div className="tracker tr-6"></div>
          <div className="tracker tr-7"></div>
          <div className="tracker tr-8"></div>
          <div className="tracker tr-9"></div>
          <div className="tracker tr-10"></div>
          <div className="tracker tr-11"></div>
          <div className="tracker tr-12"></div>
          <div className="tracker tr-13"></div>
          <div className="tracker tr-14"></div>
          <div className="tracker tr-15"></div>
          <div className="tracker tr-16"></div>
          <div className="tracker tr-17"></div>
          <div className="tracker tr-18"></div>
          <div className="tracker tr-19"></div>
          <div className="tracker tr-20"></div>
          <div className="tracker tr-21"></div>
          <div className="tracker tr-22"></div>
          <div className="tracker tr-23"></div>
          <div className="tracker tr-24"></div>
          <div className="tracker tr-25"></div>
          
          <div id="card" ref={cardRef} className={isVisible ? 'card-visible' : 'card-hidden'}>
            <div className="card-image-container">
              <img src={profileImage} alt="Profile" className="card-image" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Independent mini-cards outside of the main card's DOM hierarchy */}
      <div className={`mini-card mini-card-1 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-2 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-3 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-4 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-5 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-6 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-7 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-8 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
      <div className={`mini-card mini-card-9 ${isVisible ? 'mini-card-visible' : 'mini-card-hidden'} ${darkMode ? 'dark-mini' : 'light-mini'}`}></div>
    </div>
  );
};

export default Profile;