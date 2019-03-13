export class LoadView {
	// Fetches HTML for view, parses and loads contained scripts,
	// and inserts into DOM with $view as parent
	static fetch($view, viewUrl) {
		fetch(viewUrl)
		.then(response => response.text())
		.then(responseAsText => {
			$view.innerHTML = responseAsText;
			const $$scripts = $view.querySelectorAll(`script`);
			$$scripts.forEach($script => {
				let $newScript = document.createElement(`script`);
				$newScript.src = $script.getAttribute(`src`);
				if ($script.type === `module`) {
					$newScript.type = `module`;
				}
				$script.parentNode.removeChild($script);
				$view.appendChild($newScript);
			});
		});
	}

	// Fetches HTML for layout, parses and loads contained scripts,
	// inserts into DOM with $view as parent, fetches HTML for
	// view, parses and loads ITS contained scripts, and inserts
	// into DOM for $view -> #content-container as parent
	static layout($view, layoutUrl, viewUrl) {
		fetch(layoutUrl)
		.then(response => response.text())
		.then(responseAsText => {
			$view.innerHTML = responseAsText;
			const $$scripts = $view.querySelectorAll(`script`);
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
	}
}
