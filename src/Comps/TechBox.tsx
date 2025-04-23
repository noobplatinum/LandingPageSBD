import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../lib/ThemeContext';
import LineDecoration from '../components/ui/LineDecoration';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTruck, FaRecycle, FaCertificate, FaHandshake, 
  FaShieldAlt, FaTag, FaTools, FaExchangeAlt 
} from 'react-icons/fa';

interface ServiceItem {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const TechStack: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [displayTitle] = useState<string>("Klik Tombol-Tombol Ini!");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [titleGlowIntensity] = useState(0);
  const [activeGlow] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      {
        threshold: 0.3,
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

  const themeColors = {
    primary: darkMode ? '#fcd34d' : '#9333ea', 
    secondary: darkMode ? 'rgba(255, 193, 7, 0.4)' : 'rgba(148, 105, 190, 0.4)',
    bg: darkMode ? 'bg-amber-400' : 'bg-purple-600',
    bgHover: darkMode ? 'bg-amber-500' : 'bg-purple-700',
    bgSelected: darkMode ? 'bg-amber-400' : 'bg-purple-600',
    text: darkMode ? 'text-amber-300' : 'text-purple-700',
    iconSelected: darkMode ? 'text-gray-900' : 'text-white',
    iconNormal: darkMode ? 'text-amber-300' : 'text-purple-700',
    border: darkMode ? 'border-amber-300/50' : 'border-purple-500/50',
    borderHover: darkMode ? 'border-amber-300/30' : 'border-purple-300/30',
    boxShadow: darkMode
      ? '0 0 15px rgba(255, 193, 7, 0.3)'
      : '0 0 15px rgba(148, 105, 190, 0.3)',
    textGlow: darkMode
      ? '0 0 20px rgba(255, 193, 7, 0.9), 0 0 10px rgba(255, 193, 7, 0.7)'
      : '0 0 20px rgba(147, 51, 234, 0.9), 0 0 10px rgba(147, 51, 234, 0.7)',
    textGlowLight: darkMode
      ? '0 0 10px rgba(255, 193, 7, 0.5), 0 0 5px rgba(255, 193, 7, 0.3)'
      : '0 0 10px rgba(147, 51, 234, 0.5), 0 0 5px rgba(147, 51, 234, 0.3)',
  };

  const serviceItems: ServiceItem[] = [
    { 
      name: 'Free Delivery', 
      icon: <FaTruck size={42} />,
      description: 'Gratis ongkir untuk pembelian di atas Rp 100.000'
    },
    { 
      name: 'Eco-Friendly', 
      icon: <FaRecycle size={42} />,
      description: 'Mendukung kesehatan lingkungan dan ekosistem'
    },
    { 
      name: 'Quality Verified', 
      icon: <FaCertificate size={42} />,
      description: 'Aman dari produk palsu dan penipuan'
    },
    { 
      name: 'Seller Ratings', 
      icon: <FaHandshake size={42} />,
      description: 'Seller terpercaya dengan rating tinggi'
    },
    { 
      name: 'Buyer Protection', 
      icon: <FaShieldAlt size={42} />,
      description: 'Kebijakan pengembalian barang terjamin'
    },
    { 
      name: 'Great Deals', 
      icon: <FaTag size={42} />,
      description: 'Harga banting dibanding toko lain'
    },
    { 
      name: 'Repair Service', 
      icon: <FaTools size={42} />,
      description: 'Perbaikan barang dengan garansi'
    },
    { 
      name: 'Trade-In Options', 
      icon: <FaExchangeAlt size={42} />,
      description: 'Fasilitas tukar tambah untuk barang elektronik'
    }
  ];

  const handleServiceClick = (serviceName: string) => {
    if (isAnimating) return;

    setIsAnimating(true); 

    setSelectedService(serviceName);
    
  };

  const titleVariants = {
    enter: {
      opacity: 0,
      filter: "blur(12px)"
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div 
      ref={boxRef} 
      className={`w-[90vw] max-w-7xl p-8 py-16 rounded-lg shadow-lg transition-all duration-700 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
          Keunggulan Kami
        </h2>

        <div className="relative h-20 mb-6 flex items-center justify-center overflow-hidden w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayTitle}
              initial="enter"
              animate="visible"
              exit="exit"
              variants={titleVariants}
              className={`text-xl text-center ${themeColors.text} w-full max-w-xl`}
              style={{
                textShadow: titleGlowIntensity > 0 ? themeColors.textGlow : 'none',
                transition: "text-shadow 0.5s ease-in-out"
              }}
            >
              {displayTitle}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative w-[60%] max-w-xl mb-12">
          <LineDecoration
            color={themeColors.primary}
            opacity={0.7}
            height={2}
            className="w-full relative"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 w-full">
          {serviceItems.map((service, index) => {
            const isSelected = selectedService === service.name;
            const isGlowing = activeGlow === service.name;
            
            return (
              <div
                key={service.name}
                onClick={() => handleServiceClick(service.name)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-sm border
                  cursor-pointer transition-all duration-300 aspect-square
                  transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                  ${isSelected
                    ? (darkMode
                      ? 'bg-amber-400/20 border-amber-300'
                      : 'bg-purple-600/20 border-purple-500')
                    : (darkMode
                      ? 'bg-gray-700/50 border-gray-700/30 hover:border-amber-300/30'
                      : 'bg-gray-100/80 border-gray-200 hover:border-purple-300/30')}`}
                style={{
                  boxShadow: isGlowing ? themeColors.boxShadow : 'none',
                  transition: "box-shadow 0.5s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.5s ease",
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                <div
                  className={`mb-4 p-4 rounded-full ${isSelected 
                    ? (darkMode ? 'bg-amber-400 text-gray-900' : 'bg-purple-600 text-white') 
                    : (darkMode ? 'bg-gray-800 text-amber-300' : 'bg-gray-200 text-purple-700')
                  } transition-colors duration-300`}
                >
                  {service.icon}
                </div>
                
                <h3 className={`text-lg font-medium text-center ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {service.name}
                </h3>
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
};

export default TechStack;