<script lang="ts">
	import Portal from '../portal/Portal.svelte';

	export let isOpened: boolean;
</script>

{#if isOpened}
	<Portal>
		<slot />
	</Portal>
{/if}
