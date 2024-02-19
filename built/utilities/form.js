export const getFormData = $form => {
    let data = {};
    $form.querySelectorAll(`input[type=text], input[type=password], input[type=hidden], input[type=number]`).forEach($input => {
        data[$input.getAttribute(`name`)] = $input.value;
    });
    $form.querySelectorAll(`input[type=checkbox]`).forEach($checkbox => {
        data[$checkbox.getAttribute(`name`)] = $checkbox.checked;
    });
    $form.querySelectorAll(`input[type=radio]:checked`).forEach($radio => {
        data[$radio.getAttribute(`name`)] = $radio.value;
    });
    $form.querySelectorAll(`textarea`).forEach($textarea => {
        data[$textarea.getAttribute(`name`)] = $textarea.value;
    });
    return data;
};
