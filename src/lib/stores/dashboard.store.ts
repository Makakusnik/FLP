import { writable, type Writable } from 'svelte/store';

interface DashboardState {
	isMenuOpen: boolean;
	isMenuOpenTemporary: boolean;
}

export const dashboardState: Writable<DashboardState> = writable<DashboardState>({
	isMenuOpen: false,
	isMenuOpenTemporary: false
});

export function closeMenu() {
	dashboardState.update((state) => ({ ...state, isMenuOpen: false }));
}

export function openMenu() {
	dashboardState.update((state) => ({ ...state, isMenuOpen: true }));
}
