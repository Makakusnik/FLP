export const getFluctuationType = (change: number) => {
	if (change > 0.0) {
		return 'decrease';
	} else if (change < 0.0) {
		return 'increase';
	} else {
		return 'no change';
	}
};
