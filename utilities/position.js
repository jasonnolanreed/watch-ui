export const getIconNameForPosition = position => {
	const iconsMap = {
		unspecified: `crop_square`,
		worn: `accessibility_new`,
		dialup: `arrow_upward`,
		dialdown: `arrow_downward`,
		crownup: `text_rotate_up`,
		crowndown: `text_rotation_down`,
		winder: `rotate_right`
	};
	return iconsMap[position] || positions[`unspecified`];
};