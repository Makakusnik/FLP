<script lang="ts">
	import TodoItem from './TodoItem.svelte';
	import TodoMainList from './TodoMainList.svelte';
	import type { Task } from './types';

	export let children: Task[];
	export let title: string;
	export let todoId: string;

	export let editHandler: () => void;
	export let removeHandler: () => void;

	export let removeItem: (todoId: string, itemId: string) => () => void;

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
			{#if children.length > 0}
				{#each children as { name, id: itemId } (itemId)}
					<TodoItem {name} remove={removeItem(todoId, itemId)} />
				{/each}
			{:else}
				<div class="no-records-wrapper">
					<p>No records found.</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.no-records-wrapper {
		@apply flex flex-col py-2 w-full items-center gap-y-2;
	}

	.todo-wrapper {
		@apply py-2 bg-neutral-500/5;
	}

	.todo-children {
		@apply flex flex-col gap-y-1 mt-2 items-center;
	}
</style>
