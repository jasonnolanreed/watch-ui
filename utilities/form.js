export const getFormData = $form => {
	let data = {};
	$form.querySelectorAll(`input`).forEach($input => {
		data[$input.getAttribute(`name`)] = $input.value;
	});
	return data;
};
