<script lang="ts">
	import { portalState } from '$lib/stores/portal.store';
	import Portal from '../portal/Portal.svelte';

	export let isOpened: boolean;
	$: $portalState.isPortalShown = isOpened;
</script>

{#if $portalState.isPortalShown}
	<Portal>
		<slot />
	</Portal>
{/if}
