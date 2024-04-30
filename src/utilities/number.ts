export const roundToOneDecimal = number => {
	if (typeof number !== `number`) { number = +number; }
	return (Math.round(number * 10) / 10);
};

export const roundToTwoDecimals = number => {
	if (typeof number !== `number`) { number = +number; }
	return (Math.round(number * 100) / 100);
};
