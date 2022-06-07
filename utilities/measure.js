import {Format} from './date-time.js';

export const parseSessionsFromMeasures = allMeasures => {
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
