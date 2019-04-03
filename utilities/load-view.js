export class LoadView {
	// Fetches HTML for view, parses and loads contained scripts,
	// and inserts into DOM with $view as parent
	static fetch($view, viewUrl) {
		fetch(viewUrl)
		.then(response => response.text())
		.then(responseAsText => {
			$view.innerHTML = responseAsText;
			const $$scripts = $view.querySelectorAll(`script[src]`);
			const $$inlineScripts = $view.querySelectorAll(`script:not([src])`);
			$$scripts.forEach($script => {
				let $newScript = document.createElement(`script`);
				$newScript.src = $script.getAttribute(`src`);
				if ($script.type === `module`) {
					$newScript.type = `module`;
				}
				$script.parentNode.removeChild($script);
				$view.appendChild($newScript);
			});
			$$inlineScripts.forEach($script => {
				eval($script.innerText);
			});
			requestAnimationFrame(_ => {
				$view.classList.add(`in`);
			});
		});
	}

	// Fetches HTML for layout, parses and loads contained scripts,
	// inserts into DOM with $view as parent, fetches HTML for
	// view, parses and loads ITS contained scripts, and inserts
	// into DOM for $view -> .content-container as parent
	static layout($view, layoutUrl, viewUrl) {
		fetch(layoutUrl)
		.then(response => response.text(), error => { throw new Error(); })
		.then(responseAsText => {
			$view.innerHTML = responseAsText;
			const $$scripts = $view.querySelectorAll(`script[src]`);
			$$scripts.forEach($script => {
				let $newScript = document.createElement(`script`);
				$newScript.src = $script.getAttribute(`src`);
				if ($script.type === `module`) {
					$newScript.type = `module`;
				}
				$script.parentNode.removeChild($script);
				$view.appendChild($newScript);
			});
			LoadView.fetch($view.querySelector(`.content-container`), viewUrl);
		})
		.catch(error => null)

		LoadView._scrollToTop();
		document.querySelector(`gwbw-loader`).loading = true;
		const $contentContainer = $view.querySelector(`.content-container`);
		if ($contentContainer) { $contentContainer.classList.remove(`in`); }
	}

	static _scrollToTop() {
		try {
			if (typeof window.scroll === `function`) {
				window.scroll({top: 0, left: 0, behavior: `smooth`});
			} else if (typeof window.scroll === `function`) {
				window.scrollTo({top: 0, left: 0, behavior: `smooth`});
			}
		} catch(error) {
			try {
				window.scrollTo(0, 0);
			} catch(error) {}
		}
	}
}
