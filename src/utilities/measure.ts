import {Difference, Format} from './date-time.js';
import {roundToOneDecimal} from './number.js';
import {Measure} from '../api-helpers/measure.js';

export const parseSessionsFromMeasures = (allMeasures: Measure[]): Measure[][] => {
	if (allMeasures && allMeasures.length) { allMeasures[0].firstOfSession = true; }
	let sessions = [];
	let measuresOfSession = [];
	let lastMeasureDate;
	for (const measure of allMeasures) {
		const thisMeasureDate = Format.date(measure.targetMoment);
		measure.firstOfDay = thisMeasureDate !== lastMeasureDate;
		if (!measure.firstOfSession) {
			measuresOfSession.push(measure);
		} else {
			if (measuresOfSession.length) { sessions.push(measuresOfSession); }
			measuresOfSession = [measure];
		}
		lastMeasureDate = thisMeasureDate;
	}
	if (measuresOfSession.length) { sessions.push(measuresOfSession); }
	return sessions;
};

export const getMomentDiffFromMeasure = measure => {
	return Difference.seconds(measure.moment, measure.targetMoment);
};

export const getSessionTotalData = (session: Measure[]) => {
	if (!session || session.length < 2) { return null; }
		const sessionDistance =
			Difference.days(session[0].targetMoment, session[session.length - 1].targetMoment);
		const sessionDrift =
			getMomentDiffFromMeasure(session[session.length - 1]) - getMomentDiffFromMeasure(session[0]);
		return {
			averageRate: roundToOneDecimal(sessionDrift / sessionDistance),
			sessionDistance
		};
};
