import type { ServerCurrencyData } from '$lib/common/widgets/CurrencyWidget/types';
import type { TodoData } from '$lib/common/widgets/TodoWidget/types';
import { codePairs, twoLetterCodes } from '$lib/constants/flags';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	listName: z.string(),
	toDoUntil: z.date()
});

export const load = async () => {
	const currencyData: ServerCurrencyData[] = populateCurrencyData();
	const todoData: TodoData[] = populateTodoData();
	const form = await superValidate(schema);

	return { currencyData, todoData, form };
};

function generateRandomNumbersArray(number: number) {
	const length = 9;
	const randomNumbersArray = [];

	for (let i = 0; i < length; i++) {
		if (number === 1) {
			randomNumbersArray.push(1);
			continue;
		}
		const num = Math.random() * number * 0.1 + number;
		const numberToRandomize = num + num * 0.1;

		if (numberToRandomize === 1) {
			randomNumbersArray.push(1);
			continue;
		}

		randomNumbersArray.push(Number(numberToRandomize.toFixed(2)));
	}

	return randomNumbersArray;
}

const populateCurrencyData = () => {
	const currencyData: ServerCurrencyData[] = [];
	for (let i = 0; i < 9; i++) {
		const flagCode = twoLetterCodes[i];
		const generatedData = generateRandomNumbersArray(
			[85.66, 89.69, 9.95, 0.89, 1, 21.4, 0.78, 0.86, 3.98][i]
		);
		const currencyCode = codePairs[flagCode];
		currencyData.push({
			dailyValues: generatedData,
			name: currencyCode,
			flagComponent: flagCode
		});
	}
	return currencyData;
};

const populateTodoData = () => {
	const todoData: TodoData[] = [];
	const todoParent1: TodoData = {
		id: '0',
		title: 'Create site',
		date: new Date().toISOString(),
		children: [
			{
				id: '0',
				name: 'Create nginx config'
			},
			{
				id: '1',
				name: 'Add DNS type A for site'
			},
			{
				id: '2',
				name: 'Setup github actions CI/CD pipline'
			}
		]
	};

	const todoParent2: TodoData = {
		id: '1',
		title: 'Fill fridge',
		date: new Date().toISOString(),
		children: [
			{
				id: '3',
				name: 'Buy gas'
			},
			{
				id: '4',
				name: 'Buy stuff'
			},
			{
				id: '5',
				name: "Don't forget kilo chleba"
			}
		]
	};

	todoData.push(todoParent1, todoParent2);

	return todoData;
};
