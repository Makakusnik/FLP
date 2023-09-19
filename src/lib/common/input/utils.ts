import type { Dayjs } from 'dayjs';
import type { Day } from './types';

export const arrowKeyCodes = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
export const numberKeyCodes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
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

export const subtractWeek = (dateToUpdate: Dayjs) => dateToUpdate.subtract(7, 'day');
export const subtractDay = (dateToUpdate: Dayjs) => dateToUpdate.subtract(1, 'day');
export const addWeek = (dateToUpdate: Dayjs) => dateToUpdate.add(7, 'day');
export const addDay = (dateToUpdate: Dayjs) => dateToUpdate.add(1, 'day');

export const isSameMonth = (dateA: Dayjs, dateB: Dayjs) =>
	dateA.format('M.YYYY') === dateB.format('M.YYYY');

export const getDate = (day: number, dateInView: Dayjs) => dateInView.set('date', day);
