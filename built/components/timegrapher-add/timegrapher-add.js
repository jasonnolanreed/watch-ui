import { GA } from '../../ga.js';
import { router } from '../../router.js';
import { GWBWElement } from '../../classes/gwbw-element.js';
import { WatchApi } from '../../api-helpers/watch.js';
import { TimegrapherApi } from '../../api-helpers/timegrapher.js';
import { getFormData } from '../../utilities/form.js';
import { makeTemplate } from './timegrapher-add-templates.js';
export class TimegrapherAdd extends GWBWElement {
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
        this.watch = await WatchApi.getWatch(router.params[`watchId`]);
        this.render();
    }
    render() {
        super.render();
        try {
            this.shadowRoot.innerHTML = makeTemplate(this);
            this.shadowRoot.querySelector(`input:not([type=hidden]):first-of-type`)?.focus();
        }
        catch (error) {
            console.error(`Error rendering`, error);
        }
    }
    async onSubmit(event, target) {
        this.startWorking();
        const addSuccessful = await TimegrapherApi.add(getFormData(target));
        this.stopWorking();
        if (addSuccessful) {
            GA.event(`timegrapher`, `timegrapher add success`);
            router.navigate(`/timegrapher/${this.watch._id}`);
        }
        else {
            GA.event(`timegrapher`, `timegrapher add fail`);
            const messages = document.querySelector(`gwbw-messages`);
            if (messages) {
                messages.add({ message: `Failed to add results. Try again?`, type: `error` });
            }
        }
    }
}
customElements.define(`gwbw-timegrapher-add`, TimegrapherAdd);
