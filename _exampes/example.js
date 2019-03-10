const makeTemplate = (component) => (`
<style>
h1 {
	font-family: "Open Sans";
}
</style>
<h1>${component.title}!</h1>
`);

class Example extends HTMLElement {
	static get observedAttributes() { return [`title`]; }
	get title() { return this.getAttribute(`title`); }
	set title(newTitle) { this.setAttribute(`title`, newTitle); }

	constructor() {
		super();
		this.attachShadow({mode: `open`});
	}

	createdCallback() {}
	connectedCallback() {}
	disconnectedCallback() {}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (oldValue === newValue) { return; }
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = makeTemplate(this);
		this.dispatchEvent(new CustomEvent(`jnr-example-update`, {bubbles: true, detail: `data!`}));
	}
}

customElements.define(`jnr-example`, Example);

// How to send data into component through property change
// and listen to custom event dispatched out from component
setTimeout(_ => {
	document.addEventListener(`jnr-example-update`, console.log);
	document.querySelector(`jnr-example`).title = `GWBW`;
}, 500);
