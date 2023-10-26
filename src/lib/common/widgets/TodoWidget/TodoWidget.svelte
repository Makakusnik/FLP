<script lang="ts">
	import DotsIcon from '$lib/assets/icons/DotsIcon.svelte';
	import ListIcon from '$lib/assets/icons/ListIcon.svelte';
	import PencilIcon from '$lib/assets/icons/PencilIcon.svelte';
	import SettingsIcon from '$lib/assets/icons/SettingsIcon.svelte';
	import Dropdown from '$lib/common/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/common/dropdown/DropdownItem.svelte';
	import WidgetContainer from '../WidgetContainer.svelte';
	import type { Task, TodoData } from './types';
	import TodoView from './TodoView.svelte';
	import BinFillIcon from '$lib/assets/icons/BinFillIcon.svelte';
	import TodoFillIcon from '$lib/assets/icons/TodoFillIcon.svelte';
	import AddOrEditParentModal from './Todo list modals/AddEditParentModal.svelte';
	import PlusIcon from '$lib/assets/icons/PlusIcon.svelte';
	import { useModalState } from '$lib/common/modal/modalStore';

	export let data: TodoData[];

	let { isOpened: isOpenedAdd, open: openAddModal, close: closeAdd } = useModalState();
	let { isOpened: isOpenedEdit, open: openEdit, close: closeEdit } = useModalState();

	let itemToEdit: TodoData | undefined = undefined;

	const openEditParent = (value: TodoData) => () => {
		openEdit();
		itemToEdit = value;
	};

	const handleRemoveParent = (id: string) => () => (data = data.filter((item) => item.id !== id));

	const handleAddParent = (title: string, date: string, children: Task[]) => {
		data = [...data, { id: new Date().toISOString() + 'parent', title, children, date }];
		closeAdd();
	};

	const handleEditParent = (id: string, title: string, date: string, children: Task[]) => {
		data = data.filter((item) => item.id !== id);
		data = [...data, { id, title, date, children }];
		closeEdit();
	};

	const removeItem = (todoId: string, itemId: string) => () => {
		const item = data.filter((item) => item.id === todoId)[0];
		data = data.filter((item) => item.id !== todoId);
		const newChildren = item.children.filter((item) => item.id !== itemId);
		data = [...data, { id: item.id, title: item.title, date: item.date, children: newChildren }];
	};

	$: data.sort((a, b) => (a.id < b.id ? 1 : -1));
</script>

<WidgetContainer title="Todo" className="sm:col-span-2 row-span-2 isolate">
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
	{#if isOpenedAdd}
		<AddOrEditParentModal bind:isOpened={$isOpenedAdd} {handleAddParent} handleClose={closeAdd} />
	{/if}
	{#if isOpenedEdit}
		<AddOrEditParentModal
			bind:isOpened={$isOpenedEdit}
			{handleEditParent}
			data={itemToEdit}
			handleClose={closeEdit} />
	{/if}
	<div class="widget-content">
		<div class="actions">
			<button class="list-action-button" on:click={openAddModal}>
				<TodoFillIcon class="w-5 h-5 text-indigo-300" />
				<p>Add new todo list</p>
			</button>
		</div>
		<div class="content">
			{#if data && data.length > 0}
				{#each data as todoData (todoData.id)}
					<TodoView
						{removeItem}
						todoId={todoData.id}
						children={todoData.children}
						title={todoData.title}
						editHandler={openEditParent(todoData)}
						removeHandler={handleRemoveParent(todoData.id)} />
				{/each}
			{:else}
				<div class="no-records-wrapper">
					<p>No records found.</p>
					<button class="add-new-button" on:click={openAddModal}
						><PlusIcon class="w-5 h-5" /></button>
				</div>
			{/if}
		</div>
	</div>
</WidgetContainer>

<style lang="postcss">
	.no-records-wrapper {
		@apply flex flex-col py-2 w-full items-center gap-y-2;
	}

	.add-new-button {
		@apply p-2 bg-indigo-400 rounded-full hover:bg-indigo-500 active:bg-indigo-600 transition-colors;
	}

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
		@apply flex gap-x-2 w-full p-2 bg-neutral-900/20;
	}
</style>
