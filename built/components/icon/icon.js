import iconData from './icons-data.js';
import uuid from '../../utilities/uuid.js';
export class Icon extends HTMLElement {
    constructor() {
        super();
        this.uniqueIconName = `icon-${uuid()}`;
        this.classList.add(`inline-block`);
    }
    static get observedAttributes() { return [`name`, `color`]; }
    get name() { return this.getAttribute(`name`); }
    set name(newName) { this.setAttribute(`name`, newName); }
    get color() { return this.getAttribute(`color`); }
    set color(newColor) { this.setAttribute(`color`, newColor); }
    static get iconNumber() { }
    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return;
        }
        this.render();
    }
    render() {
        if (!this.name || !iconData[this.name]) {
            return;
        }
        const fillColor = this.color ? `var(--${this.color})` : `currentColor`;
        this.innerHTML = `
			<span id="${this.uniqueIconName}">
				<style>
				#${this.uniqueIconName} svg {
					display: inline-block;
					position: relative; top: 0.15em;
					width: 1em; height: 1em;
					fill: ${fillColor};
				}
				</style>
				${iconData[this.name]}
			</span>
		`;
    }
}
customElements.define(`gwbw-icon`, Icon);
