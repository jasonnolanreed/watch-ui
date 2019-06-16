import {roundToTwoDecimals} from './number.js';
import {Difference} from './date-time.js';

export class Timing {
	// Returns number in spd, rounded to 2 decimals
	// Example: -1.23
	static rate(startTarget, startMoment, endTarget, endMoment) {
		startTarget = +startTarget;
		startMoment = +startMoment;
		endTarget = +endTarget;
		endMoment = +endMoment;
		const intervalDistanceInDays =
			Difference.days(startTarget, endTarget);
		const diffAtEnd = Difference.seconds(endMoment, endTarget);
		const diffAtStart = Difference.seconds(startMoment, startTarget);
		const intervalDrift = diffAtEnd - diffAtStart;
		return roundToTwoDecimals(intervalDrift / intervalDistanceInDays);
	}
}