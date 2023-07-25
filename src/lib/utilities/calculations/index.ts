export function calculatePercentageFrom(base: number, part: number): number {
	return Number((part / base - 1).toFixed(2));
}
