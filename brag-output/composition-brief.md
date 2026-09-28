# Hyperframes Composition Brief: AMAZONIA

## Objective
Create a short, museum-grade launch brag video for AMAZONIA celebrating the 80-second continuous scroll-driven aerial flight through the Amazon rainforest.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds (600 frames at 30fps)

## Source Material
- Project root: `c:/Users/saipa/OneDrive/Desktop/amazon/`
- Primary files read: `src/components/CinematicScroller.tsx`, `src/components/ExpeditionSeal.tsx`, `src/components/Navbar.tsx`, `src/data/milestones.ts`, `src/app/globals.css`
- Product name: AMAZONIA
- Tagline: An 80-Second Cinematic Flight Through The Primeval Forest
- Key UI to recreate / feature:
  - Full 1080p aerial drone footage (`public/amazon-80s-master.mp4`)
  - The live Flight Recorder HUD ribbon (`FLIGHT RECORDER 00:00.0 / 01:20.0 · AIRSPEED: 44 KT · HEADING: 284° WNW`)
  - The authentic brass & emerald Expedition Seal medallion (`public/expedition-seal.png`)
  - The River Current SVG progress rail
  - The Waypoint Trajectory Jumper (`01` through `08`)
  - The Expedition Dossier scientific modal
- Copy that must appear verbatim:
  - "AMAZONIA"
  - "AN 80-SECOND CINEMATIC FLIGHT"
  - "CONTROLLED ENTIRELY BY SCROLL"
  - "ZERO FRAME-SEEK LATENCY · ALL-INTRA 1080P"
  - "8 PRIMEVAL BIOMES"
  - "THE PRIMEVAL FOREST AWAITS"
  - "BEGIN YOUR EXPEDITION"

## Creative Direction
- Tone preset: `cinematic`
- Creative direction: "Epic National Geographic nature documentary meets Active Theory digital flight"
- Interpretation: Restrained elegance, monumental natural scale, real-time scientific telemetry, and high-impact cinematic reveals.
- Angle: An interactive flight through the heart of the Amazon, scrubbing through 8 biomes at 60fps with pure scroll control.
- Hook: Sunrise mist breaking over the emerald canopy as telemetry locks on.
- Outro / punchline: Drone pull-back over the starlit river basin, sealed with the official National Geographic Expedition Medallion.
- Avoid:
  - Cheap generic tech/SaaS language
  - Cheesy 3D gadget animations
  - Loud artificial neon colors

## Visual Identity
- Background: `#0A0F0A` (Jungle Black)
- Primary Text: `#F7F4EC` (Parchment Ivory)
- Accent Colors: `#4FD1B8` (Bioluminescent Teal), `#F7BE50` (National Geographic Gold), `#B23A2E` (Macaw Red)
- Display Font: `Fraunces`, Georgia, serif
- Monospace / HUD Font: `Geist Mono`, SF Mono, monospace
- Visual references from the project:
  - Kapok canopy aerial video
  - Pink dolphins river glide
  - Bioluminescent nocturnal fireflies
  - Brass & emerald compass rose medallion

## Storyboard
1. **Scene 1: Canopy Awakening (0.0s – 3.5s)** — Sunrise mist, Macaw feather line drawing, flight recorder HUD illuminates, "AMAZONIA" headline reveals.
2. **Scene 2: Scroll-Driven Flight (3.5s – 8.5s)** — Low-altitude river flight with pink dolphins, mouse scroll indicator scrubbing forward, live airspeed & heading telemetry, River Current SVG rail.
3. **Scene 3: 8 Biomes & The Expedition Seal (8.5s – 14.5s)** — Night transformation, glowing bioluminescent fireflies, waypoint jumper 01–08, luxury rotating brass Expedition Seal medallion in the corner.
4. **Scene 4: The Primeval Call (14.5s – 20.0s)** — Wide pullback over the star-filled river, National Geographic gold frame, "THE PRIMEVAL FOREST AWAITS", glowing "BEGIN YOUR EXPEDITION" CTA button.

## Audio
- Audio role: Cinematic support bed with organic ambient swell and rhythmic drive.
- Music: `assets/music/happy-beats-business-moves-vol-11-by-ende-dot-app.mp3`
- Music treatment: Low atmospheric opening, rhythmic beat through river flight, sparkling nocturnal texture at 8.5s, grand finale resolve.
- SFX guidance: Subtly matched to UI events — camera optic calibration click, soft water ripple, waypoint selector tick.

## Hyperframes Instructions
Build the composition inside `brag-output/composition/` using HTML, CSS, and modern web standards. Ensure pristine layout at 1920x1080, silky-smooth 30fps animation, and zero console errors. Run `hyperframes check` and render to `brag-output/brag.mp4`.
