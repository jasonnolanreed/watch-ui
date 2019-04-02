import {measurementId} from './ga.js';
import {environment} from './utilities/network.js';
import './router.js';

gtag(`js`, new Date());
gtag(`config`, measurementId);

if (window.Sentry) {
	Sentry.init({
		environment,
		dsn: `https://4ec231e6bf774e5bbc2546a1d11f5578@sentry.io/1426110`
	});
}
