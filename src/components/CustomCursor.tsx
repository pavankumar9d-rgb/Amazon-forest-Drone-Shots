"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor({
  isNightScene = false,
  isGoldenHour = false,
}: {
  isNightScene?: boolean;
  isGoldenHour?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trailing spring physics for trailing firefly glow
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const trailConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const faintTrailConfig = { damping: 15, stiffness: 120, mass: 1.2 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  const faintX = useSpring(cursorX, faintTrailConfig);
  const faintY = useSpring(cursorY, faintTrailConfig);

  useEffect(() => {
    // Only enable on pointer fine devices (desktop/trackpad)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track clickable element hovering
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[data-magnetic]") ||
        target?.tagName === "BUTTON" ||
        target?.tagName === "A"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  // Determine glow color based on scene
  const glowColor = isNightScene
    ? "rgba(79, 209, 184, 0.9)"
    : isGoldenHour
    ? "rgba(247, 190, 80, 0.85)"
    : "rgba(247, 244, 236, 0.75)";

  const dotColor = isNightScene
    ? "#4FD1B8"
    : isGoldenHour
    ? "#F7BE50"
    : "#F7F4EC";

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none">
      {/* 3rd Damped Faint Firefly Trail */}
      <motion.div
        className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: faintX,
          y: faintY,
          width: isHovering ? 32 : 14,
          height: isHovering ? 32 : 14,
          backgroundColor: isNightScene ? "#4FD1B8" : "#F7F4EC",
          opacity: 0.12,
          filter: "blur(4px)",
        }}
      />

      {/* 2nd Damped Soft Aura Trail */}
      <motion.div
        className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trailX,
          y: trailY,
          width: isHovering ? 48 : 22,
          height: isHovering ? 48 : 22,
          backgroundColor: glowColor,
          opacity: 0.28,
          filter: "blur(6px)",
        }}
      />

      {/* Primary Firefly Dot with subtle organic breathing scale */}
      <motion.div
        className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovering ? 36 : 10,
          height: isHovering ? 36 : 10,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? [1, 1.15, 1] : [1, 1.25, 0.9, 1],
            opacity: isHovering ? 1 : [0.75, 1, 0.85],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full w-full h-full border border-white/20"
          style={{
            backgroundColor: isHovering ? "transparent" : dotColor,
            borderColor: isHovering ? dotColor : "transparent",
            boxShadow: `0 0 16px ${glowColor}, 0 0 32px ${glowColor}`,
          }}
        />
        {isHovering && (
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        )}
      </motion.div>
    </div>
  );
}
