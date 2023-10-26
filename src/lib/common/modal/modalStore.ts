import { writable } from 'svelte/store';

export type ModalStateOptions = {
	defaultValue?: boolean;
	storeName?: string;
	openCallback?: () => void;
	closeCallback?: () => void;
};

// Toto bude fungovat iba v pripade, ze sa mi podari fixnut bug kde escapom zatvorim hocjaky modal, aj ten, ktory je pod najvyssie zobrazenym modalom
export function useModalState(arg1?: string | ModalStateOptions) {
	if (typeof arg1 === 'string') {
		const startStop = () => {
			console.log('Got first sub: ', arg1);
			return () => {
				console.log('No more subs: ', arg1);
			};
		};
		const { set, subscribe, update } = writable(false, arg1 ? startStop : undefined);

		const open = () => update(() => true);
		const close = () => update(() => false);

		return { isOpened: { subscribe, set }, open, close };
	} else if (typeof arg1 === 'object') {
		const storeName = arg1?.storeName ? arg1.storeName : '';
		const startStop = () => {
			console.log('Got first sub: ', storeName);
			return () => {
				console.log('No more subs: ', storeName);
			};
		};
		const { set, subscribe, update } = writable(
			Boolean(arg1?.defaultValue),
			storeName ? startStop : undefined
		);

		const open = () =>
			update(() => {
				arg1?.openCallback && arg1.openCallback();
				return true;
			});
		const close = () =>
			update(() => {
				arg1?.closeCallback && arg1?.closeCallback();
				return false;
			});

		return { isOpened: { subscribe, set }, open, close };
	} else {
		const { set, subscribe, update } = writable(false);
		const open = () => update(() => true);
		const close = () => update(() => false);

		return { isOpened: { subscribe, set }, open, close };
	}
}
