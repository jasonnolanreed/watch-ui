export const positionsMap = {
	unspecified: {label: `Unspecified`, icon: `panorama_fish_eye`},
	worn: {label: `Worn`, icon: `accessibility_new`},
	dialup: {label: `Dial Up`, icon: `arrow_upward`},
	dialdown: {label: `Dial Down`, icon: `arrow_downward`},
	crownup: {label: `Crown Up`, icon: `text_rotate_up`},
	crowndown: {label: `Crown Down`, icon: `text_rotation_down`},
	winder: {label: `Winder`, icon: `rotate_right`}
};

export const getIconNameForPosition = position => {
	return positionsMap[position] ? positionsMap[position].icon : positionsMap.unspecified.icon;
};
