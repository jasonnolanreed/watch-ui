export class LoadView {
	static load($view, newView) {
		$view.innerHTML = newView;
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
	}
}
