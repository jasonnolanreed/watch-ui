import { GA } from '../../ga.js';
import { router } from '../../router.js';
import { GWBWElement } from '../../classes/gwbw-element.js';
import { CustomPositionsApi } from '../../api-helpers/custom-positions.js';
import { MeasureApi } from '../../api-helpers/measure.js';
import { getFormData } from '../../utilities/form.js';
import { makeTemplate } from './measure-detail-templates.js';
export class MeasureDetail extends GWBWElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
        this.setClickEvents([
            { target: `.cancel-button`, handler: this.onCancel }
        ]);
    }
    async connectedCallback() {
        super.connectedCallback();
        if (router.params.measureId) {
            this.mode = `view`;
            this.measure = await MeasureApi.getMeasure(router.params[`measureId`]);
            ;
        }
        else {
            this.mode = `add`;
            this.measure = {
                watchId: router.params[`watchId`],
                moment: router.params[`moment`],
                targetMoment: router.params[`targetMoment`],
                firstOfSession: router.params[`firstOfSession`] === `true`,
                note: ``,
                position: `unspecified`,
                customPositionId: null,
            };
        }
        this.customPositions = await CustomPositionsApi.getCustomPositions();
        this.bindShadowForm();
        this.render();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
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
    onCancel(event, target) {
        if (this.mode === `add`) {
            GA.event(`measure`, `measure add cancel`);
            this.goBackToSession();
        }
        else {
            history.back();
        }
    }
    async onSubmit(event, target) {
        this.startWorking();
        const formData = getFormData(target);
        if (formData.position.startsWith(`customid:`)) {
            formData.customPositionId = formData.position.replace(`customid:`, ``);
            formData.position = ``;
        }
        else {
            formData.customPositionId = ``;
        }
        if (this.mode === `view`) {
            const didSave = await MeasureApi.updateMeasure(this.measure._id, formData);
            if (didSave) {
                GA.event(`measure`, `measure update success`);
                history.back();
            }
            else {
                GA.event(`measure`, `measure update fail`);
                const messages = document.querySelector(`gwbw-messages`);
                if (messages) {
                    messages.add({ message: `Failed to save measure. Try again?`, type: `error` });
                }
            }
            this.stopWorking();
        }
        else if (this.mode === `add`) {
            const didAdd = await MeasureApi.addMeasure(formData);
            if (didAdd) {
                GA.event(`measure`, `measure add success`);
                this.goBackToSession();
            }
            else {
                GA.event(`measure`, `measure add fail`);
                const messages = document.querySelector(`gwbw-messages`);
                if (messages) {
                    messages.add({ message: `Failed to save measure. Try again?`, type: `error` });
                }
            }
            this.stopWorking();
        }
    }
    goBackToSession() {
        // Prevent user from hitting back and getting this view back
        // Instead they will go back to /sessions/:watchId
        history.replaceState(null, null, `#/sessions/${this.measure.watchId}`);
        router.resolve();
    }
}
customElements.define(`gwbw-measure-detail`, MeasureDetail);
