export const getFormData = $form => {
	let data = {};
	$form.querySelectorAll(`input`).forEach($input => {
		data[$input.getAttribute(`name`)] = $input.value;
	});
	$form.querySelectorAll(`textarea`).forEach($textarea => {
		data[$textarea.getAttribute(`name`)] = $textarea.value
	});
	return data;
};
