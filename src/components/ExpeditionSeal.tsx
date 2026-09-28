"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ExpeditionSealProps {
  heading: string;
  altitude: string;
  isNightScene: boolean;
  isGoldenHour: boolean;
  coordinates?: string;
  milestoneName?: string;
  onOpenDossier?: () => void;
}

export default function ExpeditionSeal({
  heading,
  altitude,
  isNightScene,
  isGoldenHour,
  coordinates = `03°08'42.1"S 60°01'38.4"W`,
  milestoneName = "Sunrise Canopy",
  onOpenDossier,
}: ExpeditionSealProps) {
  // Extract degrees from heading (e.g. "284° WNW" -> 284)
  const degMatch = heading.match(/(\d+)°/);
  const degrees = degMatch ? parseInt(degMatch[1], 10) : 284;

  const accentColor = isNightScene
    ? "#4FD1B8"
    : isGoldenHour
    ? "#F7BE50"
    : "#F7BE50"; // National Geographic Gold

  return (
    <div
      aria-label="Amazonia Expedition Telemetry Seal"
      onClick={onOpenDossier}
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-6 z-30 select-none group cursor-pointer"
    >
      {/* Outer ambient blur glow behind seal */}
      <div
        className="absolute -inset-1 rounded-full sm:rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isNightScene
            ? "radial-gradient(circle, rgba(79,209,184,0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(247,190,80,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Luxury Glass Capsule (Adaptive: Circular token on mobile, horizontal card on tablet/desktop) */}
      <div className="relative flex items-center gap-0 sm:gap-3.5 p-1.5 sm:px-4 sm:py-2.5 rounded-full sm:rounded-2xl glass-panel bg-[#070B07]/95 border border-[#F7F4EC]/15 hover:border-[#F7BE50]/50 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300">
        {/* Authentic High-Res Expedition Medallion */}
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_16px_rgba(0,0,0,0.9)] ring-1 ring-[#F7BE50]/40">
            <Image
              src="/expedition-seal.png"
              alt="Amazon Rainforest Aerial Survey Expedition Seal"
              width={88}
              height={88}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              priority
            />
          </div>

          {/* Real-Time Live Rotating Heading Ring Indicator */}
          <motion.div
            animate={{ rotate: degrees }}
            transition={{ type: "spring", stiffness: 100, damping: 22 }}
            className="absolute -inset-1 pointer-events-none rounded-full border border-dashed border-[#F7BE50]/50"
          />

          {/* Tiny live pulsating indicator for mobile view */}
          <span
            className="sm:hidden absolute top-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0A0F0A]"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Editorial Telemetry Metadata - Hidden on small mobile to keep screen clear, fully visible on tablets & desktops */}
        <div className="hidden sm:block font-mono text-left tracking-wider">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#F7F4EC] uppercase">
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: accentColor }}
            />
            <span className="tracking-widest">AERIAL SURVEY</span>
            <span className="text-[#F7F4EC]/30">|</span>
            <span style={{ color: accentColor }}>LIVE</span>
          </div>

          <div className="text-[10px] text-[#F7F4EC]/90 font-medium tracking-wide mt-0.5">
            {coordinates}
          </div>

          <div className="flex items-center gap-2 text-[8px] text-[#F7F4EC]/60 uppercase tracking-widest mt-0.5">
            <span>{altitude.split("·")[0].trim()}</span>
            <span>·</span>
            <span className="text-[#4FD1B8] font-bold">{heading}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
