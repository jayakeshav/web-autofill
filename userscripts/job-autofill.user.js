// ==UserScript==
// @name         Job Autofill — quick link expander
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Type short commands (e.g. /li, /gh) and they'll be replaced with your links in inputs, textareas and contentEditable fields.
// @author       You
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const DEFAULT_MAPPINGS = {
        '#add_li': 'https://www.linkedin.com/in/jayakeshavachandrakotha/',
        '#add_gh': 'https://github.com/jayakeshav',
        '#add_pf': 'https://example.com/your-portfolio',
        '#add_email': 'mailto:jayakeshav.work@gmail.com'
    };

    let mappings = GM_getValue('mappings') || DEFAULT_MAPPINGS;

    function saveMappings() { GM_setValue('mappings', mappings); }

    GM_registerMenuCommand('Configure Job Autofill', configureMappings);

    function configureMappings() {
        const action = prompt('Choose: (1) Edit JSON (2) Add/Update single mapping\nEnter 1 or 2', '2');
        if (!action) return;
        if (action.trim() === '1') {
            const current = JSON.stringify(mappings, null, 2);
            const edited = prompt('Edit mappings JSON:', current);
            if (edited === null) return;
            try {
                const parsed = JSON.parse(edited);
                mappings = parsed;
                saveMappings();
                alert('Mappings updated.');
            } catch (err) {
                alert('Invalid JSON: ' + err.message);
            }
            return;
        }

        const key = prompt('Command (e.g. /li):');
        if (!key) return;
        const value = prompt('Value (URL or mailto):', mappings[key] || '');
        if (value === null) return;
        mappings[key] = value;
        saveMappings();
        alert('Saved ' + key + ' → ' + value);
    }

    // Replace last word in a plain input/textarea
    function handlePlainInput(el) {
        try {
            const pos = el.selectionStart;
            const text = el.value;
            // find start of last token (whitespace boundary)
            let start = pos - 1;
            while (start >= 0 && !/\s/.test(text[start])) start--;
            start++;
            const token = text.slice(start, pos);
            if (token && mappings[token]) {
                const replacement = mappings[token] + ' ';
                const before = text.slice(0, start);
                const after = text.slice(pos);
                el.value = before + replacement + after;
                const newPos = before.length + replacement.length;
                el.setSelectionRange(newPos, newPos);
            }
        } catch (err) {
            // silently ignore
        }
    }

    // Replace token in contentEditable element
    function handleContentEditable() {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;
        const range = sel.getRangeAt(0).cloneRange();
        // We only handle simple caret (collapsed selection)
        if (!sel.isCollapsed) return;
        const node = range.startContainer;
        const offset = range.startOffset;
        // Only operate on text nodes (or their parent)
        let textNode = node.nodeType === Node.TEXT_NODE ? node : null;
        if (!textNode) {
            // try to find a text node before the offset
            if (node.childNodes && node.childNodes[offset - 1] && node.childNodes[offset - 1].nodeType === Node.TEXT_NODE) {
                textNode = node.childNodes[offset - 1];
            } else {
                return;
            }
        }

        const text = textNode.textContent;
        let i = offset;
        if (i > text.length) i = text.length;
        let start = i - 1;
        while (start >= 0 && !/\s/.test(text[start])) start--;
        start++;
        const token = text.slice(start, i);
        if (token && mappings[token]) {
            const replacement = mappings[token] + ' ';
            const before = text.slice(0, start);
            const after = text.slice(i);
            const newText = before + replacement + after;
            textNode.textContent = newText;
            // set caret after inserted replacement
            const newPos = before.length + replacement.length;
            sel.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStart(textNode, newPos);
            newRange.collapse(true);
            sel.addRange(newRange);
        }
    }

    // Listen for space/enter/tab that may indicate end of token
    document.addEventListener('keyup', (e) => {
        // only trigger on separators that usually follow a token
        if (![' ', 'Enter', 'Tab'].includes(e.key)) return;
        const active = document.activeElement;
        if (!active) return;
        const tag = active.tagName;
        if (active.isContentEditable) {
            handleContentEditable();
        } else if (tag === 'INPUT' || tag === 'TEXTAREA') {
            handlePlainInput(active);
        }
    }, true);

    // Expose a small helper on window for debugging
    window.JobAutofill = {
        getMappings: () => mappings,
        setMappings: (m) => { mappings = m; saveMappings(); }
    };

})();
