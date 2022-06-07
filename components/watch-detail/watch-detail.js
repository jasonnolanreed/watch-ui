import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {WatchApi} from '../../api-helpers/watch.js';
import {MeasureApi} from '../../api-helpers/measure.js';
import {Format, Difference} from '../../utilities/date-time.js';
import {roundToTwoDecimals} from '../../utilities/number.js';
import {parseSessionsFromMeasures} from '../../utilities/measure.js';

import {makeTemplate} from './watch-detail-templates.js';

export class WatchDetail extends GWBWElement {
	constructor() {
		super();
		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.previous-session`, handler: this.viewPreviousSession},
			{target: `.next-session`, handler: this.viewNextSession},
			{target: `.view-measure`, handler: this.viewMeasure},
			{target: `.delete-measure`, handler: this.removeMeasure},
			{target: `.interval`, handler: this.selectInterval},
		]);
	}

	connectedCallback() {
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

	viewPreviousSession(event, target) {
		router.navigate(`/watches/detail/${router.params['watchId']}/?sessionIndex=${this.currentSessionIndex - 1}`);
	}

	viewNextSession(event, target) {
		router.navigate(`/watches/detail/${router.params['watchId']}/?sessionIndex=${this.currentSessionIndex + 1}`);
	}

	viewMeasure(event, target) {
		router.navigate(`/measure/${target.getAttribute(`measure-id`)}`);
	}

	selectInterval(event, target) {
		const index = target.getAttribute(`measure-index`);
		if (!this.intervalStartIndex) {
			this.intervalStartIndex = index;
			this.shadowRoot.querySelector(`.measures-list`).classList.add(`interval-start`);
			target.classList.add(`interval-start`);
		} else {
			if (this.intervalStartIndex !== index) {
				const measureOne = this.currentSession[this.intervalStartIndex]._id;
				const measureTwo = this.currentSession[index]._id;
				router.navigate(`/measure/interval/${measureOne}/${measureTwo}`);
			} else {
				this.intervalStartIndex = null;
				this.shadowRoot.querySelector(`.measures-list`).classList.remove(`interval-start`);
				target.classList.remove(`interval-start`);
			}
		}
	}

	async removeMeasure(event, target) {
		const measureId = target.getAttribute(`measure-id`);
		const confirmDelete = confirm(`Do you really want to delete this measure?`);
		if (!confirmDelete) { return; }
		this.startWorking();
		const didRemove = await MeasureApi.removeMeasure({measureId});
		this.stopWorking();
		if (!didRemove) {
			GA.event(`measure`, `measure delete fail`);
			const messages = document.querySelector(`gwbw-messages`);
			if (messages) {
				messages.add({message: `Failed to remove measure. Try again?`, type: `error`});
			}
		} else {
			GA.event(`measure`, `measure delete success`);
			this.getData();
		}
	}

	getData() {
		Promise.all([
			WatchApi.getWatch(router.params[`watchId`]),
			MeasureApi.getMeasures(router.params[`watchId`])
		])
		.then(responses => {
			this.watch = responses[0];
			this.measures = responses[1];
			this.sessions = parseSessionsFromMeasures(this.measures);
			this.currentSessionIndex = this.sessions.length - 1;
			if (router.query && router.query.sessionIndex && router.query.sessionIndex > -1 && router.query.sessionIndex < this.sessions.length) {
				this.currentSessionIndex = +router.query.sessionIndex;
			}
			this.currentSession = this.sessions[this.currentSessionIndex];
			this.render();
		})
		.catch(error => null);
	}

	getMomentDiff(measure) {
		return Difference.seconds(measure.moment, measure.targetMoment);
	}

	getSessionTotalData() {
		if (!this.currentSession || this.currentSession.length < 2) { return null; }
		const sessionDistance =
			Difference.days(this.currentSession[0].targetMoment, this.currentSession[this.currentSession.length - 1].targetMoment);
		const sessionDrift =
			this.getMomentDiff(this.currentSession[this.currentSession.length - 1]) - this.getMomentDiff(this.currentSession[0]);
		return {
			averageRate: roundToTwoDecimals(sessionDrift / sessionDistance),
			sessionDistance
		};
	}
}

customElements.define(`gwbw-watch-detail`, WatchDetail);
