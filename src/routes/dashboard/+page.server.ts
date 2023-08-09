import type { ServerCurrencyData } from '$lib/common/widgets/CurrencyWidget/types';
import type { TodoData } from '$lib/common/widgets/TodoWidget/types';
import { codePairs, twoLetterCodes } from '$lib/constants/flags';

export const load = () => {
	const currencyData: ServerCurrencyData[] = populateCurrencyData();
	const todoData: TodoData[] = populateTodoData();
	return { currencyData, todoData };
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
		title: 'Create site',
		allTasks: 4,
		completedTasks: 4,
		children: [
			{
				title: 'Create nginx config',
				subtitle: 'Server',
				labels: [
					{
						color: '#065f46',
						text: 'devops',
						textColor: 'white'
					}
				]
			},
			{
				title: 'Add DNS type A for site',
				subtitle: 'Network',
				labels: [
					{
						color: '#065f46',
						text: 'devops',
						textColor: 'white'
					}
				]
			},
			{
				title: 'Setup github actions CI/CD pipline',
				subtitle: 'Server',
				labels: [
					{
						color: '#065f46',
						text: 'devops',
						textColor: 'white'
					}
				]
			}
		]
	};

	const todoParent2: TodoData = {
		title: 'Fill fridge',
		allTasks: 4,
		completedTasks: 0,
		children: [
			{
				title: 'Buy gas',
				subtitle: 'Car',
				labels: [
					{
						color: '#6d28d9',
						text: 'chores',
						textColor: 'white'
					}
				]
			},
			{
				title: 'Buy stuff',
				subtitle: 'Shopping',
				labels: [
					{
						color: '#6d28d9',
						text: 'chores',
						textColor: 'white'
					}
				]
			},
			{
				title: "Don't forget kilo chleba",
				subtitle: 'Shopping',
				labels: [
					{
						color: '#6d28d9',
						text: 'chores',
						textColor: 'white'
					},
					{
						color: '#be123c',
						text: 'important',
						textColor: 'white'
					}
				]
			}
		]
	};

	todoData.push(todoParent1, todoParent2);

	return todoData;
};
