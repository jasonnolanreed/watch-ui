export const positionsMap = {
	unspecified: {label: `Unspecified`, icon: `panorama_fish_eye`},
	worn: {label: `Worn`, icon: `accessibility_new`},
	dialup: {label: `Dial Up`, icon: `arrow_upward`},
	dialdown: {label: `Dial Down`, icon: `arrow_downward`},
	crownup: {label: `Crown Up`, icon: `text_rotate_up`},
	crowndown: {label: `Crown Down`, icon: `text_rotation_down`},
	twelveup: {label: `12 O'Clock Up`, icon: `text_rotate_vertical`},
	sixup: {label: `6 O'Clock Up`, icon: `text_rotate_upside_down`},
	winder: {label: `Winder`, icon: `rotate_right`}
};

export const getIconNameForPosition = position => {
	return positionsMap[position] ? positionsMap[position].icon : positionsMap.unspecified.icon;
};
