import { GA } from '../../ga.js';
import { router } from '../../router.js';
import { GWBWElement } from '../../classes/gwbw-element.js';
import { WatchApi } from '../../api-helpers/watch.js';
import { TimegrapherApi } from '../../api-helpers/timegrapher.js';
import { getFormData } from '../../utilities/form.js';
import { makeTemplate } from './timegrapher-edit-templates.js';
export class TimegrapherEdit extends GWBWElement {
    timegrapherResults;
    watch;
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    connectedCallback() {
        super.connectedCallback();
        this.bindShadowForm();
        this.getData();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    async getData() {
        this.timegrapherResults = await TimegrapherApi.getTimegrapherResultsById(router[`params`][`timegrapherResultsId`]);
        this.watch = await WatchApi.getWatch(this.timegrapherResults.watchId);
        this.render();
    }
    render() {
        super.render();
        try {
            this.shadowRoot.innerHTML = makeTemplate(this);
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
    async onSubmit(event, target) {
        this.startWorking();
        const addSuccessful = await TimegrapherApi.update(this.timegrapherResults._id, getFormData(target));
        this.stopWorking();
        if (addSuccessful) {
            GA.event(`timegrapher`, `timegrapher edit success`);
            history.back();
        }
        else {
            GA.event(`timegrapher`, `timegrapher edit fail`);
            const messages = document.querySelector(`gwbw-messages`);
            if (messages) {
                messages.add({ message: `Failed to edit results. Try again?`, type: `error` });
            }
        }
    }
}
customElements.define(`gwbw-timegrapher-edit`, TimegrapherEdit);
