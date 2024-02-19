import {GWBWElement} from '../../classes/gwbw-element.js';
import {CustomPositionsApi} from '../../api-helpers/custom-positions.js';
import {positionsMap} from '../../utilities/position.js';

import {makeTemplate} from './custom-positions-templates.js';

export class CustomPositions extends GWBWElement {
	constructor() {
		super();
		this.getData();
		this.setClickEvents([
			{target: `.add-position`, handler: this.addPosition},
			{target: `.edit-position`, handler: this.editPosition},
			{target: `.delete-position`, handler: this.deletePosition},
		]);
	}

	async connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	async getData() {
		this.customPositions = await CustomPositionsApi.getCustomPositions();
		this.render();
	}

	render() {
		super.render();
		try {
			this.innerHTML = makeTemplate(this);
		} catch(error) {
			console.error(`Error rendering`, error);
		}
	}

	async addPosition(event, target) {
		let newName = window.prompt("New Custom Position Name");
		if (newName === null) { return; }
		newName = newName || "Custom Position";
		if (this.handleDuplicateName(newName)) { return; }
		await CustomPositionsApi.addPosition({name: newName});
		this.getData();
	}

	async editPosition(event, target) {
		const currentName = target.getAttribute("position-name");
		const positionId = target.getAttribute("position-id");
		let newName = window.prompt("New Custom Position Name", currentName);
		if (newName === null) { return; }
		newName = newName || "Custom Position";
		if (this.handleDuplicateName(newName)) { return; }
		await CustomPositionsApi.updateCustomPosition(positionId, {name: newName});
		this.getData();
	}

	async deletePosition(event, target) {
		const didConfirm = window.confirm(`Do you really want to delete this position?`);
		if (!didConfirm) { return; }
		const positionId = target.getAttribute("position-id");
		await CustomPositionsApi.deleteCustomPosition(positionId, {});
		this.getData();
	}

	handleDuplicateName(proposedName = "") {
		if (!positionsMap[proposedName.trim().toLowerCase()]) {
			return false;
		} else {
			const messages = document.querySelector(`gwbw-messages`);
			messages.add({message: `A position with this name already exists. Try again?`, type: `error`, ttl: 5000});
			return true;
		}
	}
}

customElements.define(`gwbw-custom-positions`, CustomPositions);
