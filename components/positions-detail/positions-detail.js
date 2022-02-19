import {MeasureApi} from '../../api-helpers/measure.js';
import {Difference} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';

import {makeTemplate} from './positions-detail-templates.js';

export class PositionsDetail extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.hasSet = {watch: false, start: false, end: false, tolerance: false};
		this.positions = {};
	}

	static get observedAttributes() { return [`watchid`, `startmeasureid`, `endmeasureid`, `goodtolerance`]; }

	get watchid() { return this.getAttribute(`watchid`); }
	set watchid(value) { this.setAttribute(`watchid`, value); }

	get startmeasureid() { return this.getAttribute(`startmeasureid`); }
	set startmeasureid(value) { this.setAttribute(`startmeasureid`, value); }

	get endmeasureid() { return this.getAttribute(`endmeasureid`); }
	set endmeasureid(value) { this.setAttribute(`endmeasureid`, value); }

	get goodtolerance() { return this.getAttribute(`goodtolerance`); }
	set goodtolerance(value) { this.setAttribute(`goodtolerance`, value); }

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
			case `goodtolerance`:
				this.hasSet.tolerance = true;
				break;
		}
		this.getData();
	}

	render() {
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	getData() {
		if (!this.hasSet.watch || !this.hasSet.start || !this.hasSet.end || !this.hasSet.tolerance) { return; }
		MeasureApi.getMeasuresByRange(this.watchid, this.startmeasureid, this.endmeasureid)
		.then(measures => {
			this.parsePositions(measures);
			this.render();
		});
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
				roundToTwoDecimals(this.positions[positionName].secondsDrift / this.positions[positionName].days);
		}
	}
}

customElements.define(`gwbw-positions-detail`, PositionsDetail);
