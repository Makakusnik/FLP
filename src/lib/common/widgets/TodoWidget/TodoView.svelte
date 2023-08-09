<script lang="ts">
	import { fly } from 'svelte/transition';
	import TodoItem from './TodoItem.svelte';
	import TodoMainList from './TodoMainList.svelte';
	import type { TodoData } from './types';

	export let data: TodoData;

	const { allTasks, children, completedTasks, title } = data;

	let closedContent = true;

	const toggleContentState = () => (closedContent = !closedContent);
</script>

<TodoMainList
	{allTasks}
	{completedTasks}
	{title}
	bind:closedContent
	on:click={toggleContentState} />
<div class="overflow-hidden">
	{#if !closedContent}
		<div class="todo-content" transition:fly={{ y: -150, duration: 500 }}>
			{#each children as { labels, subtitle, title }}
				<TodoItem {title} {subtitle} {labels} />
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.todo-content {
		@apply flex flex-col gap-y-1 items-center;
	}
</style>
