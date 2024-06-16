import {CustomPosition, Measure} from "../types/api-data";

export const positionsMap = {
	unspecified: {label: `Unspecified`, icon: `panorama_fish_eye`},
	worn: {label: `Worn`, icon: `accessibility_new`},
	dialup: {label: `Dial Up`, icon: `arrow_upward`},
	dialdown: {label: `Dial Down`, icon: `arrow_downward`},
	twelveup: {label: `12:00 Up`, icon: `text_rotate_vertical`},
	crowndown: {label: `9:00 Up`, icon: `text_rotation_down`},
	sixup: {label: `6:00 Up`, icon: `text_rotate_upside_down`},
	crownup: {label: `3:00 Up`, icon: `text_rotate_up`},
	winder: {label: `Winder`, icon: `rotate_right`}
};

export const getIconNameForPosition = (position: string): string => {
	return positionsMap[position]?.icon || `account_circle`;
};

export const getPositionNameForMeasure = (measure: Measure, customPositions: CustomPosition[]): string => {
	if (measure.customPositionId && customPositions?.length) {
		return customPositions.find(thisPosition => measure.customPositionId === thisPosition._id)?.name || ``;
	} else {
		return positionsMap[measure.position]?.label || ``;
	}
};
