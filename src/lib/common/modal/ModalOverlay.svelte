<script lang="ts">
	import { fade } from 'svelte/transition';

	export let centerContent = true;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	transition:fade|local={{ duration: 100 }}
	class="modal-overlay"
	class:centerContent
	on:click|self>
	<slot />
</div>

<style lang="postcss">
	.modal-overlay {
		@apply flex w-screen h-screen bg-black/30 text-white;
	}

	.centerContent {
		@apply items-center justify-center;
	}
</style>
