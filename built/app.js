import { environment } from './utilities/network.js';
import './router.js';
import './components/icon/icon.js';
// Convert all "global" styles into a constructed
// style sheet to adopt into custom components
// to avoid style flashing as they render
const globalSheets = [];
for (const sheet of document.styleSheets) {
    if (sheet.title === `gwbwglobal`) {
        globalSheets.push(sheet);
    }
}
const constructedSheet = new CSSStyleSheet();
globalSheets.forEach(sheet => {
    Array.from(sheet.cssRules).forEach(rule => {
        constructedSheet.insertRule(rule.cssText);
    });
});
export const globalStyleSheet = constructedSheet;
try {
    if (environment === `production`) {
        const $script = document.createElement(`script`);
        $script.src = `https://js.sentry-cdn.com/4ec231e6bf774e5bbc2546a1d11f5578.min.js`;
        $script.setAttribute(`crossorigin`, `anonymous`);
        document.body.appendChild($script);
    }
}
catch (error) {
    console.warn("Error initializing 3rd party services", error);
}
