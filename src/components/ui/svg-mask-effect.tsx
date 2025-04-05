"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeContext";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const { darkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);

  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if mouse is inside container bounds
    const isWithinBounds = 
      x >= 0 && x <= rect.width && 
      y >= 0 && y <= rect.height;
    
    setIsInside(isWithinBounds);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    setIsHovered(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", updateMousePosition);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", updateMousePosition);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  
  let maskSize = isHovered ? revealSize : size;

  // Theme-specific colors
  const containerBgColor = darkMode ? "var(--black)" : "var(--white)";
  const maskBgColor = darkMode ? "var(--white)" : "var(--black)";
  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const revealTextColor = darkMode ? "text-red-900" : "text-blue-600";

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-screen", className)}
      animate={{
        backgroundColor: isHovered ? (darkMode ? "var(--slate-950)" : "var(--slate-100)") : containerBgColor,
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <AnimatePresence mode="wait">
        {isInside && (
          <motion.div
            className={cn(
              "absolute flex h-full w-full items-center justify-center [mask-image:url(/mask.svg)] [mask-repeat:no-repeat]",
              darkMode ? "bg-white" : "bg-black"
            )}
            initial={{ 
              maskSize: "0px",
              opacity: 0 
            }}
            animate={{ 
              maskSize: `${maskSize}px`,
              opacity: 1,
              maskPosition: `${mousePosition.x - maskSize / 2}px ${
                mousePosition.y - maskSize / 2
              }px`,
            }}
            exit={{ 
              maskSize: "0px",
              opacity: 0 
            }}
            transition={{
              maskSize: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 },
              maskPosition: { duration: 0.15, ease: "linear" },
            }}
            style={{
              maskPosition: `${mousePosition.x - maskSize / 2}px ${
                mousePosition.y - maskSize / 2
              }px`,
            }}
          >
            <motion.div
              animate={{
                maskPosition: `${mousePosition.x - maskSize / 2}px ${
                  mousePosition.y - maskSize / 2
                }px`,
                maskSize: `${maskSize}px`,
              }}
              transition={{
                maskSize: { duration: 0.3, ease: "easeInOut" },
                maskPosition: { duration: 0.15, ease: "linear" },
              }}
              className={cn(
                "absolute inset-0 z-0 h-full w-full opacity-50",
                darkMode ? "bg-white" : "bg-black"
              )}
            />
            <div
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              className={cn(
                "relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold",
                darkMode ? "text-black" : "text-white"
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn(
        "flex h-full w-full items-center justify-center", 
        darkMode ? "text-white" : "text-slate-800"
      )}>
        {revealText}
      </div>
    </motion.div>
  );
};