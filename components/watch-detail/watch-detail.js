import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {Measure} from '../../api-helpers/measure.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './watch-detail-templates.js';

export class WatchDetail extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onClick = this.onClick.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
		this.getData();
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener(`click`, this.onClick);
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this.onClick);
		super.disconnectedCallback();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
	}

	onClick(event) {
		if (!event || !event.path || !event.path.length) { return; }
		for (let target of event.path) {
			if (typeof target.matches !== `function`) { continue; }
			if (target.matches(`.previous-session`)) {
				this.currentSessionIndex = this.currentSessionIndex - 1;
				this.currentSession = this.sessions[this.currentSessionIndex];
				this.render();
				break;
			}
			if (target.matches(`.next-session`)) {
				this.currentSessionIndex = this.currentSessionIndex + 1;
				this.currentSession = this.sessions[this.currentSessionIndex];
				this.render();
				break;
			}
		}
	}

	getData() {
		Promise.all([
			Watch.getWatch(router.params[`watchId`]),
			Measure.getMeasures(router.params[`watchId`])
		])
		.then(responses => {
			this.watch = responses[0];
			this.measures = responses[1];
			this.sessions = this.parseSessionsFromMeasures();
			this.currentSession = this.sessions[this.sessions.length - 1];
			this.currentSessionIndex = this.sessions.length - 1;
			this.render();
		})
		.catch(error => null);
	}

	parseSessionsFromMeasures() {
		const allMeasures = this.measures;
		let isFirstMeasure = true;
		let sessions = [];
		let measuresOfSession = [];
		for (const measure of allMeasures) {
			if (isFirstMeasure) {
				isFirstMeasure = false;
				measure.firstOfSet = true;
			}
			if (!measure.firstOfSet) {
				measuresOfSession.push(measure);
			} else {
				if (measuresOfSession.length) { sessions.push(measuresOfSession); }
				measuresOfSession = [measure];
			}
		}
		if (measuresOfSession.length) { sessions.push(measuresOfSession); }
		return sessions;
	}

	getMomentDiff(measure) {
		return Math.round(moment(+measure.targetMoment).diff(moment(+measure.moment), `seconds`, true) * 100) / 100;
	}

	getSessionTotal() {
		if (!this.currentSession || this.currentSession.length < 2) { return ``; }
		const sessionDistance =
			moment(+this.currentSession[this.currentSession.length - 1].moment).diff(+this.currentSession[0].moment, `days`, true);
		if (sessionDistance < 0.5) { return ``;}
		const sessionDrift =
			this.getMomentDiff(this.currentSession[this.currentSession.length - 1]) - this.getMomentDiff(this.currentSession[0]);
		return `Average: ${sessionDrift/sessionDistance} seconds/day`;
	}
}

customElements.define(`gwbw-watch-detail`, WatchDetail);
