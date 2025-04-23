"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";
import { useTheme } from "@/lib/ThemeContext";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  intensity?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.4,
    proximity = 0,
    spread = 35,
    variant = "default",
    glow = false,
    className,
    movementDuration = 1.5,
    borderWidth = 3,
    disabled = true,
    intensity = 1.5,
  }: GlowingEffectProps) => {
    const { darkMode } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    // Keep the existing handleMove function and useEffect from the original component
    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0.15"); // Default low glow instead of 0
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0.15"); // Default low glow instead of 0

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
            Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      // Initial glow
      if (containerRef.current) {
        containerRef.current.style.setProperty("--active", "0.15");
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    // Define colors based on dark mode with new requested color scheme
    // Dark mode: Yellow to orange gradient
    // Light mode: Purple to bright purple gradient
    const primaryColor = darkMode ? "#FFDD00" : "#9C27B0";
    const secondaryColor = darkMode ? "#FF9800" : "#E040FB";
    const primaryColorFade = darkMode ? "#FFDD0030" : "#9C27B030";
    const secondaryColorFade = darkMode ? "#FF980030" : "#E040FB30";

    // Define static box-shadow for natural glow (similar to experience-box)
    const staticBoxShadow = darkMode
      ? "0 0 15px rgba(255, 193, 7, 0.3)"
      : "0 0 15px rgba(148, 105, 190, 0.3)";

    return (
      <>
        {/* Add a static gradient border similar to experiencebox */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-px rounded-[inherit] border opacity-100 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
          style={{
            borderColor: darkMode ? "rgba(255, 193, 7, 0.4)" : "rgba(148, 105, 190, 0.4)",
            boxShadow: staticBoxShadow
          }}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0.15", // Default low glow instead of 0
              "--intensity": intensity,
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "3", // Fewer repeats for bigger color sections
              "--gradient":
                variant === "white"
                  ? `
                    radial-gradient(circle at 50% 50%, ${primaryColor}99, ${primaryColorFade} 70%),
                    radial-gradient(circle at 45% 45%, ${secondaryColor}99, ${secondaryColorFade} 70%),
                    repeating-conic-gradient(
                      from 136.84deg at 50% 50%,
                      ${primaryColor} 0%,
                      ${secondaryColor} calc(25% / var(--repeating-conic-gradient-times)),
                      ${primaryColor} calc(50% / var(--repeating-conic-gradient-times)),
                      ${secondaryColor} calc(75% / var(--repeating-conic-gradient-times)),
                      ${primaryColor} calc(100% / var(--repeating-conic-gradient-times))
                    )
                  `
                  : `
                    radial-gradient(circle at 50% 50%, ${primaryColor}99, ${primaryColorFade} 70%),
                    radial-gradient(circle at 45% 45%, ${secondaryColor}99, ${secondaryColorFade} 70%),
                    repeating-conic-gradient(
                      from 136.84deg at 50% 50%,
                      ${primaryColor} 0%,
                      ${secondaryColor} calc(25% / var(--repeating-conic-gradient-times)),
                      ${primaryColor} calc(50% / var(--repeating-conic-gradient-times)),
                      ${secondaryColor} calc(75% / var(--repeating-conic-gradient-times)),
                      ${primaryColor} calc(100% / var(--repeating-conic-gradient-times))
                    )
                  `,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1.0*var(--glowingeffect-border-width))]', // Reduced inset to make glow closer
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-200", // Faster transition
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[filter:brightness(calc(100%*var(--intensity)))]", // Brightness boost
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2.5deg))]" // Wider mask
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };