export const getFormData = ($form: HTMLElement): any => {
	let data = {};
	$form.querySelectorAll(`input[type=text], input[type=password], input[type=hidden], input[type=number]`)
	.forEach(($input: HTMLInputElement) => {
		data[$input.getAttribute(`name`)] = $input.value;
	});
	$form.querySelectorAll(`input[type=checkbox]`)
	.forEach(($checkbox: HTMLInputElement) => {
		data[$checkbox.getAttribute(`name`)] = $checkbox.checked;
	});
	$form.querySelectorAll(`input[type=radio]:checked`)
	.forEach(($radio: HTMLInputElement) => {
		data[$radio.getAttribute(`name`)] = $radio.value;
	});
	$form.querySelectorAll(`textarea`)
	.forEach(($textarea: HTMLTextAreaElement) => {
		data[$textarea.getAttribute(`name`)] = $textarea.value;
	});
	return data;
};
