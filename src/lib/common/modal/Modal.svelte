<script lang="ts">
	import { closePortal, openPortal, portalState } from '$lib/stores/portal.store';
	import Portal from '../portal/Portal.svelte';

	export let isOpened: boolean = false;

	export let onOpen: (() => void) | undefined = undefined;
	export let onClose: (() => void) | undefined = undefined;

	$: {
		if (isOpened) {
			openPortal();
			onOpen?.();
		} else {
			closePortal();
			onClose?.();
		}
	}
</script>

{#if $portalState.isPortalShown}
	<Portal>
		<slot />
	</Portal>
{/if}
