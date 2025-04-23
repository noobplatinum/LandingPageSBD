"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  darkMode?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  darkMode = false,
  ...props
}: AuroraBackgroundProps) => {
  // Define light and dark color schemes
  const lightColors = {
    bg: "bg-zinc-50",
    text: "text-slate-950",
    aurora: "repeating-linear-gradient(100deg,#3b82f6 10%,#a5b4fc 15%,#93c5fd 20%,#ddd6fe 25%,#60a5fa 30%)",
    gradient: "repeating-linear-gradient(100deg,#fff 0%,#fff 7%,transparent 10%,transparent 12%,#fff 16%)"
  };
  
  const darkColors = {
    bg: "bg-zinc-900",
    text: "text-slate-50",
    aurora: "repeating-linear-gradient(100deg,#1d4ed8 10%,#4338ca 15%,#1e40af 20%,#312e81 25%,#1e3a8a 30%)",
    gradient: "repeating-linear-gradient(100deg,#000 0%,#000 7%,transparent 10%,transparent 12%,#000 16%)"
  };
  
  const colors = darkMode ? darkColors : lightColors;

  return (
    <main className="w-full">
      <div
        className={cn(
          "relative flex min-h-screen w-full flex-col transition-colors duration-700",
          colors.bg,
          colors.text,
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden transition-all duration-1000"
          style={
            {
              "--aurora": colors.aurora,
              "--gradient": colors.gradient,
              "--blue-300": darkMode ? "#1e40af" : "#93c5fd",
              "--blue-400": darkMode ? "#1e3a8a" : "#60a5fa",
              "--blue-500": darkMode ? "#1d4ed8" : "#3b82f6",
              "--indigo-300": darkMode ? "#4338ca" : "#a5b4fc",
              "--violet-200": darkMode ? "#312e81" : "#ddd6fe",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
              "transition": "background 1000ms ease-in-out, opacity 800ms ease",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] 
              [background-image:var(--gradient),var(--aurora)] 
              [background-size:300%,_200%] [background-position:50%_50%,50%_50%] 
              opacity-50 blur-[10px] filter will-change-transform 
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] 
              after:absolute after:inset-0 after:[background-image:var(--gradient),var(--aurora)] 
              after:[background-size:200%,_100%] after:[background-attachment:fixed] 
              after:mix-blend-difference after:content-[""] transition-all duration-1000`,
              darkMode ? "invert-0" : "invert",
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
            style={{
              transition: "all 1000ms cubic-bezier(0.4, 0, 0.2, 1), background-image 1200ms ease-in-out",
            }}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};