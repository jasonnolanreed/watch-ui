import {measurementId} from './ga.js';
import {environment} from './utilities/network.js';
import './router.js';
import './components/icon/icon.js';

try {
	gtag(`js`, new Date());
	gtag(`config`, measurementId);
	
	if (window.Sentry) {
		Sentry.init({
			environment,
			dsn: `https://4ec231e6bf774e5bbc2546a1d11f5578@sentry.io/1426110`
		});
	}
} catch(error) {
	console.warn("Error initializing 3rd party services");
}
