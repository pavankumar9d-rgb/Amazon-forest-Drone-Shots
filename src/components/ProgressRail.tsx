"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MILESTONES, Milestone } from "@/data/milestones";

interface ProgressRailProps {
  progress: number;
  currentMilestone: Milestone;
  onNavigateToMilestone: (milestone: Milestone) => void;
}

export default function ProgressRail({
  progress,
  currentMilestone,
  onNavigateToMilestone,
}: ProgressRailProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isNightScene = progress >= 0.875;
  const isGoldenHour = progress >= 0.75 && progress < 0.875;

  return (
    <aside
      aria-label="Expedition flight progress"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center select-none"
    >
      {/* Background track & Amazon River Current SVG */}
      <div className="relative h-72 sm:h-96 w-10 flex items-center justify-center">
        {/* River Current SVG Path */}
        <svg
          viewBox="0 0 30 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
        >
          {/* Base Inactive Riverbed */}
          <path
            d="M 15 10 
               C 22 60, 8 100, 15 150 
               C 24 200, 6 250, 18 300 
               C 22 330, 10 360, 15 370"
            stroke="rgba(247, 244, 236, 0.15)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Active Flowing Water / Firefly Trail */}
          <motion.path
            d="M 15 10 
               C 22 60, 8 100, 15 150 
               C 24 200, 6 250, 18 300 
               C 22 330, 10 360, 15 370"
            stroke={
              isNightScene
                ? "#4FD1B8"
                : isGoldenHour
                ? "#F7BE50"
                : "#F7F4EC"
            }
            strokeWidth={isNightScene ? "2.5" : "1.8"}
            strokeLinecap="round"
            style={{
              pathLength: progress,
              filter: isNightScene
                ? "drop-shadow(0 0 8px #4FD1B8)"
                : isGoldenHour
                ? "drop-shadow(0 0 6px #F7BE50)"
                : "none",
            }}
          />

          {/* Bioluminescent firefly particles drifting along the current in night scene */}
          {isNightScene && (
            <>
              <motion.circle
                cx="15"
                cy={10 + progress * 360}
                r="4"
                fill="#4FD1B8"
                className="biolum-pulse"
              />
              <motion.circle
                cx="12"
                cy={Math.max(10, 10 + progress * 360 - 25)}
                r="2.5"
                fill="#4FD1B8"
                opacity="0.6"
              />
              <motion.circle
                cx="19"
                cy={Math.max(10, 10 + progress * 360 - 50)}
                r="1.8"
                fill="#4FD1B8"
                opacity="0.4"
              />
            </>
          )}
        </svg>

        {/* Milestone Leaf / Waypoint Markers */}
        <div className="absolute inset-y-2 flex flex-col justify-between items-center w-full pointer-events-none">
          {MILESTONES.map((milestone, idx) => {
            const milestoneMid = (milestone.progressStart + milestone.progressEnd) / 2;
            const isPassed = progress >= milestone.progressStart;
            const isCurrent = currentMilestone.id === milestone.id;

            return (
              <div
                key={milestone.id}
                className="relative flex items-center justify-center pointer-events-auto"
                onMouseEnter={() => setHoveredId(milestone.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Clickable node button */}
                <button
                  onClick={() => onNavigateToMilestone(milestone)}
                  aria-label={`Jump to ${milestone.name}`}
                  className="group relative p-1.5 focus:outline-none cursor-pointer"
                  data-magnetic
                >
                  {/* Leaf SVG Marker */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-all duration-300 transform ${
                      isCurrent
                        ? "scale-125 rotate-12"
                        : "scale-90 group-hover:scale-110"
                    }`}
                  >
                    {/* Organic Leaf shape */}
                    <path
                      d="M 12 2 C 7 7, 4 14, 12 22 C 20 14, 17 7, 12 2 Z"
                      fill={
                        isNightScene && isPassed
                          ? "#4FD1B8"
                          : isGoldenHour && isPassed
                          ? "#F7BE50"
                          : isPassed
                          ? "#F7F4EC"
                          : "rgba(10, 15, 10, 0.8)"
                      }
                      stroke={
                        isNightScene
                          ? "#4FD1B8"
                          : isGoldenHour
                          ? "#F7BE50"
                          : "#F7F4EC"
                      }
                      strokeWidth="1.5"
                    />
                    {/* Leaf central vein */}
                    <path
                      d="M 12 5 L 12 18"
                      stroke={
                        isPassed
                          ? "#0A0F0A"
                          : "rgba(247, 244, 236, 0.4)"
                      }
                      strokeWidth="1.2"
                    />
                  </svg>

                  {/* Pulsing ring for active waypoint */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeMilestoneRing"
                      className="absolute inset-0 rounded-full border border-[#4FD1B8]"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </button>

                {/* Hover Tooltip - Pop out to the left */}
                <AnimatePresence>
                  {hoveredId === milestone.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: -8, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg glass-panel bg-[#0A0F0A]/90 border border-[#F7F4EC]/15 whitespace-nowrap z-50 pointer-events-none shadow-xl"
                    >
                      <div className="font-editorial text-xs text-[#F7F4EC] tracking-wide">
                        {milestone.name}
                      </div>
                      <div className="font-mono text-[9px] text-[#4FD1B8] tracking-wider">
                        {milestone.timeStart}s · {Math.round(milestone.progressStart * 100)}%
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress percentage indicator at bottom of rail */}
      <div className="mt-3 font-mono text-[10px] text-[#F7F4EC]/60 tracking-wider">
        {Math.round(progress * 100)}%
      </div>
    </aside>
  );
}
