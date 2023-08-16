import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {MeasureApi} from '../../api-helpers/measure.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {parseSessionsFromMeasures} from '../../utilities/measure.js';

import {makeTemplate} from './measure-interval-templates.js';

export class MeasureInterval extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
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
		try {
			this.shadowRoot.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async getData() {
		const measures = await Promise.all([
			MeasureApi.getMeasure(router.params[`measureOne`]),
			MeasureApi.getMeasure(router.params[`measureTwo`])
		]);
		const {watchId} = measures[0];
		this.startMeasure = (measures[0].targetMoment < measures[1].targetMoment) ? measures[0] : measures[1];
		this.endMeasure = (measures[0].targetMoment < measures[1].targetMoment) ? measures[1] : measures[0];
		// These calls are chained since watchId isn't immediately available
		const otherData = await Promise.all([
			WatchApi.getWatch(watchId),
			MeasureApi.getMeasures(watchId)
		]);
		this.watch = otherData[0];
		this.allMeasures = otherData[1];
		this.sessions = parseSessionsFromMeasures(this.allMeasures);
		this.expandSessionLink = ``;
		let matchingSession = null;
		for (const thisSession of this.sessions) {
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
		this.render();
	}
}

customElements.define(`gwbw-measure-interval`, MeasureInterval);
