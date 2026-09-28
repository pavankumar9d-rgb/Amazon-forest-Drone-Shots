"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MILESTONES, Milestone } from "@/data/milestones";

interface NavbarProps {
  currentMilestone: Milestone;
  progress: number;
  onNavigateToMilestone: (milestone: Milestone) => void;
  onOpenDossier: () => void;
}

export default function Navbar({
  currentMilestone,
  progress,
  onNavigateToMilestone,
  onOpenDossier,
}: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Auto-hide on downward scroll, reveal on upward scroll
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Bring navbar back if cursor hovers near top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 64) {
        setIsVisible(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const progressPercent = Math.round(progress * 100);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 select-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-5 py-2.5 backdrop-blur-md bg-[#0A0F0A]/70 border border-[#F7F4EC]/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Left: Brand Identity & Subtitle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateToMilestone(MILESTONES[0])}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
              data-magnetic
            >
              {/* National Geographic yellow frame homage / subtle leaf emblem */}
              <div className="w-5 h-7 border-[2px] border-[#F7F4EC]/80 group-hover:border-[#4FD1B8] transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
                <div className="w-1 h-3 bg-[#B23A2E] opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <span className="block font-editorial text-sm tracking-[0.2em] font-semibold text-[#F7F4EC]">
                  AMAZONIA
                </span>
                <span className="block font-mono text-[9px] tracking-widest text-[#F7F4EC]/50 uppercase">
                  Aerial Survey · 80s
                </span>
              </div>
            </button>

            {/* Subtle etched leaf/feather line motif */}
            <div className="hidden lg:flex items-center opacity-40 pl-3 border-l border-[#F7F4EC]/10">
              <svg width="60" height="16" viewBox="0 0 60 16" fill="none">
                <path
                  d="M2 8 C 15 2, 25 14, 40 8 C 50 4, 55 12, 58 8"
                  stroke="#F7F4EC"
                  strokeWidth="0.75"
                  strokeDasharray="2 3"
                />
              </svg>
            </div>
          </div>

          {/* Center: Live Flight Telemetry */}
          <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-[#F7F4EC]/75">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1B8] animate-pulse" />
              <span className="text-[#F7F4EC]/40 uppercase tracking-wider">Coords</span>
              <span className="text-[#F7F4EC]/90">{currentMilestone.coordinates}</span>
            </div>

            <div className="h-3 w-[1px] bg-[#F7F4EC]/15" />

            <div className="flex items-center gap-2">
              <span className="text-[#F7F4EC]/40 uppercase tracking-wider">Alt</span>
              <span className="text-[#F7F4EC]/90">{currentMilestone.altitude.split("·")[0]}</span>
            </div>

            <div className="h-3 w-[1px] bg-[#F7F4EC]/15" />

            <div className="flex items-center gap-2">
              <span className="text-[#F7F4EC]/40 uppercase tracking-wider">Sector</span>
              <span className="text-[#4FD1B8] font-medium">
                {currentMilestone.id}/8 · {currentMilestone.name}
              </span>
            </div>
          </div>

          {/* Right: Waypoints Toggle & Dossier CTA */}
          <div className="flex items-center gap-3">
            {/* Milestone selector button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F7F4EC]/15 hover:border-[#4FD1B8]/60 bg-[#0A0F0A]/40 hover:bg-[#3C4A3A]/40 transition-all font-mono text-[11px] text-[#F7F4EC]/80"
              data-magnetic
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>WAYPOINTS</span>
              <span className="text-[10px] text-[#4FD1B8] font-bold">{progressPercent}%</span>
            </button>

            {/* Expedition CTA */}
            <button
              onClick={onOpenDossier}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F4EC] hover:bg-[#4FD1B8] text-[#0A0F0A] font-mono text-[11px] font-semibold tracking-wider transition-all duration-300 shadow-[0_0_16px_rgba(247,244,236,0.15)] hover:shadow-[0_0_24px_rgba(79,209,184,0.4)]"
              data-magnetic
            >
              <span>EXPEDITION DOSSIER</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Waypoint Drawer / Flyout Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 sm:top-20 right-2 sm:right-8 z-50 w-[calc(100vw-1rem)] sm:w-96 max-w-sm glass-panel rounded-2xl p-4 sm:p-5 bg-[#0A0F0A]/95 border border-[#F7F4EC]/15 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F7F4EC]/10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F7F4EC]/50">
                Flight Trajectory Waypoints
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[#F7F4EC]/50 hover:text-[#F7F4EC] text-xs font-mono"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-1.5 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-1">
              {MILESTONES.map((m) => {
                const isActive = currentMilestone.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      onNavigateToMilestone(m);
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-lg text-left transition-all group ${
                      isActive
                        ? "bg-[#3C4A3A]/60 border border-[#4FD1B8]/40"
                        : "hover:bg-[#F7F4EC]/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span
                        className={`font-mono text-[10px] w-5 h-5 rounded-full flex items-center justify-center border ${
                          isActive
                            ? "bg-[#4FD1B8] text-[#0A0F0A] border-[#4FD1B8] font-bold"
                            : "border-[#F7F4EC]/20 text-[#F7F4EC]/50 group-hover:border-[#F7F4EC]/50"
                        }`}
                      >
                        {m.id}
                      </span>
                      <div>
                        <div className="font-editorial text-xs tracking-wide text-[#F7F4EC]">
                          {m.name}
                        </div>
                        <div className="font-mono text-[9px] text-[#F7F4EC]/40">
                          {m.timeStart}s – {m.timeEnd}s · {Math.round(m.progressStart * 100)}%
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#F7F4EC]/40 group-hover:text-[#4FD1B8]">
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Expedition Dossier Link */}
            <div className="pt-3 mt-3 border-t border-[#F7F4EC]/10 block sm:hidden">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenDossier();
                }}
                className="w-full py-2.5 rounded-xl bg-[#F7F4EC] text-[#0A0F0A] font-mono text-[11px] font-bold tracking-wider uppercase text-center"
              >
                OPEN EXPEDITION DOSSIER
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
