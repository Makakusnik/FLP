<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let centerContent = true;
	export let closeCallback: () => void;

	const log = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeCallback();
		}
	};

	onMount(() => {
		document.addEventListener('keydown', log);
		document.getElementsByTagName('body')[0].style.overflow = 'hidden'; // blocks scrolling while modal is opened.
	});

	onDestroy(() => {
		document.removeEventListener('keydown', log);
		document.getElementsByTagName('body')[0].style.overflow = 'auto';
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" class:centerContent on:click|self={closeCallback}>
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
