<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let target: HTMLElement | null | undefined = globalThis.document?.body;

	let ref: HTMLElement;

	onMount(() => {
		if (target) {
			target.appendChild(ref);
		}
	});
</script>

<div class="fixed" bind:this={ref}>
	<slot />
</div>
