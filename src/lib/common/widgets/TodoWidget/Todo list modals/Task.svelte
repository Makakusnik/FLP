<script lang="ts">
	import BinOutlineIcon from '$lib/assets/icons/BinOutlineIcon.svelte';
	import { fly } from 'svelte/transition';

	export let isNew: boolean = false;
	export let handleRemove: () => void;

	export let name: string;
</script>

<div class="task-container" class:new={isNew} in:fly|global={{ x: -150 }}>
	<p class="task-title">{name}</p>
	<div class="task-actions">
		<button class="remove-task-button" type="button" on:click={handleRemove}
			><BinOutlineIcon class="w-4 h-4" /></button>
	</div>
</div>

<style lang="postcss">
	.task-container {
		@apply flex w-full min-h-[2rem] h-fit bg-neutral-400/30 mb-1 transition-colors rounded-md px-2 shadow-md items-center;
	}

	.task-title {
		@apply mr-auto pr-2;
	}

	.remove-task-button {
		@apply bg-rose-500/40 p-1 hover:bg-rose-600/40 transition-colors;
	}
</style>
