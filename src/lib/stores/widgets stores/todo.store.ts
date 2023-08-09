import { writable, type Writable } from 'svelte/store';

interface TodoState {
	areLabelsExpanded: boolean;
}

export const todoState: Writable<TodoState> = writable<TodoState>({
	areLabelsExpanded: false
});

export function exapandLabels() {
	todoState.update((state) => ({ ...state, areLabelsExpanded: true }));
}

export function collapseLabels() {
	todoState.update((state) => ({ ...state, areLabelsExpanded: false }));
}
