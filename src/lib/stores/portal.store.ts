import { writable, type Writable } from 'svelte/store';

interface PortalState {
	isPortalShown: boolean;
}

export const portalState: Writable<PortalState> = writable<PortalState>({
	isPortalShown: false
});

export function openPortal() {
	portalState.update((state) => ({ ...state, isPortalShown: true }));
}

export function closePortal() {
	portalState.update((state) => ({ ...state, isPortalShown: false }));
}
