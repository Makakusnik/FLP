import dayjs, { Dayjs } from 'dayjs';
import type { Day } from './types';

export const generateDaysInView = (
	offsetInBefore: number,
	numOfDaysBefore: number,
	numOfDaysInCurrent: number,
	numOfDaysAfter: number
) => {
	const array: Day[][] = [[], [], [], [], [], []];
	let innerArrayIndex = 0;
	let count = 0;

	for (let i = 1; i <= offsetInBefore; i++, count++) {
		const dayNumber = numOfDaysBefore - offsetInBefore + i;
		array[innerArrayIndex].push({ type: 'before', value: dayNumber });
	}
	for (let i = 1; i <= numOfDaysInCurrent; i++, count++) {
		if (count === 7) {
			innerArrayIndex++;
			count = 0;
		}
		array[innerArrayIndex].push({ type: 'current', value: i });
	}
	for (let i = 1; i <= numOfDaysAfter; i++, count++) {
		if (count === 7) {
			innerArrayIndex++;
			count = 0;
		}
		array[innerArrayIndex].push({ type: 'after', value: i });
	}

	return array;
};

export const isToday = (day: number, currentDate: Dayjs) => {
	return (
		currentDate.format('M.YYYY') === dayjs().format('M.YYYY') && day === Number(dayjs().format('D'))
	);
};

export const isSelected = (day: number, currentDate: Dayjs, selectedDate: Dayjs) => {
	if (!selectedDate) return false;
	return (
		currentDate.format('M.YYYY') === selectedDate.format('M.YYYY') &&
		day === Number(selectedDate.format('D'))
	);
};
