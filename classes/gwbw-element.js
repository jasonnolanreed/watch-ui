export class GWBWElement extends HTMLElement {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
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
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
	}

	setClickEvents(clickEvents) {
		this.clickEvents = clickEvents;
	}

	setNamedSizes(sizes) {
		this.namedSizes = sizes;
	}

	onClick(event) {
		if (!this.clickEvents) { return; }
		for (let target of event.composedPath()) {
			if (typeof target.matches !== `function`) { continue; }
			let targetMatched = false;
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
