export class Atomic {
	constructor() {
		this.atomicOffsetPromise = null;
	}

	// Always resolves, with payload as number (positive when device is fast), or null
	static clearAtomicOffset() {
		sessionStorage.removeItem(`atomic-offset`);
	}

	// Always resolves, with payload as number (positive when device is fast), or null
	static getAtomicOffset() {
		if (this.atomicOffsetPromise) {
			return this.atomicOffsetPromise;
		} else {
			this.atomicOffsetPromise = new Promise((resolve, reject) => {
				const ssAtomicOffset = sessionStorage.getItem(`atomic-offset`);
				if (ssAtomicOffset) {
					this.atomicOffsetPromise = null;
					resolve(ssAtomicOffset); return;
				}
				const timeBeforeFetch = Date.now();
				fetch(`https://api.time.is/microtime?app_id=nolanreed_e49f7skC.DDf473vc`)
				.then(response => response.json())
				.then(response => {
					const fetchDuration = Date.now() - timeBeforeFetch;
					// Fetch too slow to trust
					if (fetchDuration > 2500) {
						this.atomicOffsetPromise = null;
						sessionStorage.setItem(`atomic-offset`, 0);
						resolve(0); return;
					}
					// No response
					if (!response) {
						this.atomicOffsetPromise = null;
						sessionStorage.setItem(`atomic-offset`, 0);
						resolve(0); return;
					}
					// Not expected response
					if (typeof response.microtime !== `number`) {
						this.atomicOffsetPromise = null;
						sessionStorage.setItem(`atomic-offset`, 0);
						resolve(0); return;
					}
					const atomicTime = +((`` + response.microtime).split(`.`).join(``).substring(0, 13));
					const adjustedNowTime = moment().subtract((fetchDuration / 2), `milliseconds`);
					// Positive diff means device is fast
					const diff = moment().diff(moment(atomicTime), `seconds`, true);
					const adjustedDiff = adjustedNowTime.diff(moment(atomicTime), `seconds`, true);
					// If difference is too great, be cautious and pretend it's 0
					if (Math.abs(adjustedDiff) > 1500) {
						this.atomicOffsetPromise = null;
						sessionStorage.setItem(`atomic-offset`, 0);
						resolve(0); return;
					}
					this.atomicOffsetPromise = null;
					sessionStorage.setItem(`atomic-offset`, adjustedDiff);
					resolve(adjustedDiff);
				})
				.catch(error => {
					this.atomicOffsetPromise = null;
					sessionStorage.setItem(`atomic-offset`, 0);
					resolve(0); return;
				});
			});

			return this.atomicOffsetPromise;
		}
	}
}

new Atomic();
