import type { ServerCurrencyData } from '$lib/common/widgets/CurrencyWidget/types';
import { codePairs, twoLetterCodes } from '$lib/constants/flags';

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

export const load = () => {
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

	return { currencyData: currencyData };
};
