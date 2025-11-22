# Quick Link Copier — Browser Extension

A lightweight Chrome/Edge extension that lets you quickly copy your most-used links (LinkedIn, GitHub, portfolio, email) from a simple popup.  
Perfect for speeding up job applications, form filling, or sending your info quickly.

## Features

- Clean, minimal popup UI
- One-click copy buttons for your common links
- Optional keyboard shortcut (Alt + A) to open the popup
- Extremely lightweight — no background scripts or content injection
- Clipboard-only permission for maximum safety

## Included Files

- `manifest.json` — Chrome Extension Manifest (MV3)
- `popup.html` — Extension popup UI
- `popup.js` — Clipboard copy logic
- `icon.png` — Extension icon

## Installation (Developer Mode)

1. Open Chrome or Edge and navigate to:  
   `chrome://extensions`
2. Enable **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the extension folder (e.g., `job_autofill_extension/`).

The extension will now appear in your toolbar.

## Usage

1. Click the extension icon to open the popup.
2. Click any button (LinkedIn, GitHub, Portfolio, Email) to copy its link to your clipboard.
3. Paste anywhere.

### Optional: Add a browser shortcut  
You can make the popup appear using a keyboard shortcut:

1. Go to:  
   `chrome://extensions/shortcuts`
2. Find **Quick Link Copier** → “Activate the extension”
3. Set your preferred key, e.g. **Alt + A**

Now pressing **Alt + A** instantly opens the popup.

## Customizing Links

You can edit the link values directly inside `popup.html`:

```html
<button class="btn" data-link="https://your-link-here.com">Label</button>
