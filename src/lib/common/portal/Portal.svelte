<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let target: HTMLElement | null | undefined = globalThis.document?.body;

	let ref: HTMLElement;

	onMount(() => {
		if (target) {
			target.appendChild(ref);
		}
	});
</script>

<div transition:fade|global={{ duration: 100 }} class="fixed top-0 left-0" bind:this={ref}>
	<slot />
</div>
