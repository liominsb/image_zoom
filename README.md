# Image Zoom

A lightweight Obsidian plugin for image zoom and pan. Designed as a drop-in replacement for the unmaintained Image Toolkit.

## 🔍 Features

- **Click to Zoom** – Click any image in Reading or Live Preview mode to view it full-screen.
- **Scroll to Zoom** – Use the mouse wheel for smooth, stepless zooming centered on the pointer.
- **Drag to Pan** – When zoomed in, hold the left mouse button and drag to move the image.
- **Quick Exit** – Press `Esc` or click the dark backdrop to close instantly.
- **Lightweight** – Vanilla TypeScript, zero dependencies, just a few hundred lines of code.
- **Performance** – Throttled with `requestAnimationFrame` for buttery-smooth interactions.
- **Style Isolation** – All CSS classes use a unique prefix to avoid conflicts with Obsidian’s native styles.

## ⚡ Installation

### Method 1: Manual Installation (Recommended)

1. **Download the plugin files**

   Prepare the following three files:
   - `manifest.json`
   - `main.js` (needs to be built)
   - `styles.css`

2. **Locate the Obsidian plugins folder**

   - Open Obsidian **Settings → Community plugins** and turn off **Safe Mode**.
   - Click the folder icon to open the plugins directory.
   - The typical path is: `<your vault>/.obsidian/plugins/`

3. **Create the plugin folder**

   Inside the `plugins` directory, create a new folder named `image-zoom`.

4. **Copy the files**

   Copy `manifest.json`, `main.js`, and `styles.css` into the `image-zoom` folder.

5. **Enable the plugin**

   - Restart Obsidian.
   - Go to **Settings → Community plugins**.
   - Find **Image Zoom** and enable it.

### Method 2: Development Mode Installation

1. **Clone or download this repository**

   ```bash
   git clone <repository-url>
   cd image-zoom-pan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the plugin**

   ```bash
   npm run build
   ```

4. **Copy to your Obsidian vault**

   Copy the built files to your vault’s plugins folder:
   ```
   <your vault>/.obsidian/plugins/image-zoom-pan/
   ```

5. **Enable the plugin**

   Enable the plugin in Obsidian’s settings.

## 🚀 Development

### Prerequisites

- Node.js >= 16
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Development mode (auto-rebuild)
npm run dev

# Production build
npm run build
```

### Project Structure

```
image-zoom/
├── manifest.json         # Plugin metadata
├── main.ts               # Core logic
├── styles.css            # Stylesheet
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── esbuild.config.mjs    # Build configuration
└── README.md             # This file
```

## 💡 Usage

1. In Reading or Live Preview mode, **click** any image.
2. The image appears centered on a semi-transparent black backdrop.
3. **Scroll to zoom** – Use the mouse wheel to zoom in/out, centered on the cursor.
4. **Drag to pan** – While zoomed in, drag with the left mouse button.
5. **Exit the viewer**:
   - Press the `Esc` key.
   - Click the dark background outside the image.

## 🛠️ Under the Hood

- **Vanilla Implementation** – Uses only TypeScript and DOM APIs. No UI frameworks.
- **Optimized Rendering** – Drag and zoom events are throttled with `requestAnimationFrame`.
- **Scoped Styles** – All CSS classes are prefixed with `my-custom-zoom-` to prevent leaks.
- **Broad Compatibility** – Works with Obsidian v1.5.0 and above.

## ❓ Troubleshooting

If something isn’t working, please verify:

1. Obsidian is version 1.5.0 or later.
2. The plugin is correctly installed and enabled.
3. You are in Reading mode or Live Preview mode (not Source mode).

## 📄 License

MIT License

## 🙏 Acknowledgements

Inspired by Image Toolkit. This plugin offers a modern, maintainable alternative with a focus on simplicity and performance.
