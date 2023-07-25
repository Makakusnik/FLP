import type { Currency } from '$lib/common/widgets/CurrencyWidget/CurrencyWidgetTypes.js';
import { Af, Al, No, Eu, Us, Cz, Gb, Ch, Pl } from 'svelte-flag-icons';

export const load = ({ data }) => {
	const icons = { Af, Al, No, Eu, Us, Cz, Gb, Ch, Pl };
	const newData: Currency[] = [];
	for (const item of data.currencyData) {
		newData.push({ ...item, flagComponent: icons[item.flagComponent] });
	}

	return {
		currencyWidgetData: newData
	};
};
