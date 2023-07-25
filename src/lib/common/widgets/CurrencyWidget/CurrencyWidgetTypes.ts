import type { twoLetterCodes } from '$lib/constants/flags';
import type { Af, Al, No, Eu, Us, Cz, Gb, Ch, Pl } from 'svelte-flag-icons';

type FlagIconTypes =
	| typeof Af
	| typeof Al
	| typeof No
	| typeof Eu
	| typeof Us
	| typeof Cz
	| typeof Gb
	| typeof Ch
	| typeof Pl;

export type Currency = {
	name: string;
	flagComponent: FlagIconTypes;
	dailyValues: number[];
};

export type ServerCurrencyData = Omit<Currency, 'flagComponent'> & {
	flagComponent: (typeof twoLetterCodes)[number];
};
