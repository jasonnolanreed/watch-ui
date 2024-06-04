import { GWBWElement } from '../../classes/gwbw-element.js';
import { makeTemplate } from './loader-templates.js';
export class Loader extends GWBWElement {
    loadingGracePeriodTimeout = null;
    loadingOffTimeout = null;
    container;
    gracePeriodDuration = 1000;
    transitionDuration = 400;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    static get observedAttributes() {
        return [`loading`];
    }
    get loading() {
        return !!this.getAttribute(`loading`);
    }
    set loading(newValue) {
        if (!this.container) {
            return;
        }
        if (typeof newValue !== `boolean`) {
            return;
        }
        clearTimeout(this.loadingGracePeriodTimeout);
        clearTimeout(this.loadingOffTimeout);
        if (newValue === true) {
            this.loadingGracePeriodTimeout = setTimeout(_ => {
                requestAnimationFrame(_ => {
                    this.container.classList.remove(`hidden`);
                    setTimeout(_ => {
                        requestAnimationFrame(_ => {
                            this.setAttribute(`loading`, `true`);
                        });
                    }, 0);
                });
            }, this.gracePeriodDuration);
        }
        else {
            requestAnimationFrame(_ => {
                this.removeAttribute(`loading`);
                this.loadingOffTimeout = setTimeout(_ => {
                    requestAnimationFrame(_ => {
                        this.container.classList.add(`hidden`);
                    });
                }, this.transitionDuration);
            });
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // Only called for attributes returned from observedAttributes
    }
    connectedCallback() {
        super.connectedCallback();
        this.render();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        try {
            this.shadowRoot.innerHTML = makeTemplate(this);
            this.container = this.shadowRoot.querySelector(`.loader-container`);
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
}
customElements.define(`gwbw-loader`, Loader);
