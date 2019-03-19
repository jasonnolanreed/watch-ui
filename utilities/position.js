export const getIconNameForPosition = position => {
	const iconsMap = {
		unspecified: `help`,
		worn: `accessibility_new`,
		dialup: `arrow_upward`,
		dialdown: `arrow_downward`,
		crownup: `text_rotate_up`,
		crowndown: `text_rotation_down`
	};
	return iconsMap[position] || `help`;
};