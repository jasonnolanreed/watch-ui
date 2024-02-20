import { GWBWElement } from '../../classes/gwbw-element.js';
import { makeTemplate } from './positions-detail-templates.js';
export class PositionsDetail extends GWBWElement {
    positionsData;
    goodTolerancePlusNumber;
    goodToleranceMinusNumber;
    sortedPositionNamesArray;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    static get observedAttributes() { return [`positions`, `goodtoleranceplus`, `goodtoleranceminus`, `sortedpositionnames`]; }
    get positions() { return this.getAttribute(`positions`); }
    set positions(stringifiedPositions) { this.setAttribute(`positions`, stringifiedPositions); }
    get goodtoleranceplus() { return this.getAttribute(`goodtoleranceplus`); }
    set goodtoleranceplus(goodTolerancePlus) { this.setAttribute(`goodtoleranceplus`, goodTolerancePlus); }
    get goodtoleranceminus() { return this.getAttribute(`goodtoleranceminus`); }
    set goodtoleranceminus(goodToleranceMinus) { this.setAttribute(`goodtoleranceminus`, goodToleranceMinus); }
    get sortedpositionnames() { return this.getAttribute(`goodtoleranceminus`); }
    set sortedpositionnames(sortedPositionNames) { this.setAttribute(`sortedpositionnames`, sortedPositionNames); }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === `positions` && newValue !== oldValue) {
            this.positionsData = JSON.parse(decodeURI(this.positions));
            console.log(`nolan positionsData`, this.positionsData);
            this.render();
        }
        if (name === `goodtoleranceplus` && newValue !== oldValue) {
            this.goodTolerancePlusNumber = +this.goodtoleranceplus;
            this.render();
        }
        if (name === `goodtoleranceminus` && newValue !== oldValue) {
            this.goodToleranceMinusNumber = +this.goodtoleranceminus;
            this.render();
        }
        if (name === `sortedpositionnames` && newValue !== oldValue) {
            this.sortedPositionNamesArray = newValue.split(`;;;`);
            this.render();
        }
    }
    render() {
        try {
            if (this.positionsData && this.goodTolerancePlusNumber !== null && this.goodToleranceMinusNumber !== null && this.sortedPositionNamesArray) {
                this.shadowRoot.innerHTML = makeTemplate(this);
            }
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
}
customElements.define(`gwbw-positions-detail`, PositionsDetail);
