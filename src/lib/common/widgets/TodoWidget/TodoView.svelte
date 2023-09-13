<script lang="ts">
	import TodoItem from './TodoItem.svelte';
	import TodoMainList from './TodoMainList.svelte';
	import type { TodoData } from './types';

	export let data: TodoData;

	export let editHandler: () => void;
	export let removeHandler: () => void;

	const { children, title } = data;

	let closedContent = true;

	const toggleContentState = () => (closedContent = !closedContent);
</script>

<div class="todo-wrapper">
	<TodoMainList
		{title}
		bind:closedContent
		on:click={toggleContentState}
		{editHandler}
		{removeHandler} />
	{#if !closedContent}
		<div class="todo-children">
			{#each children as { name, id } (id)}
				<TodoItem {name} />
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.todo-wrapper {
		@apply py-2 bg-neutral-500/5;
	}

	.todo-children {
		@apply flex flex-col gap-y-1 mt-2 items-center;
	}
</style>
