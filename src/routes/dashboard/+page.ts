import type { Currency, ServerCurrencyData } from '$lib/common/widgets/CurrencyWidget/types';
import { Af, Al, No, Eu, Us, Cz, Gb, Ch, Pl } from 'svelte-flag-icons';

export const load = ({ data }) => {
	const modifiedCurrencyData = addIconsToCurrencyData(data.currencyData);

	return {
		...data,
		currencyWidgetData: modifiedCurrencyData
	};
};

const addIconsToCurrencyData = (data: ServerCurrencyData[]) => {
	const icons = { Af, Al, No, Eu, Us, Cz, Gb, Ch, Pl };
	const newData: Currency[] = [];
	for (const item of data) {
		newData.push({ ...item, flagComponent: icons[item.flagComponent] } as Currency);
	}
	return newData;
};
