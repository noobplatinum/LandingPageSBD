import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  borderOnly = false,
  borderWidth = "4px",
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  borderOnly?: boolean;
  borderWidth?: string;
}) => {
  const { darkMode } = useTheme();
  const borderWidthValue = parseInt(borderWidth);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    setKey(Date.now());
  }, [darkMode]);
  
  const defaultGlowOpacity = darkMode ? 0.25 : 0.15;
  const hoverGlowOpacity = darkMode ? 0.45 : 0.25;
  const glowSize = darkMode ? '16px' : '12px';
  const glowColors = darkMode 
    ? "rgba(255, 196, 20, 0.6), rgba(251, 191, 36, 0.5), rgba(245, 158, 11, 0.5)" 
    : "rgba(168, 85, 247, 0.5), rgba(139, 92, 246, 0.4), rgba(124, 58, 237, 0.5)";
  
  return (
    <div className={cn("relative group", borderOnly ? "p-0" : "p-[4px]", containerClassName)}>
      <div 
        className={cn("absolute -inset-[8px] rounded-full transition-all duration-500 z-0")}
        style={{
          opacity: defaultGlowOpacity,
          filter: `blur(${glowSize})`,
          background: `radial-gradient(circle, ${glowColors})`,
          transition: 'opacity 0.8s ease, filter 0.8s ease, background-color 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
        }}
      />
      
      <div 
        className={cn("absolute -inset-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0")}
        style={{
          opacity: 0,
          filter: `blur(${parseInt(glowSize) + 4}px)`,
          background: `radial-gradient(circle, ${glowColors})`,
          transition: 'opacity 0.8s ease, filter 0.8s ease'
        }}
      />
      
      {borderOnly ? (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            key={`border-${key}`}
            initial={{ rotate: 0 }}
            animate={animate ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 0.7,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundSize: "100% 100%",
              background: darkMode 
                ? "conic-gradient(from 0deg, #ffc414, #ffb700, #ffa500, #ff9900, #ffc414)"
                : "conic-gradient(from 0deg, #8b5cf6, #7c3aed, #6d28d9, #5b21b6, #8b5cf6)",
              WebkitMask: `radial-gradient(circle, transparent calc(69% -  ${borderWidthValue}px), black calc(69% -  ${borderWidthValue}px))`,
              mask: `radial-gradient(circle, transparent calc(69% -  ${borderWidthValue}px), black calc(69% -  ${borderWidthValue}px))`,
              transition: 'background 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
            className="z-[1]"
          />
          
          <div 
            className="absolute inset-0 rounded-full z-0"
            style={{
              opacity: defaultGlowOpacity,
              filter: `blur(${parseInt(borderWidth) + 2}px)`,
              background: darkMode 
                ? "conic-gradient(from 0deg, #ffc414, #ffb700, #ffa500, #ff9900, #ffc414)"
                : "conic-gradient(from 0deg, #8b5cf6, #7c3aed, #6d28d9, #5b21b6, #8b5cf6)",
              WebkitMask: `radial-gradient(circle, transparent calc(69% -  ${borderWidthValue*2}px), black calc(69% -  ${borderWidthValue*2}px))`,
              mask: `radial-gradient(circle, transparent calc(69% -  ${borderWidthValue*2}px), black calc(69% -  ${borderWidthValue*2}px))`,
              transition: 'opacity 0.5s ease, background 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          />
        </div>
      ) : (
        <>
          <motion.div
            key={`blur-${key}`}
            initial={{ rotate: 0 }}
            animate={animate ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 0.7,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              zIndex: 1,
              opacity: darkMode ? 0.7 : 0.5,
              filter: `blur(${darkMode ? '16px' : '12px'})`,
              transition: "opacity 500ms, filter 800ms, background 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
              background: darkMode 
                ? "conic-gradient(from 0deg, #ffc414, #ffb700, #ffa500, #ff9900, #ffc414)"
                : "conic-gradient(from 0deg, #8b5cf6, #7c3aed, #6d28d9, #5b21b6, #8b5cf6)",
            }}
            className="group-hover:opacity-100"
          />
          <motion.div
            key={`main-${key}`}
            initial={{ rotate: 0 }}
            animate={animate ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 0.7,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              zIndex: 1,
              background: darkMode 
                ? "conic-gradient(from 0deg, #ffc414, #ffb700, #ffa500, #ff9900, #ffc414)"
                : "conic-gradient(from 0deg, #8b5cf6, #7c3aed, #6d28d9, #5b21b6, #8b5cf6)",
              transition: 'background 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          />
        </>
      )}

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};