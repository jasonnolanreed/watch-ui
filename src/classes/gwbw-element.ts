import {globalStyleSheet} from "../app.js";
import {Loader} from "../types/components";

export class GWBWElement extends HTMLElement {
	protected _clickEvents: ClickEvent[] | null = null;
	protected _hasSetupResizeListener = false;
	protected _hasConnected = false;
	protected _hasForm: boolean;
	protected _hasShadowForm: boolean;
	protected _resizeObserver: ResizeObserver;

	constructor() {
		super();
		this.startWorking = this.startWorking.bind(this);
		this.stopWorking = this.stopWorking.bind(this);
		this._onClick = this._onClick.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	connectedCallback() {
		this._hasConnected = true;
		this.classList.add(`block`);
		this.addEventListener(`click`, this._onClick);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets.push(globalStyleSheet);
		}
	}

	disconnectedCallback() {
		this.removeEventListener(`click`, this._onClick);
		if (this._hasForm) { this.removeEventListener(`submit`, this._onSubmit); }
		if (this._hasShadowForm) { this.shadowRoot?.removeEventListener(`submit`, this._onSubmit); }
		if (this._resizeObserver) { this._resizeObserver.disconnect(); }
	}

	render() {
		const $loader: Loader = window[`gwbw-loader`];
		$loader.loading = false;
		const $contentContainer = window[`view`].querySelector(`.content-container`);
		requestAnimationFrame(_ => {
			$contentContainer.classList.add(`in`);
		});
	}

	bindForm() {
		this._hasForm = true;
		this.addEventListener(`submit`, this._onSubmit);
	}

	bindShadowForm() {
		this._hasShadowForm = true;
		this.shadowRoot?.addEventListener(`submit`, this._onSubmit);
	}

	setClickEvents(clickEvents: ClickEvent[]) {
		this._clickEvents = clickEvents;
	}

	async fetchRequiredScripts(requiredScriptSources: string[]): Promise<null> {
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
					resolve(null);
				}
			}
		});
	}

	async fetchRequiredScriptsInSequence(requiredScriptSources: string[]): Promise<null> {
		const component = this;

		return new Promise((resolve, reject) => {
			let scriptsFetched = 0;

			_fetchScript(requiredScriptSources[0]);

			function _fetchScript(scriptSrc) {
				const $script = document.createElement(`script`);
				const $parent = component.shadowRoot || document.body;
				$script.src = scriptSrc;
				$script.onload = _done;
				$script.onerror = _done;
				$parent.appendChild($script);
			}

			function _done() {
				scriptsFetched++;
				if (scriptsFetched === requiredScriptSources.length) {
					resolve(null);
				} else {
					_fetchScript(requiredScriptSources[scriptsFetched]);
				}
			}
		});
	}

	startWorking($givenForm?) {
		if ($givenForm) {
			requestAnimationFrame(_ => {
				$givenForm.classList.add(`working`);
			});
		} else {
			const $forms: NodeListOf<HTMLFormElement> = (this.shadowRoot) ?
				this.shadowRoot.querySelectorAll(`form`) :
				this.querySelectorAll(`form`);
			if (!$forms.length) { return; }
			$forms.forEach($form => {
				requestAnimationFrame(_ => {
					$form.classList.add(`working`);
				});
			});
		}
	}

	stopWorking($givenForm?) {
		if ($givenForm) {
			requestAnimationFrame(_ => {
				$givenForm.classList.remove(`working`);
			});
		} else {
			const $forms = (this.shadowRoot) ?
				this.shadowRoot.querySelectorAll(`form`) :
				this.querySelectorAll(`form`);
			if (!$forms.length) { return; }
			$forms.forEach($form => {
				requestAnimationFrame(_ => {
					$form.classList.remove(`working`);
				});
			});
		}
	}

	_onClick(event: MouseEvent) {
		if (!this._clickEvents) { return; }
		let targetMatched = false;
		for (let target of event.composedPath()) {
			if (typeof (target as HTMLElement).matches !== `function`) { continue; }
			for (let clickEvent of this._clickEvents) {
				if ((target as HTMLElement).matches(clickEvent.target)) {
					event.preventDefault();
					clickEvent.handler.call(this, event, (target as HTMLElement));
					targetMatched = true;
					break;
				}
			}
			if (targetMatched) { break; }
		}
	}

	_onSubmit(event: SubmitEvent) {
		for (let target of event.composedPath()) {
			if (typeof (target as HTMLElement).matches !== `function`) { continue; }
			if ((target as HTMLElement).matches(`form`)) {
				event.preventDefault();
				this.onSubmit.call(this, event, target);
				break;
			}
		}
		event.preventDefault();
	}

	onSubmit(event: SubmitEvent, target: HTMLFormElement) {}
}

interface ClickEvent {
	target: string;
	handler: Function;
}
