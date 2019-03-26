import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {Auth} from '../../api-helpers/auth.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Watch} from '../../api-helpers/watch.js';
import {Measure} from '../../api-helpers/measure.js';
import {roundToTwoDecimals} from '../../utilities/number.js';

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
				event.preventDefault();
				router.navigate(`/watches/detail/${router.params['watchId']}/?sessionIndex=${this.currentSessionIndex - 1}`);
				break;
			}
			if (target.matches(`.next-session`)) {
				event.preventDefault();
				router.navigate(`/watches/detail/${router.params['watchId']}/?sessionIndex=${this.currentSessionIndex + 1}`);
				break;
			}
			if (target.matches(`.view-measure`) || target.matches(`.list-item`)) {
				event.preventDefault();
				router.navigate(`/measure/${target.getAttribute(`measure-id`)}`);
				break;
			}
			if (target.matches(`.delete-measure`)) {
				event.preventDefault();
				this.removeMeasure(target.getAttribute(`measure-id`));
				break;
			}
			if (target.matches(`.interval`)) {
				event.preventDefault();
				this.selectInterval(target);
				break;
			}
		}
	}

	async removeMeasure(measureId) {
		const confirmDelete = confirm(`Do you really want to delete this measure?`);
		if (!confirmDelete) { return; }
		const didRemove = await Measure.removeMeasure({measureId});
		if (!didRemove) {
			GA.event(`measure`, `delete fail`);
			alert(`Failed to remove measure. Try again?`);
		} else {
			GA.event(`measure`, `delete success`);
			this.getData();
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
			this.currentSessionIndex = this.sessions.length - 1;
			if (router.query && router.query.sessionIndex && router.query.sessionIndex > -1 && router.query.sessionIndex < this.sessions.length) {
				this.currentSessionIndex = +router.query.sessionIndex;
			}
			this.currentSession = this.sessions[this.currentSessionIndex];
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
		return moment(+measure.targetMoment).diff(moment(+measure.moment), `seconds`, true);
	}

	getSessionTotalData() {
		if (!this.currentSession || this.currentSession.length < 2) { return null; }
		const sessionDistance =
			moment(+this.currentSession[this.currentSession.length - 1].targetMoment).diff(+this.currentSession[0].targetMoment, `days`, true);
		const sessionDrift =
			this.getMomentDiff(this.currentSession[this.currentSession.length - 1]) - this.getMomentDiff(this.currentSession[0]);
		return {
			averageRate: roundToTwoDecimals(sessionDrift / sessionDistance),
			sessionDistance
		};
	}

	selectInterval(target) {
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
}

customElements.define(`gwbw-watch-detail`, WatchDetail);
