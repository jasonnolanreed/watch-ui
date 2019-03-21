import './router.js';
import {Atomic} from './atomic.js';

// Preload this offset for performance
Atomic.getAtomicOffset().catch(_ => null);