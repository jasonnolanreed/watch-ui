export class GWBWElement extends HTMLElement {
	constructor() {
		super();
		this.startWorking = this.startWorking.bind(this);
		this.stopWorking = this.stopWorking.bind(this);
		this._onClick = this._onClick.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this._clickEvents = null;
		this._hasSetupResizeListener = false;
		this._hasConnected = false;
	}

	connectedCallback() {
		this._hasConnected = true;
		this.classList.add(`block`);
		this.addEventListener(`click`, this._onClick);
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this._onClick);
		if (this._hasForm) { this.removeEventListener(`submit`, this._onSubmit); }
		if (this._hasShadowForm) { this.shadowRoot.removeEventListener(`submit`, this._onSubmit); }
		if (this._resizeObserver) { this._resizeObserver.disconnect(); }
	}

	render() {
		document.querySelector(`gwbw-loader`).loading = false;
	}

	bindForm() {
		this._hasForm = true;
		this.addEventListener(`submit`, this._onSubmit);
	}

	bindShadowForm() {
		this._hasShadowForm = true;
		this.shadowRoot.addEventListener(`submit`, this._onSubmit);
	}

	setClickEvents(clickEvents) {
		this._clickEvents = clickEvents;
	}

	fetchRequiredScripts(requiredScriptSources) {
		return new Promise((resolve, reject) => {
			let scriptsFetched = 0;
			requiredScriptSources.forEach(src => {
				const $script = document.createElement(`script`);
				const $parent = this.shadowRoot || document.body;
				$script.src = src;
				$script.onload = _done;
				$script.onerror = _done;
				$parent.appendChild($script);
			});
	
			function _done() {
				scriptsFetched++;
				if (scriptsFetched === requiredScriptSources.length) {
					resolve();
				}
			}
		});
	}

	startWorking($givenForm) {
		if ($givenForm) {
			$givenForm.classList.add(`working`);
		} else {
			const $forms = (this.shadowRoot) ?
				this.shadowRoot.querySelectorAll(`form`) :
				this.querySelectorAll(`form`);
			if (!$forms.length) { return; }
			$forms.forEach($form => {
				$form.classList.add(`working`);
			});
		}
	}

	stopWorking($givenForm) {
		if ($givenForm) {
			$givenForm.classList.remove(`working`);
		} else {
			const $forms = (this.shadowRoot) ?
				this.shadowRoot.querySelectorAll(`form`) :
				this.querySelectorAll(`form`);
			if (!$forms.length) { return; }
			$forms.forEach($form => {
				$form.classList.remove(`working`);
			});
		}
	}

	_onClick(event) {
		if (!this._clickEvents) { return; }
		let targetMatched = false;
		for (let target of event.composedPath()) {
			if (typeof target.matches !== `function`) { continue; }
			for (let clickEvent of this._clickEvents) {
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
}
