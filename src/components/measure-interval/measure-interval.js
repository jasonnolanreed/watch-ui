import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';

import {CustomPositionsApi} from '../../api-helpers/custom-positions.js';
import {MeasureApi} from '../../api-helpers/measure.js';
import {PreferenceApi} from '../../api-helpers/preference.js';
import {WatchApi} from '../../api-helpers/watch.js';

import {Difference} from '../../utilities/date-time.js';
import {parseSessionsFromMeasures} from '../../utilities/measure.js';
import {roundToOneDecimal} from '../../utilities/number.js';
import {getPositionNameForMeasure, positionsMap} from '../../utilities/position.js';

import {makeTemplate} from './measure-interval-templates.js';

export class MeasureInterval extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.toggle-buttons button:not(.selected)`, handler: this.onChangeSort},
		]);

		this.startMeasure;
		this.endMeasure;
		// this.measures is only selected range within session
		this.measures;
		this.positions;
		this.customPositions;
		this.sortedPositionNames;
		this.preferences;
		this.watch;
		this.expandSessionLink;
	}

	async connectedCallback() {
		super.connectedCallback();
		this.getData();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		super.render();
		this.setPositions();
		this.setSortedPositionNames();
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		const responses1 = await Promise.all([
			MeasureApi.getMeasure(router.params[`measureOne`]),
			MeasureApi.getMeasure(router.params[`measureTwo`]),
			PreferenceApi.getPreferences(),
			CustomPositionsApi.getCustomPositions(),
		]);
		const {watchId} = responses1[0];
		this.startMeasure = (responses1[0].targetMoment < responses1[1].targetMoment) ? responses1[0] : responses1[1];
		this.endMeasure = (responses1[0].targetMoment < responses1[1].targetMoment) ? responses1[1] : responses1[0];
		this.preferences = responses1[2];
		this.customPositions = responses1[3];

		// These calls are chained since watchId isn't immediately available
		const responses2 = await Promise.all([
			WatchApi.getWatch(watchId),
			MeasureApi.getMeasuresByRange(watchId, this.startMeasure._id, this.endMeasure._id),
			MeasureApi.getMeasures(watchId),
		]);
		this.watch = responses2[0];
		this.measures = responses2[1];
		const allMeasuresForWatch = responses2[2];
		const sessions = parseSessionsFromMeasures(allMeasuresForWatch);
		this.setExpandSessionLink(sessions);
		this.render();
	}

	setExpandSessionLink(sessions) {
		let matchingSession = null;
		for (const thisSession of sessions) {
			if (matchingSession) { break; }
			for (const thisMeasure of thisSession) {
				if (this.startMeasure.targetMoment === thisMeasure.targetMoment) {
					matchingSession = thisSession;
					if (
						this.startMeasure.targetMoment !== thisSession[0].targetMoment ||
						this.endMeasure.targetMoment !== thisSession[thisSession.length - 1].targetMoment
					) {
						this.expandSessionLink = `#/measure/interval/${thisSession[0]._id}/${thisSession[thisSession.length - 1]._id}`;
					}
					break;
				}
			}
		}
	}

	setPositions() {
		this.positions = {};
		let previousMeasure;
		// Find all positions and add up distances and diffs
		for (const measure of this.measures) {
			if (!previousMeasure) {
				previousMeasure = measure;
				continue;
			}
			if (measure.customPositionId) {
				measure.position = getPositionNameForMeasure(measure, this.customPositions);
			}
			if (!this.positions[measure.position]) {
				this.positions[measure.position] = {name: measure.position, days: 0, secondsDrift: 0, positionCount: 0};
			}
			const days = Difference.days(previousMeasure.targetMoment, measure.targetMoment);
			const secondsDrift =
				Difference.seconds(measure.moment, measure.targetMoment) -
				Difference.seconds(previousMeasure.moment, previousMeasure.targetMoment);
			this.positions[measure.position].days += days;
			this.positions[measure.position].secondsDrift += secondsDrift;
			this.positions[measure.position].positionCount++;
			previousMeasure = measure;
		}
		// Calculate rate for each position
		for (const positionName of Object.keys(this.positions)) {
			this.positions[positionName].rate =
				roundToOneDecimal(this.positions[positionName].secondsDrift / this.positions[positionName].days);
		}
	}

	setSortedPositionNames() {
		let positionNames = [];
		this.customPositions.forEach(customPosition => {
			positionNames.push(customPosition.name);
		});
		Object.keys(positionsMap).map(positionName => {
			positionNames.push(positionName);
		});
		if (this.preferences.positionsSort === `default`) {
			this.sortedPositionNames = positionNames;
			return;
		}
		const vettedPositionNames = [...positionNames].filter(positionName => {
			return !!this.positions[positionName];
		});
		this.sortedPositionNames = vettedPositionNames.sort((positionName1, positionName2) => {
			const position1 = this.positions[positionName1];
			const position2 = this.positions[positionName2];
			return position1.rate < position2.rate ? -1 : 1;
		});
	}

	onChangeSort(event, target) {
		const newSortValue = target.classList.contains('rate') ? 'rate' : 'default';
		this.preferences.positionsSort = newSortValue;
		PreferenceApi.updatePreferences({positionsSort: newSortValue});
		this.render();
	}
}

customElements.define(`gwbw-measure-interval`, MeasureInterval);
