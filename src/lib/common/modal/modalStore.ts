import { writable } from 'svelte/store';

// Toto bude fungovat iba v pripade, ze sa mi podari fixnut bug kde escapom zatvorim hocjaky modal, aj ten, ktory je pod najvyssie zobrazenym modalom
export function useModalState(storeName?: string) {
	// Just for debug purposes.. will delete soon, hopefuly
	const startStop = () => {
		console.log('Got first sub: ', storeName);
		return () => {
			console.log('No more subs: ', storeName);
		};
	};
	const { set, subscribe, update } = writable(false, storeName ? startStop : undefined);

	const open = () => update(() => true);
	const close = () => update(() => false);

	return { isOpened: { subscribe, set }, open, close };
}
