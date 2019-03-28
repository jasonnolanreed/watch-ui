export class GWBWElement extends HTMLElement {
	constructor() {
		super();
		this.startWorking = this.startWorking.bind(this);
		this.stopWorking = this.stopWorking.bind(this);
		this.onClick = this.onClick.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.updateNamedSize = this.updateNamedSize.bind(this);
		this.clickEvents = null;
		this.namedSizes = [
			{name: `small`, width: 600},
			{name: `medium`, width: 900},
			{name: `large`, width: 1200},
			{name: `huge`, width: 1600},
		];
	}

	connectedCallback() {
		this.classList.add(`block`);
		this.addEventListener(`click`, this.onClick);
		this.setupResizeListener();
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this.onClick);
		if (this.hasForm) { this.removeEventListener(`submit`, this._onSubmit); }
		if (this.hasShadowForm) { this.shadowRoot.removeEventListener(`submit`, this._onSubmit); }
		if (this.resizeObserver) { this.resizeObserver.disconnect(); }
	}

	bindForm() {
		this.hasForm = true;
		this.addEventListener(`submit`, this._onSubmit);
	}

	bindShadowForm() {
		this.hasShadowForm = true;
		this.shadowRoot.addEventListener(`submit`, this._onSubmit);
	}

	setClickEvents(clickEvents) {
		this.clickEvents = clickEvents;
	}

	setNamedSizes(sizes) {
		this.namedSizes = sizes;
	}

	startWorking() {
		let $form;
		if (this.shadowRoot) {
			$form = this.shadowRoot.querySelector(`form`);
		} else {
			$form = this.querySelector(`form`);
		}
		if (!$form) { return; }
		$form.classList.add(`working`);
	}

	stopWorking() {
		let $form;
		if (this.shadowRoot) {
			$form = this.shadowRoot.querySelector(`form`);
		} else {
			$form = this.querySelector(`form`);
		}
		if (!$form) { return; }
		$form.classList.remove(`working`);
	}

	onClick(event) {
		if (!this.clickEvents) { return; }
		let targetMatched = false;
		for (let target of event.composedPath()) {
			if (typeof target.matches !== `function`) { continue; }
			for (let clickEvent of this.clickEvents) {
				if (target.matches(clickEvent.target)) {
					event.preventDefault();
					clickEvent.handler.call(this, event, target);
					targetMatched = true;
					break;
				}
			}
			if (targetMatched) { break; }
		}
	}

	_onSubmit(event) {
		for (let target of event.composedPath()) {
			if (typeof target.matches !== `function`) { continue; }
			if (target.matches(`form`)) {
				event.preventDefault();
				if (typeof this.onSubmit === `function`) {
					this.onSubmit.call(this, event, target);
				}
				break;
			}
		}
		event.preventDefault();
	}

	setupResizeListener() {
		if (`ResizeObserver` in window) {
			this.resizeObserver = new ResizeObserver(elements => {
				this.updateNamedSize(elements[0].contentRect.width);
			});
			setTimeout(_ => {
				this.resizeObserver.observe(this);
			}, 0);
		} else {
			// Fallback to set once and not update on resize
			setTimeout(_ => {
				this.updateNamedSize(this.getBoundingClientRect().width);
			}, 0);
		}
	}

	updateNamedSize(width) {
		let sizeName = ``;
		for (const size of this.namedSizes) {
			if (size.width <= width) {
				sizeName = size.name;
			}
		}
		this.setAttribute(`namedsize`, sizeName);
	}
}
