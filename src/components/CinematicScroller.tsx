"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { MILESTONES, Milestone } from "@/data/milestones";
import Navbar from "@/components/Navbar";
import ProgressRail from "@/components/ProgressRail";
import CustomCursor from "@/components/CustomCursor";
import ExpeditionModal from "@/components/ExpeditionModal";
import ExpeditionSeal from "@/components/ExpeditionSeal";
import Preloader from "@/components/Preloader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 300;
const getFramePath = (index: number) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const num = String(Math.max(1, Math.min(TOTAL_FRAMES, index + 1))).padStart(3, "0");
  return `${base}/frames/frame_${num}.webp`;
};

export default function CinematicScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone>(MILESTONES[0]);
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [compassHeading, setCompassHeading] = useState("284° WNW");
  const [airSpeed, setAirSpeed] = useState(48);

  const currentMilestoneRef = useRef<Milestone>(MILESTONES[0]);
  const lastStateUpdateProgRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderComplete(true);
  }, []);

  // Determine current active milestone from scroll progress
  const getMilestoneForProgress = useCallback((prog: number): Milestone => {
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
      if (prog >= MILESTONES[i].progressStart) {
        return MILESTONES[i];
      }
    }
    return MILESTONES[0];
  }, []);

  // Update dynamic CSS ambient variables for frame lighting
  const updateAmbientLighting = useCallback((prog: number, milestone: Milestone) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    let warmth = 0;
    if (prog >= 0.72 && prog <= 0.88) {
      warmth = Math.sin(((prog - 0.72) / 0.16) * Math.PI);
    }

    let teal = 0;
    if (prog > 0.86) {
      teal = Math.min(1, (prog - 0.86) / 0.12);
    }

    root.style.setProperty("--ambient-warmth", warmth.toFixed(3));
    root.style.setProperty("--ambient-teal", teal.toFixed(3));
    root.style.setProperty("--scene-accent", milestone.ambient.accent);
    root.style.setProperty(
      "--dynamic-glow",
      teal > 0.5
        ? "rgba(79, 209, 184, 0.45)"
        : warmth > 0.5
        ? "rgba(247, 190, 80, 0.4)"
        : milestone.ambient.glow
    );
    root.style.setProperty(
      "--dynamic-border",
      teal > 0.5
        ? "rgba(79, 209, 184, 0.25)"
        : warmth > 0.5
        ? "rgba(247, 190, 80, 0.22)"
        : "rgba(247, 244, 236, 0.12)"
    );
  }, []);

  // High-performance Canvas draw with smart nearest-frame fallback
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find requested or nearest available loaded frame
    let img = imagesRef.current[frameIdx];
    if (!img?.complete || !img.naturalWidth) {
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[frameIdx - offset];
        if (prev?.complete && prev.naturalWidth) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIdx + offset];
        if (next?.complete && next.naturalWidth) {
          img = next;
          break;
        }
      }
    }

    if (!img?.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  // Initialize Canvas, Image Sequence Preloader, Lenis Smooth Scroll, and GSAP ScrollTrigger
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. High DPI Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // 2. Progressive Frame Preload
    // Allocate array
    imagesRef.current = new Array(TOTAL_FRAMES);

    // Load first frame immediately for zero-delay visual display
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Priority load: keyframes first (every 5th frame) for rapid responsive scrub
    for (let i = 0; i < TOTAL_FRAMES; i += 5) {
      if (i === 0) continue;
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        if (currentFrameRef.current === i) {
          drawFrame(i);
        }
      };
    }

    // Full load: load all remaining frames
    const loadRemaining = () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (imagesRef.current[i]) continue;
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          imagesRef.current[i] = img;
          if (currentFrameRef.current === i) {
            drawFrame(i);
          }
        };
      }
    };

    if ("requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadRemaining);
    } else {
      setTimeout(loadRemaining, 100);
    }

    // 3. Lenis Butter-Smooth Scrolling Engine
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.3,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } catch {
      // Native fallback
    }

    // 4. GSAP ScrollTrigger Frame Scrubber with Damped Scrub
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35, // Butter-smooth momentum interpolation
      onUpdate(self) {
        const prog = self.progress;

        // Advance canvas frame with instantaneous hardware draw
        const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(prog * (TOTAL_FRAMES - 1)));
        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          drawFrame(targetFrame);
        }

        // Throttle React state updates to avoid React render churn
        const m = getMilestoneForProgress(prog);
        const milestoneChanged = m.id !== currentMilestoneRef.current.id;
        const progDiff = Math.abs(prog - lastStateUpdateProgRef.current);

        if (milestoneChanged || progDiff > 0.003) {
          lastStateUpdateProgRef.current = prog;
          setProgress(prog);

          if (milestoneChanged) {
            currentMilestoneRef.current = m;
            setCurrentMilestone(m);
            updateAmbientLighting(prog, m);
          }

          const headings = [
            "284° WNW",
            "296° WNW",
            "312° NW",
            "042° NE",
            "118° ESE",
            "195° SSW",
            "270° W",
            "340° NNW",
          ];
          const headingIdx = Math.min(headings.length - 1, Math.floor(prog * 8));
          setCompassHeading(headings[headingIdx]);
          setAirSpeed(Math.round(44 + Math.sin(prog * 20) * 8));
        }
      },
    });

    // 5. Keyboard Navigation Shortcuts (Arrow keys, Space, PageUp, PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const step = window.innerHeight * 0.8;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        const targetY = Math.min(totalHeight, window.scrollY + step);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetY, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const targetY = Math.max(0, window.scrollY - step);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetY, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      st.kill();
      if (lenis) lenis.destroy();
    };
  }, [drawFrame, getMilestoneForProgress, updateAmbientLighting]);

  // Navigate directly to milestone with Lenis smooth interpolation
  const navigateToMilestone = useCallback((milestone: Milestone) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = milestone.progressStart * totalHeight;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  const isNightScene = progress >= 0.85;
  const isGoldenHour = progress >= 0.72 && progress < 0.85;

  const currentSeconds = progress * 80;
  const formattedMinutes = Math.floor(currentSeconds / 60);
  const formattedSecs = (currentSeconds % 60).toFixed(1).padStart(4, "0");
  const formattedTime = `0${formattedMinutes}:${formattedSecs} / 01:20.0`;

  return (
    <>
      {/* Editorial Feather Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Trailing Firefly Custom Cursor (Desktop only, hidden on mobile/touch) */}
      <CustomCursor
        isNightScene={isNightScene}
        isGoldenHour={isGoldenHour}
      />

      {/* Floating Glass Navbar */}
      <Navbar
        currentMilestone={currentMilestone}
        progress={progress}
        onNavigateToMilestone={navigateToMilestone}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Right Edge River Current SVG Progress Rail (Tablets & Desktop) */}
      <div className="hidden sm:block">
        <ProgressRail
          progress={progress}
          currentMilestone={currentMilestone}
          onNavigateToMilestone={navigateToMilestone}
        />
      </div>

      {/* Luxury Expedition Seal in Bottom Right (Adaptive for mobile, tablet, desktop) */}
      <ExpeditionSeal
        heading={compassHeading}
        altitude={currentMilestone.altitude}
        isNightScene={isNightScene}
        isGoldenHour={isGoldenHour}
        coordinates={currentMilestone.coordinates}
        milestoneName={currentMilestone.name}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Expedition Dossier Modal */}
      <ExpeditionModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Fullscreen Master Screen - Fixed to dynamic viewport across all device aspect ratios */}
      <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden select-none z-10">
        {/* High-Performance Canvas Scrubber: Instantaneous 60-120fps hardware draw, zero video seek latency */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[0.98] contrast-[1.03]"
        />

        {/* Dynamic Color Grade Vignette Overlay (warms up during sunset, biolum during night) */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700"
          style={{
            background: isNightScene
              ? "radial-gradient(circle at center, rgba(10, 15, 10, 0.15) 20%, rgba(10, 25, 20, 0.6) 70%, rgba(10, 15, 10, 0.92) 100%)"
              : isGoldenHour
              ? "radial-gradient(circle at center, rgba(74, 59, 42, 0.1) 20%, rgba(40, 25, 10, 0.45) 70%, rgba(10, 15, 10, 0.85) 100%)"
              : "radial-gradient(circle at center, rgba(10, 15, 10, 0.05) 30%, rgba(10, 15, 10, 0.4) 75%, rgba(10, 15, 10, 0.85) 100%)",
          }}
        />

        {/* Corner Depth Vignette to guarantee pristine aesthetics in bottom-right corner */}
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-48 sm:h-64 bg-gradient-to-tl from-[#0A0F0A]/90 via-[#0A0F0A]/40 to-transparent pointer-events-none" />

        {/* Film Grain Texture */}
        <div className="absolute inset-0 film-grain pointer-events-none opacity-40 mix-blend-overlay" />

        {/* Bioluminescent Night Fireflies (active only during night scene) */}
        {isNightScene && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4FD1B8] biolum-pulse animate-firefly"
                style={{
                  left: `${(i * 7.3) % 90 + 5}%`,
                  top: `${(i * 13.7) % 80 + 10}%`,
                  animationDelay: `${i * 0.4}s`,
                  filter: "drop-shadow(0 0 8px #4FD1B8)",
                }}
              />
            ))}
          </div>
        )}

        {/* Kinetic Typography Layer: Responsive margins and padding across all screen sizes */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none px-4 sm:px-8 md:px-16 lg:px-20 py-16 sm:py-20 md:py-24">
          {/* Top Telemetry Flight Ribbon */}
          <div className="w-full flex items-center justify-between text-[9px] sm:text-xs font-mono tracking-widest text-[#F7F4EC]/60 border-b border-[#F7F4EC]/10 pb-2 sm:pb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4FD1B8] animate-ping" />
              <span className="uppercase text-[#F7F4EC]/40">FLIGHT RECORDER</span>
              <span className="text-[#F7F4EC] font-semibold">{formattedTime}</span>
            </div>

            <div className="hidden sm:flex items-center gap-4 md:gap-6">
              <div>
                <span className="text-[#F7F4EC]/40">AIRSPEED: </span>
                <span className="text-[#4FD1B8] font-bold">{airSpeed} KT</span>
              </div>
              <div>
                <span className="text-[#F7F4EC]/40">HEADING: </span>
                <span className="text-[#F7F4EC]">{compassHeading}</span>
              </div>
              <div>
                <span className="text-[#F7F4EC]/40">BIOME: </span>
                <span className="text-[#F7F4EC] uppercase">{currentMilestone.biome.split("—")[0]}</span>
              </div>
            </div>
          </div>

          {/* Center: Dynamic Kinetic Milestones Overlay with Framer Motion AnimatePresence */}
          <div className="relative w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center text-center px-2">
            <AnimatePresence>
              <motion.div
                key={currentMilestone.id}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-2.5 sm:space-y-4 max-w-3xl"
              >
                {/* Chapter indicator badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-[#F7F4EC]/15 glass-panel bg-[#0A0F0A]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4FD1B8]" />
                  <span className="font-mono text-[8px] sm:text-[10px] tracking-widest uppercase text-[#F7F4EC]/75">
                    PHASE 0{currentMilestone.id} — {currentMilestone.name}
                  </span>
                </div>

                {/* Headline: Fluid editorial serif typography */}
                <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#F7F4EC] leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-4xl mx-auto">
                  {currentMilestone.title}
                </h2>

                {/* Subtitle */}
                <p className="font-editorial italic text-xs sm:text-base md:text-xl lg:text-2xl text-[#F7F4EC]/85 max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {currentMilestone.subtitle}
                </p>

                {/* Community Section Credit Line (Milestone 5) */}
                {currentMilestone.creditLine && (
                  <div className="pt-1 sm:pt-2">
                    <p className="font-mono text-[10px] sm:text-xs md:text-sm text-[#F7F4EC]/90 border-l-2 border-[#B23A2E] pl-3 sm:pl-4 max-w-xs sm:max-w-xl mx-auto italic">
                      {currentMilestone.creditLine}
                    </p>
                  </div>
                )}

                {/* Milestone Details Tags (Fluid wrapping on small screens) */}
                <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-3 pt-1.5 sm:pt-3 text-[9px] sm:text-[11px] font-mono text-[#F7F4EC]/65 max-w-xs sm:max-w-2xl mx-auto">
                  {currentMilestone.details.map((d, i) => (
                    <div
                      key={i}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0A0F0A]/60 border border-[#F7F4EC]/10 backdrop-blur-sm"
                    >
                      <span className="text-[#F7F4EC]/40 mr-1">{d.label}:</span>
                      <span className="text-[#F7F4EC]">{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Milestone 8 Primary CTA: "BEGIN YOUR EXPEDITION" */}
                {currentMilestone.cta && (
                  <div className="pt-3 sm:pt-6 pointer-events-auto">
                    <button
                      onClick={() => setIsDossierOpen(true)}
                      className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#4FD1B8] hover:bg-[#F7F4EC] text-[#0A0F0A] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_36px_rgba(79,209,184,0.5)] hover:shadow-[0_0_48px_rgba(247,244,236,0.6)] cursor-pointer"
                      data-magnetic
                    >
                      <span>{currentMilestone.cta}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="transform group-hover:translate-x-1 transition-transform"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom HUD: Coordinates & Waypoint Jumper */}
          <div className="w-full flex items-center justify-between gap-2 sm:gap-4 text-[9px] sm:text-xs font-mono text-[#F7F4EC]/60 border-t border-[#F7F4EC]/10 pt-2 sm:pt-3">
            {/* Left Coordinates & Altitude */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[#4FD1B8]">●</span>
                <span className="text-[#F7F4EC] font-semibold tracking-wider">
                  {currentMilestone.coordinates}
                </span>
              </div>
              <div className="text-[#F7F4EC]/40 text-[8px] sm:text-[10px]">
                {currentMilestone.altitude} · {currentMilestone.biome}
              </div>
            </div>

            {/* Center Quick Waypoint Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto overflow-x-auto max-w-[200px] sm:max-w-none py-1">
              {MILESTONES.map((m) => {
                const isActive = currentMilestone.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => navigateToMilestone(m)}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[8px] sm:text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#4FD1B8] text-[#0A0F0A] font-bold shadow-[0_0_12px_rgba(79,209,184,0.4)]"
                        : "bg-[#0A0F0A]/50 text-[#F7F4EC]/50 hover:text-[#F7F4EC] hover:bg-[#F7F4EC]/10 border border-[#F7F4EC]/10"
                    }`}
                    data-magnetic
                  >
                    0{m.id}
                  </button>
                );
              })}
            </div>

            {/* Right HUD Sector Progress (Visible on tablet/desktop) */}
            <div className="hidden md:block text-right space-y-0.5">
              <div className="text-[#F7F4EC]/40 text-[9px] uppercase tracking-wider">Flight Trajectory</div>
              <div className="text-[#F7F4EC] font-mono">
                SECTOR {currentMilestone.id} OF 8
              </div>
              <div className="text-[#4FD1B8] text-[9px]">
                {Math.round(progress * 100)}% COMPLETE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Scroll Track (10,500px for smooth 80-second scrub) */}
      <div
        ref={containerRef}
        className="relative w-full h-[10500px] pointer-events-none"
      />
    </>
  );
}
