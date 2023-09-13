<script lang="ts">
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import TickIcon from '$lib/assets/icons/TickIcon.svelte';
	import DatePicker from '$lib/common/input/DatePicker.svelte';
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';
	import TaskListView from './TaskListView.svelte';
	import type { Task } from '../types';

	export let isOpened: boolean;
	export let data: any = {};
	export let handleAddParent: ((title: string, children: Task[]) => void) | undefined = () => {};

	let nameFocus: boolean, dateFocus: boolean;

	const onFocusName = () => (nameFocus = true);
	const onBlurName = () => (nameFocus = false);

	const onFocusDate = () => (dateFocus = true);
	const onBlurDate = () => (dateFocus = false);

	const handleClose = () => (isOpened = false);

	const handleSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const listName = formData.get('listName') as string;
		if (handleAddParent) {
			handleAddParent(listName, taskData);
		}
	};

	const taskData: Task[] = [
		{
			id: '1',
			name: 'Task one'
		},
		{
			id: '2',
			name: 'Task two'
		},
		{
			id: '3',
			name: 'Task three'
		},
		{
			id: '4',
			name: 'Task f'
		},
		{
			id: '5',
			name: 'Task fff'
		},
		{
			id: '6',
			name: 'Task fff'
		}
	];
</script>

<Modal bind:isOpened>
	<ModalOverlay on:click={handleClose} closeCallback={handleClose}>
		<div class="modal-container">
			<div class="topbar-container">
				<div class="topbar-content">
					<p class="title">Add new todo list</p>
					<div class="actions">
						<button class="close-button" on:click={handleClose}>
							<CancelIcon />
						</button>
					</div>
				</div>
				<hr class="topbar-divider" />
			</div>
			<div class="modal-content">
				<form class="modal-form" on:submit={handleSubmit}>
					<div class="half input-half">
						<span class="input-container">
							<label for="listName" class="label" class:focused-input={nameFocus}>List name</label>
							<input
								on:focus={onFocusName}
								on:blur={onBlurName}
								required
								name="listName"
								class="input group"
								id="listName" />
						</span>
						<span class="input-container">
							<label for="until_datepicker" class="label" class:focused-input={dateFocus}
								>Until</label>
							<DatePicker
								name="untilDate"
								id="until_datepicker"
								on:inputfocus={onFocusDate}
								on:inputblur={onBlurDate}
								defaultDate={data.date}
								inputclass="w-full rounded-md h-8 text-black px-2" />
						</span>
					</div>
					<div class="half">
						<div class="left-content">
							<p class="label">Tasks</p>
							<TaskListView tasks={taskData} />
						</div>
					</div>
				</form>
				<button class="add-button"><TickIcon /></button>
			</div>
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.left-content {
		@apply flex flex-col w-full;
	}

	.add-button {
		@apply py-2 bg-indigo-500 w-60 flex items-center justify-center hover:bg-indigo-400 active:bg-indigo-600 transition-colors rounded-lg mt-auto;
	}

	.input-container {
		@apply flex flex-col w-full;
	}

	.label {
		@apply uppercase font-semibold text-xs text-neutral-300/60 transition-all w-fit origin-left mb-2;
	}

	.focused-input {
		@apply text-indigo-300 scale-110;
	}

	.input {
		@apply w-full rounded-md min-h-[2rem] text-black px-2;
	}

	.modal-form {
		@apply flex gap-x-6 w-full max-h-fit;
	}

	.input-half {
		@apply flex-col gap-y-4;
	}

	.half {
		@apply flex w-1/2 h-max;
		height: max-content;
	}

	.modal-content {
		@apply flex gap-x-4 h-full pt-4 w-full flex-col items-center;
	}

	.modal-container {
		@apply flex flex-col max-h-96 h-full w-[544px] bg-neutral-800 px-4 py-2 rounded-md;
	}

	.close-button {
		@apply p-0.5 rounded-sm bg-slate-500/20 text-red-200 hover:text-red-400 transition-colors hover:bg-red-300/20;
	}

	.title {
		@apply text-neutral-300 font-semibold text-lg;
	}

	.topbar-container {
		@apply flex flex-col w-full h-fit;
	}

	.topbar-content {
		@apply flex justify-between;
	}

	.topbar-divider {
		@apply border-neutral-600/40 mt-2;
	}
</style>
