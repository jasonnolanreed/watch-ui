export class NamedSizeElement extends HTMLElement {
	constructor() {
		super();
		this.updateNamedSize = this.updateNamedSize.bind(this);
		this.namedSizes = [
			{name: `small`, width: 600},
			{name: `medium`, width: 900},
			{name: `large`, width: 1200},
			{name: `huge`, width: 1600},
		];
	}

	connectedCallback() {
		this.classList.add(`block`);
		this.setupResizeListener();
	}

	disconnectedCallback() {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
	}

	setNamedSizes(sizes) {
		this.namedSizes = sizes;
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
