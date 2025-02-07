import React, { useState } from 'react';
import mainLogo from '../assets/mainlogo.png';
import GifButton from './GifButton'; 

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGifClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
  <header
    className="text-white z-50 h-[11.5vh] w-[100vw]"
    style={{
      marginLeft: "calc(50% - 50vw)",
      backgroundImage: `linear-gradient(to right, rgb(157, 71, 255), #88b1ff, #88b1ff)`,
      backgroundBlendMode: "overlay",
      marginTop: 0
    }}
  >
        <div className="flex items-center relative h-18">
          <div className="mr-4 ml-5">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 p-2 ml-[1vw] mt-[4vh]">
              <img
                src={mainLogo}
                alt="Logo"
                className="w-full h-full object-contain"
                style={{ filter: 'brightness(0) invert(0.9)' }}
              />
            </div>
          </div>
          <div className='h-[1vh] '>
            <p className="text-left text-2xl font-light">Test</p>
            <p className="text-left text-lg italic">Website in Progress</p>
          </div>
          <GifButton isExpanded={isExpanded} handleGifClick={handleGifClick} />
        </div>
      </header>
  );
};

export default Header;