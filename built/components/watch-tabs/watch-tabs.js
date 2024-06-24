import { GWBWElement } from '../../classes/gwbw-element.js';
import { makeTemplate } from './watch-tabs-templates.js';
export class WatchTabs extends GWBWElement {
    watchData;
    preferencesData;
    selectedData;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    static get observedAttributes() { return [`watch`, `preferences`, `selected`]; }
    get watch() { return this.getAttribute(`watch`); }
    set watch(stringValue) { this.setAttribute(`watch`, stringValue); }
    get preferences() { return this.getAttribute(`preferences`); }
    set preferences(stringValue) { this.setAttribute(`preferences`, stringValue); }
    get selected() { return this.getAttribute(`selected`); }
    set selected(stringValue) { this.setAttribute(`selected`, stringValue); }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === `watch` && newValue !== oldValue) {
            if (this.watch !== "undefined") {
                this.watchData = JSON.parse(decodeURI(this.watch));
            }
            this.render();
        }
        if (name === `preferences` && newValue !== oldValue) {
            if (this.preferences !== "undefined") {
                this.preferencesData = JSON.parse(decodeURI(this.preferences));
            }
            this.render();
        }
        if (name === `selected` && newValue !== oldValue) {
            if (this.selected !== "undefined") {
                this.selectedData = this.selected;
                ;
            }
            this.render();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.render();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        super.render();
        if (typeof this.watchData === `undefined` ||
            typeof this.preferencesData === `undefined` ||
            typeof this.selectedData === `undefined`) {
            return;
        }
        try {
            this.shadowRoot.innerHTML = makeTemplate(this);
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
}
customElements.define(`gwbw-watch-tabs`, WatchTabs);
