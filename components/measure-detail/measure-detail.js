import {GA} from '../../ga.js';
import {router} from '../../router.js';
import {GWBWElement} from '../../classes/gwbw-element.js';
import {Measure} from '../../api-helpers/measure.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './measure-detail-templates.js';

export class MeasureDetail extends GWBWElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.attachShadow({mode: `open`});
		this.setClickEvents([
			{target: `.cancel`, handler: this.onCancel}
		]);
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		if (router.params.measureId) {
			this.mode = `view`;
			this.measure = await Measure.getMeasure(router.params[`measureId`]);;
		} else {
			this.mode = `add`;
			this.measure = {
				watchId: router.params[`watchId`],
				moment: router.params[`moment`],
				targetMoment: router.params[`targetMoment`],
				firstOfSet: router.params[`firstOfSet`] === `true`,
				note: ``,
				position: `unspecified`
			};
		}
		this.render();
	}

	disconnectedCallback() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onSave); }
		super.disconnectedCallback();
	}

	render() {
		if (this.$form) { this.$form.removeEventListener(`submit`, this.onSave); }
		this.shadowRoot.innerHTML = makeTemplate(this);
		this.$form = this.shadowRoot.querySelector(`form`);
		this.$form.addEventListener(`submit`, this.onSave);
	}

	onCancel(event, target) {
		if (this.mode === `add`) {
			GA.event(`measure`, `add cancel`);
			this.goBackToWatch();
		} else {
			history.back();
		}
	}

	async onSave(event) {
		event.preventDefault();
		if (this.mode === `view`) {
			const didSave = await Measure.updateMeasure(this.measure._id, getFormData(this.$form));
			if (didSave) {
				GA.event(`measure`, `update success`);
				router.navigate(`/watches/detail/${this.measure.watchId}`);
			} else {
				GA.event(`measure`, `update fail`);
				alert(`Failed to save measure. Try again?`);
			}
		} else if (this.mode === `add`) {
			const didAdd = await Measure.addMeasure(getFormData(this.$form));
			if (didAdd) {
				GA.event(`measure`, `add success`);
				this.goBackToWatch();
			} else {
				GA.event(`measure`, `add fail`);
				alert(`Failed to save measure. Try again?`);
			}
		}
	}

	goBackToWatch() {
		// Prevent user from hitting back and getting this view back
		// Instead they will go back to /watches/measure
		history.replaceState(null, null, `#/watches/detail/${this.measure.watchId}`);
		router.resolve();
	}
}

customElements.define(`gwbw-measure-detail`, MeasureDetail);
