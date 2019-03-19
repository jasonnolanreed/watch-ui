import {router} from '../../router.js';
import {NamedSizeElement} from '../../classes/named-size.js';
import {Measure} from '../../api-helpers/measure.js';
import {getFormData} from '../../utilities/form.js';

import {makeTemplate} from './measure-detail-templates.js';

export class MeasureDetail extends NamedSizeElement {
	constructor() {
		super();

		this.render = this.render.bind(this);
		this.onSave = this.onSave.bind(this);

		this.attachShadow({mode: `open`});
		this.setNamedSizes([
			{name: `huge`, width: 1}
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
		this.measure = await Measure.getMeasure(router.params[`measureId`]);;
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

	async onSave(event) {
		event.preventDefault();
		const didSave = await Measure.updateMeasure(this.measure._id, getFormData(this.$form));
		if (didSave) {
			router.navigate(`/watches/detail/${this.measure.watchId}`);
		} else {
			alert(`Save updates failed. Try again?`);
		}
	}
}

customElements.define(`gwbw-measure-detail`, MeasureDetail);
