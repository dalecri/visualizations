# Visualizations

Eleven visual generators and scenes in one repo, each in its own folder exactly as published:

`heycristobal.com/visualizations/<folder>/`

| Project | Open | About |
|---|---|---|
| Isocube Generator | [isometric-cube-wallpaper-generator/](isometric-cube-wallpaper-generator/) | Generative isometric cube wallpapers. |
| Pixel Twilight Lantern | [pixel-night-lamp/](pixel-night-lamp/) | A pixel twilight lantern scene. |
| 3D Aesthetic Showcase | [3d-aesthetic-renders/](3d-aesthetic-renders/) | A showcase of 3D aesthetic renders. |

| Polygon Wallpaper Generator | [polygon-wallpaper-generator/](polygon-wallpaper-generator/) | Random low-poly triangle wallpapers, rendered in 4K. |

| ASCII Wallpaper Generator | [ASCII-Wallpaper/](ASCII-Wallpaper/) | Seeded procedural ASCII landscape wallpapers with PNG export. |


| Soft Gradient Studio | [soft-gradient-generator/](soft-gradient-generator/) | Drag colour points, blend layers, export soft gradients as PNG. |
| GLYPHFIELD | [glyphfield/](glyphfield/) | Seeded DOS-tile generative art: six seeded weavers (Kaleidoscope Garden, Circuit Ruins, Horizon, The Deep, Tapestry, Life Bloom), seven palettes, a ~90 ms DOS tick, PNG export at 4x and copy-as-text. |
| Pixel Monster Creator | [pixel-monster-creator/](pixel-monster-creator/) | Generate cute, soft pixel monsters in the browser. |
| Typographic Weather Loom | [typographic-weather-loom/](typographic-weather-loom/) | Weather rendered as woven typography. |
| Gameboy About Me | [Gameboy-about-me/](Gameboy-about-me/) | An about-me page living inside a Game Boy. |
| Iso Line Towers | [iso-line-towers/](iso-line-towers/) | Seeded isometric line-art towers; export the linework for hand-colouring, or flat-fill from built-in palettes. |

## Adding a project

1. Create a folder named for the project and put the project in it (entry point as `index.html`, plus any files it references).
2. Add a card for it in the root `index.html` gallery.
3. Add a row to the table above.

## History

Consolidated 2026-10-28 from the single-project repos isometric-cube-wallpaper-generator, pixel-night-lamp, and 3d-aesthetic-renders (all files moved byte-for-byte), with polygon-wallpaper-generator, ASCII-Wallpaper, isocity-todo-app, and soft-gradient-generator added the same day.

## Original build prompt: ASCII Wallpaper Generator

Build "ASCII Wallpaper Generator": a single self-contained HTML file (all CSS and JavaScript inline, no external assets except an optional Google Font) that generates beautiful random ASCII-art wallpapers and exports them as PNGs at real wallpaper resolutions. It must work when opened by double-clicking the file, with no server and no build step.

THE SCENES: five seeded procedural landscapes, each built from layered depth bands (distant layers use sparse, light characters; near layers use dense, bold ones) with a sun or moon stamped into the sky.
- Peaks: layered mountain ranges under a star field, snowcaps on the highest ridge.
- Tides: rolling ocean waves with foam crests, a low sun or moon and its reflection path on the water.
- Aurora: dark mountain or treeline silhouette under flowing aurora curtains and stars.
- Dunes: smooth desert dune curves with wind-ripple texture and a big low sun.
- Forest: rows of pine silhouettes fading into fog, fireflies or stars above.
Choose the scene per wallpaper or let the user pick.

THE RENDERER: draw a monospace character grid onto a full-window canvas. Each material has its own character ramp: rock " .:-=+*#%@", water " ~-≈=>*#", sand " .·:;+*", foliage " .:;+*%#", sky mostly empty with "." "+" "*" stars. Colors come from the active palette with per-layer shading (far layers lighter and hazier, near layers darker and richer) plus a soft vignette at the edges. Cell size adapts so the whole composition always fits the canvas.

RANDOMNESS AND SEEDS: every wallpaper is generated from a numeric seed using a small deterministic PRNG (for example mulberry32). The same seed plus scene plus palette must reproduce the exact same image. Show the current seed, let the user type one in to recreate a wallpaper, and give a dice button and the spacebar for a fresh random one. "Surprise me" randomizes scene, palette, and seed together.

PALETTES: at least six curated sets, each defining sky gradient, layer colors, and accent: Plum Dusk (deep purples, lavender, amber sun), Dawn (peach, rose, soft gold), Deep Sea (navy, teal, pale foam), Forest Fog (sage, mist grey, deep green), Ember (charcoal, rust, ember orange), Mono Ink (greys on near-black). Color must carry the mood; no rainbow noise.

EXPORT: resolution presets Desktop 1920x1080, Phone 1080x1920, and Square 1080x1080. Download renders the current scene offscreen at exactly the preset pixel size (regardless of the preview window size) and saves it via canvas.toBlob as "ascii-wallpaper-<seed>.png". Everything is procedural, so the canvas is never tainted and export always works.

CONTROLS, kept minimal and labeled with single words: scene selector (Peaks, Tides, Aurora, Dunes, Forest, Random), palette selector, seed field with dice button, density slider (character size), resolution selector, and a Download button. No taglines, no helper text, no instructions paragraph; the layout explains itself.

UI STYLE: dark plum page (#171221 background, #241B31 panels, #3A3247 borders), Space Mono for UI text, near-white text #EDE7F2 with muted lavender #9B8FA8, amber #E8873A accent for the primary button. Rounded corners (12-16px), small and tidy control bar along the bottom or side that never covers the wallpaper's focal area. The preview is the hero; chrome stays quiet.

ROBUSTNESS: redraw cleanly on window resize without distortion, re-render instantly on any control change, keep generation fast (well under a second at export size), and make sliders and buttons update the image live. Verify before finishing: each scene renders, a typed seed reproduces its image exactly, downloads arrive at the exact preset dimensions, and the page works from file:// with no console errors.

Deliverable: one complete index.html, ready to save and open.

## Original build prompt: Chromostereopsis Generator

Build CHROMODEPTH, a chromostereopsis pixel-art scene generator, as ONE self-contained HTML file (vanilla JS + canvas, no libraries, no image files). Reference and inspiration: MEK.txt's Chromostereopsis Explorations (mektxt.com) — pixel art that exploits chromostereopsis, the eye quirk where saturated red appears to float in front of saturated blue (the effect flips for many viewers on light grounds). The piece generates seeded pixel scenes built only from a red family and a blue family on a dark or cream ground, so the picture physically vibrates with depth. Overlaps blend to violet, which reads as the middle distance.

THE OPTICS (build around how the effect actually works)
- Three depth families, strictly enforced: FAR = blues (deep blue-violet shadows up to sky blue), MID = violets and magentas (where red and blue overlap or are dithered together), NEAR = reds (deep red up to one hot orange highlight). A scene element belongs to exactly one family; its colour never crosses over. That discipline IS the effect — random rainbow pixel art will not float.
- Grounds: Night (near-black blue) makes red advance strongly; Paper (warm cream) softens and can reverse the effect. Both are first-class; a Ground toggle switches.
- A Direction toggle (Red forward / Blue forward) swaps the families' roles, because the effect's direction varies by viewer.
- An Intensity slider controls saturation and the size of an optional enhancement: a sub-pixel channel drift (the red layer offsets up to 2px against the blue layer with the pointer, easing back when idle). Label it honestly in a code comment: the pure effect is in the eye; the drift is a stage trick on top. Default drift ON at a low value.

THE SCENES (seeded generator, mulberry32 from a seed string)
- A low-res pixel canvas, 240x135 chunky pixels, scaled up with image-rendering: pixelated. Scenes compose in three bands matched to the families: FAR band — sky, stars, a distant ridge, a big low sun or moon disc; MID band — hills, a tree line, water with horizontal glints; NEAR band — foreground silhouettes: big flowers, grasses, a fence, a house corner, a cat on a post (one near silhouette is oversized and cropped by the frame edge — forced perspective is the depth cue).
- Four moods (selectable + dice): Ridge (mountains and sun), Coast (headland, water, a lighthouse dot), Meadow (flowers and a fence), Rooftop (chimneys, antennae, the cat). All randomness flows from the one seed: same seed + mood + ground + direction reproduces the identical scene.
- Pixel craft: shapes drawn as filled rects and small pixel maps on the low-res grid; dithering (checker mixes of two family colours) for gradients in sky and water; no anti-aliasing anywhere; stars are single pixels with a few 2px sparkles.

ANIMATION (the vibration, kept tasteful)
- A slow drift: when enabled, the NEAR layer breathes ±1px against the FAR layer on an 8-second sine; star pixels twinkle by swapping one shade step; water glints crawl one pixel every ~400ms.
- Pointer parallax: layers shift by depth (near moves most, up to 4px), lerped. Touch drag does the same.
- prefers-reduced-motion: no drift, no parallax, no twinkle. Static poster, full effect intact (the optics don't need the motion).
- Pause when the tab is hidden. Eye care: nothing flashes faster than the water crawl, Intensity 0 removes the drift entirely, and the footer carries one functional line: "Rest your eyes — depth is doing the work."

THE TOOL CHROME
- Minimal bar in Space Mono (Google Font) on a #14101C page: title CHROMODEPTH; Mood select + dice; Seed field + dice; Ground (Night/Paper); Direction (Red forward/Blue forward); Intensity slider; Drift toggle; Save PNG (exports at 4x with pixelated scaling, current frame); Fullscreen. No tagline, no instructions.
- The canvas is the hero: centred, thin frame, max width about 1100px, 16:9.

ACCEPTANCE CHECKS (run before calling it done)
1. On Night with Red forward, the NEAR silhouettes are exclusively red-family and read as floating in front of the blue FAR band; switching Direction swaps the families' shapes exactly (same scene, colours exchanged); Paper renders the same scene on cream.
2. Same seed + mood + ground + direction reproduces the identical pixel grid; a new seed changes the composition but keeps the three-band discipline (no red ever appears in the FAR band when Red is forward).
3. Drift on: layers breathe and water crawls; reduced-motion or Drift off: perfectly static. Intensity 0 kills the channel offset but not the scene.
4. Save PNG exports a crisp 4x of exactly what is on screen.
5. At 390px the canvas fits, controls wrap, and the effect still reads on the Meadow mood.

Deliverable: the single HTML file, complete, plus three lines on how the family discipline and the layer drift work so I can add a fifth mood later.
