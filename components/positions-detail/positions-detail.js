import {GWBWElement} from '../../classes/gwbw-element.js';
import {MeasureApi} from '../../api-helpers/measure.js';
import {PreferenceApi} from '../../api-helpers/preference.js';
import {Difference} from '../../utilities/date-time.js';
import {roundToOneDecimal} from '../../utilities/number.js';
import {positionsMap} from '../../utilities/position.js';

import {makeTemplate} from './positions-detail-templates.js';

export class PositionsDetail extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.toggle-buttons button:not(.selected)`, handler: this.onChangeSort},
		]);
		this.hasSet = {watch: false, start: false, end: false, tolerancePlus: false, toleranceMinus: false};
		this.positions = {};
	}

	static get observedAttributes() { return [`watchid`, `startmeasureid`, `endmeasureid`, `goodtoleranceplus`, `goodtoleranceminus`]; }

	get watchid() { return this.getAttribute(`watchid`); }
	set watchid(value) { this.setAttribute(`watchid`, value); }

	get startmeasureid() { return this.getAttribute(`startmeasureid`); }
	set startmeasureid(value) { this.setAttribute(`startmeasureid`, value); }

	get endmeasureid() { return this.getAttribute(`endmeasureid`); }
	set endmeasureid(value) { this.setAttribute(`endmeasureid`, value); }

	get goodtoleranceplus() { return this.getAttribute(`goodtoleranceplus`); }
	set goodtoleranceplus(value) { this.setAttribute(`goodtoleranceplus`, value); }

	get goodtoleranceminus() { return this.getAttribute(`goodtoleranceminus`); }
	set goodtoleranceminus(value) { this.setAttribute(`goodtoleranceminus`, value); }

	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue === oldValue) { return; }
		switch(name) {
			case `watchid`:
				this.hasSet.watch = true;
				break;
			case `startmeasureid`:
				this.hasSet.start = true;
				break;
			case `endmeasureid`:
				this.hasSet.end = true;
				break;
			case `goodtoleranceplus`:
				this.hasSet.tolerancePlus = true;
				break;
			case `goodtoleranceminus`:
				this.hasSet.toleranceMinus = true;
				break;
		}
		this.getData();
	}

	render() {
		try {
			this.sortedPositionNames = this.getSortedPositionNames();
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		if (!this.hasSet.watch || !this.hasSet.start || !this.hasSet.end || !this.hasSet.tolerancePlus || !this.hasSet.toleranceMinus) { return; }

		Promise.all([
			MeasureApi.getMeasuresByRange(this.watchid, this.startmeasureid, this.endmeasureid),
			PreferenceApi.getPreferences()
		])
		.then(responses => {
			const measures = responses[0];
			this.preferences = responses[1];
			this.parsePositions(measures);
			this.render();
		})
		.catch(error => null);
	}
	
	parsePositions(measures) {
		let previousMeasure;
		// Find all positions and add up distances and diffs
		for (const measure of measures) {
			if (!previousMeasure) {
				previousMeasure = measure;
				continue;
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

	getSortedPositionNames() {
		const positionNames = Object.keys(positionsMap);
		if (this.preferences.positionsSort === `default`) {
			return positionNames;
		}
		const vettedPositionNames = [...positionNames].filter(positionName => {
			return !!this.positions[positionName];
		});
		return vettedPositionNames.sort((positionName1, positionName2) => {
			const position1 = this.positions[positionName1];
			const position2 = this.positions[positionName2];
			return position1.rate < position2.rate ? -1 : 1;
		});
	}

	onChangeSort(event, target) {
		const newSortValue = target.classList.contains('rate') ? 'rate' : 'default';
		this.preferences.positionsSort = newSortValue;
		this.render();
		PreferenceApi.updatePreferences({positionsSort: newSortValue});
	}
}

customElements.define(`gwbw-positions-detail`, PositionsDetail);
