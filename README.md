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
