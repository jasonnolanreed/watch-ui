import {Loader} from '../components/loader/loader';
import {Messages} from '../components/messages/messages';

export class LoadView {
	// Fetches HTML for layout, parses and loads contained scripts,
	// inserts into DOM with $view as parent, fetches HTML for
	// view (if supplied), parses and loads ITS contained scripts, and inserts
	// into DOM for $view -> .content-container as parent
	static layout($view: HTMLElement, layoutUrl: string, viewUrl?: string) {
		window.scrollTo(0, 0);
		
		// Turn <gwbw-loader> on
		(window[`gwbw-loader`] as Loader).loading = true;

		// Fade out content container
		const $contentContainer = $view.querySelector(`.content-container`);
		if ($contentContainer) {
			requestAnimationFrame(_ => {
				$contentContainer.classList.remove(`in`);
			});
		}

		// Close non-persistent messages
		const messages: Messages = document.querySelector(`gwbw-messages`);
		if (messages && typeof messages.closeNonPersistent === `function`) {
			messages.closeNonPersistent();
		}

		fetch(layoutUrl)
		.then(response => response.text(), error => { throw new Error(error); })
		.then(responseAsText => {
			$view.innerHTML = responseAsText;
			const $$scripts = $view.querySelectorAll(`script[src]`);
			$$scripts.forEach($script => {
				let $newScript = document.createElement(`script`);
				$newScript.src = $script.getAttribute(`src`);
				if ($script.getAttribute(`type`) === `module`) {
					$newScript.type = `module`;
				}
				$script.parentNode.removeChild($script);
				$view.appendChild($newScript);
			});
			if (viewUrl) {
				LoadView._fetch($view.querySelector(`.content-container`), viewUrl);
			} else {
				// If only layout and not view within, undo loading sequence
				setTimeout(_ => {
					requestAnimationFrame(_ => {
						(window[`gwbw-loader`] as Loader).loading = false;
						$contentContainer.classList.add(`in`);
					});
				}, 0);
			}
		})
		.catch(error => null);
	}

	// Fetches HTML for view, parses and loads contained scripts,
	// and inserts into DOM with $view as parent
	static _fetch($contentContainer: HTMLElement, viewUrl: string) {
		fetch(viewUrl)
		.then(response => response.text())
		.then(responseAsText => {
			$contentContainer.innerHTML = responseAsText;
			const $$scripts = $contentContainer.querySelectorAll(`script[src]`);
			const $$inlineScripts = $contentContainer.querySelectorAll(`script:not([src])`);
			$$scripts.forEach($script => {
				let $newScript = document.createElement(`script`);
				$newScript.src = $script.getAttribute(`src`);
				if ($script.getAttribute(`type`) === `module`) {
					$newScript.type = `module`;
				}
				$script.parentNode.removeChild($script);
				$contentContainer.appendChild($newScript);
			});
			$$inlineScripts.forEach($script => {
				eval($script.textContent);
			});
		});
	}
}
