# Soft Gradient Generator

A fullscreen soft-gradient background maker. Every shuffle composes two or three color blobs from a fixed rotation of pleasant hue families over a neutral base (light or dark), then blurs the whole scene soft. When one feels right, Download PNG re-renders the exact same gradient on a canvas at your real viewport resolution and saves it as a wallpaper-ready PNG.

The recipe is the same one behind the Quiet Pixel sign-in card background: radial-gradient blobs composited over a base, softened with a backdrop-filter blur. The preview and the export are painted from the same structured blob data, so what you see is exactly what you download.

No build step, no dependencies. The font is Space Mono from Google Fonts; everything else is vanilla CSS and JS.

## Run it

Open `index.html` in a browser (or serve the folder). Live at https://dalecri.github.io/soft-gradient-generator/

## Controls

- **Shuffle:** new palette (2–3 hues, randomized saturation, lightness, position, and spread)
- **Download PNG:** save the current background at viewport size, up to 2x device pixel ratio

## Files

| File | What it is |
| --- | --- |
| `index.html` | Markup: the scene layer, hint pill, toast, and the floating Shuffle / Download control bar. Loads `css/style.css` and `js/app.js`. |
| `css/style.css` | The scene and its backdrop blur, plus the Quiet Pixel-style floating controls, hint, and toast. |
| `js/app.js` | Palette generation from the hue rotation, the CSS scene rendering, and the canvas re-render behind the PNG export. |
