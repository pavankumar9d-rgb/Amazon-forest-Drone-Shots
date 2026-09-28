"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [statusText, setStatusText] = useState("CALIBRATING DRONE OPTICS...");
  const [isDismissed, setIsDismissed] = useState(false);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      if (current >= 100) {
        current = 100;
        setDisplayProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsDismissed(true);
          onCompleteRef.current();
        }, 200);
      } else {
        setDisplayProgress(current);
      }
    }, 40);

    // Auto dismiss safety after 1.2s max
    const safetyTimer = setTimeout(() => {
      setIsDismissed(true);
      onCompleteRef.current();
    }, 1200);

    // Also dismiss immediately if user scrolls or presses any key
    const handleUserInteraction = () => {
      setIsDismissed(true);
      onCompleteRef.current();
    };

    window.addEventListener("wheel", handleUserInteraction, { once: true, passive: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true, passive: true });

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (displayProgress < 30) {
      setStatusText("CALIBRATING DRONE OPTICS · 03°08'42.1\"S 60°01'38.4\"W");
    } else if (displayProgress < 70) {
      setStatusText("PRELOADING 80-SECOND EXPEDITION STREAM...");
    } else {
      setStatusText("SANCTUARY READY · COMMENCING FLIGHT");
    }
  }, [displayProgress]);

  const handleDismiss = () => {
    setIsDismissed(true);
    onCompleteRef.current();
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0F0A] text-[#F7F4EC] select-none cursor-pointer"
        >
          {/* Ambient subtle vignette */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#0A0F0A]/70 to-[#0A0F0A] pointer-events-none" />

          {/* Macaw feather line drawing */}
          <div className="relative w-36 h-48 sm:w-44 sm:h-56 mb-6 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 160 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_24px_rgba(79,209,184,0.35)]"
            >
              {/* Central Quill Stem */}
              <path
                d="M 80 200 C 78 140, 75 80, 82 20"
                stroke="#F7F4EC"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Feather Vane Lines - Left Side */}
              <path
                d="M 80 180 C 65 170, 45 155, 35 140 
                   M 79 155 C 60 142, 40 125, 28 105 
                   M 78 130 C 58 115, 38 95, 24 75 
                   M 78 105 C 56 90, 42 70, 32 48 
                   M 79 80 C 62 65, 52 48, 48 30 
                   M 80 50 C 70 38, 65 25, 66 18"
                stroke="#4FD1B8"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Feather Vane Lines - Right Side */}
              <path
                d="M 80 180 C 95 170, 115 155, 125 140 
                   M 81 155 C 100 142, 120 125, 132 105 
                   M 82 130 C 102 115, 122 95, 136 75 
                   M 82 105 C 104 90, 118 70, 128 48 
                   M 81 80 C 98 65, 108 48, 112 30 
                   M 80 50 C 90 38, 95 25, 94 18"
                stroke="#B23A2E"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Subtle Feather Outer Contour */}
              <path
                d="M 82 20 C 55 35, 22 75, 25 125 C 28 155, 50 180, 80 200 C 110 180, 132 155, 135 125 C 138 75, 105 35, 82 20 Z"
                stroke="#F7F4EC"
                strokeWidth="0.8"
                strokeDasharray="6 4"
                opacity="0.4"
              />
            </svg>

            {/* Glowing core dot */}
            <div className="absolute w-2.5 h-2.5 rounded-full bg-[#4FD1B8] shadow-[0_0_16px_#4FD1B8] animate-ping" />
          </div>

          {/* Heading */}
          <div className="text-center space-y-2 px-6 max-w-md pointer-events-none">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#F7F4EC]/40 font-mono">
              National Geographic Expedition
            </span>
            <h1 className="text-3xl sm:text-4xl font-editorial tracking-wider text-[#F7F4EC]">
              AMAZONIA
            </h1>
            <p className="text-xs text-[#F7F4EC]/60 font-mono tracking-widest uppercase">
              80-Second Cinematic Aerial Journey
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="w-64 sm:w-72 mt-8 flex flex-col items-center gap-2.5 pointer-events-none">
            <div className="w-full h-[3px] bg-[#F7F4EC]/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#3C4A3A] via-[#4FD1B8] to-[#F7F4EC] transition-all duration-75"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            <div className="w-full flex justify-between items-center text-[11px] font-mono text-[#F7F4EC]/50 tracking-wider">
              <span className="text-[#4FD1B8] font-bold">{displayProgress}%</span>
              <span className="text-[#F7F4EC]/80">{statusText}</span>
            </div>
          </div>

          {/* Direct click to enter button */}
          <div className="mt-8">
            <span className="px-4 py-2 rounded-full border border-[#4FD1B8]/40 bg-[#4FD1B8]/10 text-[#4FD1B8] text-[10px] font-mono tracking-widest uppercase hover:bg-[#4FD1B8] hover:text-[#0A0F0A] transition-all">
              {displayProgress >= 100 ? "ENTER CANOPY →" : "CLICK TO COMMENCE FLIGHT"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
