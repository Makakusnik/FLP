<script lang="ts">
	import PlusIcon from '$lib/assets/icons/PlusIcon.svelte';
	import type { Task } from '../types';
	import TaskComponent from './Task.svelte';
	import TaskForm from './TaskForm.svelte';

	export let tasks: Task[];

	let listRef: HTMLDivElement;

	const showForm = () => {
		isAddingNewTask = true;
	};

	const introEndCallback = () => {
		listRef.scrollTo({ top: listRef.clientHeight, behavior: 'smooth' });
	};

	const handleConfirm = (id: string, name: string) => () => {
		isAddingNewTask = false;
		tasks = [...tasks, { id, name }];
	};
	const handleRemove = (id: string) => () => {
		tasks = tasks.filter((item) => item.id !== id);
	};
	const handleCancel = () => {
		isAddingNewTask = false;
	};

	let isAddingNewTask = false;
</script>

<div class="todo-list-container">
	<div class="todo-list" bind:this={listRef}>
		{#each tasks as task}
			<TaskComponent name={task.name} handleRemove={handleRemove(task.id)} />
		{/each}
		{#if isAddingNewTask}
			<TaskForm {introEndCallback} {handleCancel} {handleConfirm} />
		{/if}
	</div>
	<button class="add-task-button" on:click={showForm}><PlusIcon class="w-4 h-4" /></button>
</div>

<style lang="postcss">
	.todo-list {
		@apply w-full p-1 overflow-y-auto bg-neutral-700 h-full min-h-[12rem] max-h-48;
	}

	.todo-list-container {
		@apply flex flex-col w-full items-center bg-neutral-700 rounded-md overflow-hidden;
	}

	.add-task-button {
		@apply flex items-center justify-center bg-indigo-500 mb-2 w-8 h-8 p-2 rounded-md hover:bg-indigo-400 transition-colors active:bg-indigo-600;
	}
</style>
