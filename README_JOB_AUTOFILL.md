Job Autofill — quick link expander

What this is
- A Tampermonkey/Greasemonkey userscript that replaces short typed commands (for example `/li` or `/gh`) with configured links.

Install
1. Install Tampermonkey (Chrome/Edge/Firefox) or a userscript manager.
2. Save the userscript file `userscripts/job-autofill.user.js` into Tampermonkey:
   - Open the Tampermonkey dashboard → Add new script → paste the contents of the file and save.

Default mappings
- `#add_li` → `https://www.linkedin.com/in/jayakeshavachandrakotha/`
- `#add_gh` → `https://github.com/jayakeshav`
- `#add_pf` → `https://example.com/your-portfolio` (placeholder)
- `#add_email` → `mailto:jayakeshav.work@gmail.com`

Usage
- In any input, textarea, or contentEditable field, type a mapping key (for example `#add_li`) and then press Space, Enter, or Tab. The key will be replaced with the corresponding URL plus a trailing space.

Configure mappings
- In the Tampermonkey menu for the script, choose "Configure Job Autofill".
  - Option 1: Edit the full mappings as JSON.
  - Option 2: Add or update a single mapping key → value via prompts.

Developer notes
- Mappings are stored using `GM_setValue` so they persist between pages.
- The script tries to be conservative: it only replaces the last token before the caret when you type a separator.

Next steps (optional)
- Add a small on-page UI instead of prompts for editing mappings.
- Convert into a full Chrome extension if you want tighter integration.

If you want, I can:
- Add a simple on-page settings panel.
- Create a Chrome extension version.
- Add pattern matching (e.g., `/li:company` → company-specific URL template).
