// import {measurementId} from './ga.js';
import {environment} from './utilities/network.js';
import './router.js';
import './components/icon/icon.js';

declare const Sentry: any;

// Convert all "global" styles into a constructed
// style sheet to adopt into custom components
// to avoid style flashing as they render
const globalSheets: CSSStyleSheet[] = [];
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
	// gtag(`js`, new Date());
	// gtag(`config`, measurementId);
	

	if (Sentry) {
		Sentry.init({
			environment,
			dsn: `https://4ec231e6bf774e5bbc2546a1d11f5578@sentry.io/1426110`
		});
	}
} catch(error) {
	console.warn("Error initializing 3rd party services", error);
}
