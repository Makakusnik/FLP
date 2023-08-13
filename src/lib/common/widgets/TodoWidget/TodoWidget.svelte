<script lang="ts">
	import DotsIcon from '$lib/assets/icons/DotsIcon.svelte';
	import ListIcon from '$lib/assets/icons/ListIcon.svelte';
	import PencilIcon from '$lib/assets/icons/PencilIcon.svelte';
	import SettingsIcon from '$lib/assets/icons/SettingsIcon.svelte';
	import Dropdown from '$lib/common/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/common/dropdown/DropdownItem.svelte';
	import WidgetContainer from '../WidgetContainer.svelte';
	import type { TodoData } from './types';
	import TodoView from './TodoView.svelte';
	import BinFillIcon from '$lib/assets/icons/BinFillIcon.svelte';
	import TodoFillIcon from '$lib/assets/icons/TodoFillIcon.svelte';
	import HideFillIcon from '$lib/assets/icons/HideFillIcon.svelte';
	import { todoState } from '$lib/stores/widgets stores/todo.store';
	import ShowFillIcon from '$lib/assets/icons/ShowFillIcon.svelte';
	import AddParentModal from './AddParentModal.svelte';

	export let data: TodoData[];

	let isOpened = false;

	const handleAddParent = () => (isOpened = true);
</script>

<WidgetContainer title="Todo" className="widget-container">
	<Dropdown slot="dropdown" title="Settings">
		<SettingsIcon slot="titleIcon" />
		<DropdownItem>
			<DotsIcon slot="icon" />
			I dont know
		</DropdownItem>
		<DropdownItem>
			<PencilIcon slot="icon" />
			Edit
		</DropdownItem>
		<DropdownItem>
			<ListIcon slot="icon" />
			Details
		</DropdownItem>
		<DropdownItem>
			<BinFillIcon slot="icon" />
			Remove
		</DropdownItem>
	</Dropdown>
	<AddParentModal bind:isOpened />
	<div class="widget-content">
		<div class="actions">
			<button class="list-action-button" on:click={handleAddParent}
				><TodoFillIcon class="w-5 h-5 text-indigo-300" />
				<p>Add new todo list</p></button>
			<button class="list-action-button">
				{#if $todoState.showCompletedTasks}
					<HideFillIcon class="w-5 h-5 text-indigo-300" />
					<p>Hide completed tasks</p>
				{:else}
					<ShowFillIcon class="w-5 h-5 text-indigo-300" />
					<p>Show completed tasks</p>
				{/if}
			</button>
		</div>
		<div class="content">
			{#each data as todoData (todoData.id)}
				<TodoView data={todoData} />
			{/each}
		</div>
	</div>
</WidgetContainer>

<style lang="postcss">
	.content {
		@apply flex flex-col overflow-y-auto gap-y-2;
	}

	.widget-content {
		@apply flex flex-col w-full h-full bg-neutral-800 overflow-hidden;
	}

	.list-action-button {
		@apply rounded-lg hover:bg-neutral-100/10 transition-colors p-2 w-fit h-8;
		@apply flex gap-x-2 items-center;
	}

	.actions {
		@apply flex gap-x-2 w-full p-2;
	}

	:global(.widget-container) {
		@apply sm:col-span-2 row-span-2 isolate;
	}
</style>
