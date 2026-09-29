# Rule: Cinematic Canvas Scroll & Video Scrubbing Architecture

Whenever implementing scroll-driven video or cinematic 3D playback in web applications:

1. **NEVER scrub an HTML5 `<video>` element on scroll**:
   - Setting `video.currentTime` on scroll triggers 100ms–300ms hardware decoder latency, dropping frames and causing severe lag.
   - Always convert video sequences to an optimized **WebP/JPEG image sequence** (200–400 frames at 1080p, ~20–30 MB total).
   - Render onto an HTML5 `<canvas>` via `ctx.drawImage` (0.05ms GPU texture blit, locked 60–120 FPS).

2. **Always use Progressive Preloading with Fallbacks**:
   - Load frame 1 synchronously on mount for instant zero-delay first paint.
   - Load keyframe anchors (every 5th frame) with priority.
   - Preload remainder via `requestIdleCallback`.
   - Implement nearest-neighbor fallback when drawing (`findNearestLoadedFrame`) so scrolling before 100% preloading never drops or flashes a blank screen.

3. **Pair Lenis Smooth Scroll with GSAP ScrollTrigger**:
   - Lenis handles mouse wheel / touch inertia curves.
   - GSAP ScrollTrigger with `scrub: 0.35` provides momentum damping to the frame index.

4. **Git & Build Hygiene**:
   - Never commit raw master video files (>100MB) to Git. Always add them to `.gitignore`.
   - If cloning reference repositories or scratch scripts into the workspace, always add `"scratch"` to `tsconfig.json` `"exclude"` to prevent Turbopack typecheck failures.

5. **Headless Screen Recording**:
   - For promotional screen recordings without mouse cursor or IDE banners, use `hyperframes render` with an HTML composition registering `window.__timelines`. It guarantees deterministic 1080p 30/60fps video with zero dropped frames.
