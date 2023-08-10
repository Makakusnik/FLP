<script lang="ts">
	import TodoItem from './TodoItem.svelte';
	import TodoMainList from './TodoMainList.svelte';
	import type { TodoData } from './types';

	export let data: TodoData;

	const { allTasks, children, completedTasks, title } = data;

	let closedContent = true;

	const toggleContentState = () => (closedContent = !closedContent);
</script>

<div class="todo-wrapper">
	<TodoMainList
		{allTasks}
		{completedTasks}
		{title}
		bind:closedContent
		on:click={toggleContentState} />
	{#if !closedContent}
		<div class="todo-children">
			{#each children as { labels, subtitle, title, id } (id)}
				<TodoItem {title} {subtitle} {labels} />
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
