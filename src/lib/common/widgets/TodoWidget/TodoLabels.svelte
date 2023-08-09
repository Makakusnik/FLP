<script lang="ts">
	import Label from '$lib/common/misc/labels/Label.svelte';
	import { todoState } from '$lib/stores/widgets stores/todo.store';
	import type { TodoLabel } from './types';

	export let labels: TodoLabel[];
</script>

<button on:click>
	{#each labels as { text, textColor, color }}
		<Label {text} {color} {textColor} collapsed={$todoState.areLabelsExpanded} />
	{/each}
</button>

<style lang="postcss">
	button {
		@apply flex flex-wrap gap-y-1 gap-x-1 w-fit max-w-[12rem] h-full;
	}
</style>
