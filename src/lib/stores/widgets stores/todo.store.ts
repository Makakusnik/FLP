import { writable, type Writable } from 'svelte/store';

interface TodoState {
	areLabelsExpanded: boolean;
	showCompletedTasks: boolean;
}

export const todoState: Writable<TodoState> = writable<TodoState>({
	areLabelsExpanded: false,
	showCompletedTasks: true
});

export function exapandLabels() {
	todoState.update((state) => ({ ...state, areLabelsExpanded: true }));
}

export function collapseLabels() {
	todoState.update((state) => ({ ...state, areLabelsExpanded: false }));
}

export function showCompletedTasks() {
	todoState.update((state) => ({ ...state, showCompletedTasks: true }));
}

export function hideCompletedTasks() {
	todoState.update((state) => ({ ...state, showCompletedTasks: false }));
}
