export const positionsMap = {
    unspecified: { label: `Unspecified`, icon: `panorama_fish_eye` },
    worn: { label: `Worn`, icon: `accessibility_new` },
    dialup: { label: `Dial Up`, icon: `arrow_upward` },
    dialdown: { label: `Dial Down`, icon: `arrow_downward` },
    twelveup: { label: `Crown Right`, icon: `text_rotate_vertical` },
    crowndown: { label: `Crown Down`, icon: `text_rotation_down` },
    sixup: { label: `Crown Left`, icon: `text_rotate_upside_down` },
    crownup: { label: `Crown Up`, icon: `text_rotate_up` },
    winder: { label: `Winder`, icon: `rotate_right` }
};
export const getIconNameForPosition = (position) => {
    return positionsMap[position]?.icon || `account_circle`;
};
export const getPositionNameForMeasure = (measure, customPositions) => {
    if (measure.customPositionId && customPositions?.length) {
        return customPositions.find(thisPosition => measure.customPositionId === thisPosition._id)?.name || ``;
    }
    else {
        return positionsMap[measure.position]?.label || ``;
    }
};
