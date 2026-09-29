# Rule: Cinematic Canvas Scroll, Installed Skills & High-Craft UI/UX Design System

## 1. Installed Skills Catalog & Zero-Reinstallation Mandate
- **Reference Catalog**: `C:\Users\saipa\OneDrive\Desktop\skills\INSTALLED_SKILLS.md`
- **Zero-Reinstallation Mandate**: ALL skills listed in `INSTALLED_SKILLS.md` are **ALREADY FULLY INSTALLED** on the system across:
  - Antigravity: `C:\Users\saipa\.gemini\config\skills\`
  - Cursor Composer: `C:\Users\saipa\.cursor\skills\`
  - Claude: `C:\Users\saipa\.claude\skills\`
- **DO NOT attempt to reinstall, re-download, or clone them again.**
- Key pre-installed suites include:
  - **React Bits**: 39 animations, 57 background components, 45 layout components, 34 micro-interactions, 32 text animations.
  - **ThreeUI Local Knowledge**: Complete 3D component and shader suite.
  - **UI/UX Pro Max**: 79 design styles, 192 product color palettes, font pairings, UX guidelines.
  - **Impeccable**: High-craft design director standards, typography, visual craft floor.
  - **Vercel Labs & CLI**: Composition patterns, performance optimization, deploy-to-vercel.
  - **Superpowers & Ponytail**: Lazy senior dev mode, TDD, systematic debugging, code review.
  - **HyperFrames, Recordly, Brag**: Deterministic video rendering and developer presentation tools.
  - **Claude-Mem**: Cross-session persistent memory, knowledge indexing, AST search.
- When invoking any skill, directly read its `SKILL.md` using `view_file`.

---

## 2. Butter-Smooth 60–120 FPS Canvas Scroll & Scrubbing Architecture
Whenever implementing scroll-driven video or cinematic 3D playback in web applications:

1. **NEVER scrub an HTML5 `<video>` element on scroll**:
   - Setting `video.currentTime` on scroll triggers 100ms–300ms hardware decoder latency, dropping frames and causing severe lag.
   - Always convert video sequences to an optimized **WebP/JPEG image sequence** (200–400 frames at 1080p, ~20–30 MB total).
   - Render onto an HTML5 `<canvas>` via `ctx.drawImage` (0.05ms GPU texture blit, locking 60–120 FPS).

2. **Always Use Progressive Preloading with Fallbacks**:
   - Load frame 1 synchronously on mount for instant zero-delay first paint.
   - Load keyframe anchors (every 5th frame) with priority.
   - Preload remainder via `requestIdleCallback` or chunked batches.
   - Implement nearest-neighbor fallback when drawing (`findNearestLoadedFrame`) so scrolling before 100% preloading never drops or flashes a blank screen.

3. **Pair Lenis Smooth Scroll with GSAP ScrollTrigger**:
   - Lenis handles mouse wheel / touch inertia curves.
   - GSAP ScrollTrigger with `scrub: 0.35` provides momentum damping to the frame index.

4. **Git & Build Hygiene**:
   - Never commit raw master video files (>100MB) to Git. Always add them to `.gitignore`.
   - If cloning reference repositories or scratch scripts into the workspace, always add `"scratch"` to `tsconfig.json` `"exclude"` to prevent Turbopack typecheck failures.

5. **Headless Screen Recording**:
   - For promotional screen recordings without mouse cursor or IDE banners, use `hyperframes render` with an HTML composition registering `window.__timelines`. It guarantees deterministic 1080p 30/60fps video with zero dropped frames.

---

## 3. High-Craft Editorial UI/UX Design System
Incorporate these design tokens and aesthetic standards for all immersive and interactive web experiences:

1. **Typography**:
   - **Display / Editorial**: High-contrast, elegant serif typography (e.g. `Fraunces`, `Cormorant Garamond`, `Playfair Display`) with refined letter-spacing for titles and sector headings.
   - **Telemetry & Science**: Precision monospace (e.g. `JetBrains Mono`, `Fira Code`) for coordinates, timestamps, altitude, sensor readings, and camera metadata.
   - **Body & Controls**: Sleek modern sans-serif (e.g. `Outfit`, `Inter`) for fluid legibility.

2. **Color Palette & Atmosphere**:
   - **Obsidian Dark Foundation**: Deep organic black/charcoal backgrounds (`#050806`, `#020403`) preventing harsh contrast.
   - **Luminous Bio-Accents**: Vibrant emerald (`#10b981`), forest mint (`#34d399`), and bioluminescent cyans.
   - **Cartographic Gold / Bronze**: Warm amber and gold (`#d97706`, `#f59e0b`) for HUD telemetry, navigation waypoints, and coordinates.
   - **Glassmorphism & Depth**: Frosted backdrop filters (`backdrop-blur-md`, `rgba(10, 20, 15, 0.6)`) with subtle hairline borders (`rgba(255, 255, 255, 0.08)`).
   - **Ambient Lighting**: Sector-driven dynamic radial gradients shifting warmth and exposure as the user scrolls.

3. **Interactive HUD & Telemetry**:
   - Floating coordinates, compass bearing, altitude meters, and sensor status indicators.
   - Subtle pulse animations and radar scan rings for live field-feed sensation.
   - Tactile interactive sound/mute toggles, sector scrub bars, and smooth anchor jumps.

4. **Zero-Fluff & Quality Ceiling**:
   - Avoid generic flat templates or MVP placeholders. Deliver production-grade, immersive craftsmanship every time.
