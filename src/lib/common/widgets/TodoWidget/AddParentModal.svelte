<script lang="ts">
	import BinOutlineIcon from '$lib/assets/icons/BinOutlineIcon.svelte';
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import PlusIcon from '$lib/assets/icons/PlusIcon.svelte';
	import TickIcon from '$lib/assets/icons/TickIcon.svelte';
	import DatePicker from '$lib/common/input/DatePicker.svelte';
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';
	import { fly } from 'svelte/transition';

	export let isOpened: boolean;

	let isAddingTask: boolean = false;

	let nameFocus: boolean, dateFocus: boolean;

	const onFocusName = () => (nameFocus = true);
	const onBlurName = () => (nameFocus = false);

	const onFocusDate = () => (dateFocus = true);
	const onBlurDate = () => (dateFocus = false);

	const handleClose = () => (isOpened = false);

	const handleShowForm = () => (isAddingTask = true);
	const handleCloseForm = () => (isAddingTask = false);
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
				<div class="modal-content">
					<div class="modal-form">
						<div class="half input-half">
							<span class="input-container">
								<label for="listName" class="label" class:focused-input={nameFocus}
									>List name</label>
								<input
									on:focus={onFocusName}
									on:blur={onBlurName}
									class="input group"
									id="listName" />
							</span>
							<span class="input-container">
								<label for="until_datepicker" class="label" class:focused-input={dateFocus}
									>Until</label>
								<DatePicker
									name="until"
									id="until_datepicker"
									on:inputfocus={onFocusDate}
									on:inputblur={onBlurDate}
									inputclass="w-full rounded-md h-8 text-black px-2" />
							</span>
						</div>
						<div class="half">
							<div class="left-content">
								<p class="label">Tasks</p>
								<div class="todo-list-container">
									{#if !isAddingTask}
										<div class="todo-list" in:fly={{ x: -300 }} out:fly={{ x: -300 }}>
											<div class="tasks-container">
												<div class="task-container">
													<p class="task-title">Task 1</p>
													<div class="tags">
														<div style="background-color: red" />
														<div style="background-color: blue" />
														<div style="background-color: yellow" />
														<div style="background-color: green" />
														<div style="background-color: purple" />
														<div style="background-color: lime" />
													</div>
													<div class="task-actions">
														<button class="add-tag-button">Edit tags</button>
														<button class="remove-task-button"
															><BinOutlineIcon class="w-4 h-4" /></button>
													</div>
												</div>
											</div>
											<button class="add-task-button" on:click={handleShowForm}
												><PlusIcon class="w-4 h-4" /></button>
										</div>
									{:else}
										<div class="todo-list" in:fly={{ x: 300 }} out:fly={{ x: 300 }}>
											<div class="tasks-container">
												<div class="task-container">
													<p class="task-title">Task 1</p>
													<div class="tags">
														<div style="background-color: red" />
														<div style="background-color: blue" />
														<div style="background-color: yellow" />
														<div style="background-color: green" />
														<div style="background-color: purple" />
														<div style="background-color: lime" />
													</div>
													<div class="task-actions">
														<button class="add-tag-button">Edit tags</button>
														<button class="remove-task-button"
															><BinOutlineIcon class="w-4 h-4" /></button>
													</div>
												</div>
											</div>
											<button class="complete-task-button" on:click={handleCloseForm}
												><TickIcon class="w-4 h-4" /></button>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
					<button class="add-button"><TickIcon /></button>
				</div>
			</div>
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.task-title {
		@apply mr-auto;
	}

	.tags {
		@apply flex w-6 h-6 mr-1 p-[1px] flex-wrap gap-[2px] content-start;
	}

	.tags div {
		@apply min-w-[4px] max-w-[4px] min-h-[4px] max-h-[4px];
	}
	.remove-task-button {
		@apply bg-rose-800/20 p-1 hover:bg-rose-800/40 transition-colors;
	}
	.complete-task-button {
		@apply flex items-center justify-center bg-green-500 mb-2 w-8 h-8 p-2 rounded-md hover:bg-green-400 transition-colors active:bg-green-600;
	}

	.add-tag-button {
		@apply bg-neutral-800/20 p-0.5 px-1 rounded-sm text-sm hover:bg-neutral-800/30 transition-colors;
	}

	.task-actions {
		@apply flex items-center gap-x-1;
	}

	.task-container {
		@apply flex bg-neutral-400/30 transition-colors rounded-md p-1 px-2 shadow-md items-center;
	}

	.todo-list-container {
		@apply grid  w-full h-full  bg-neutral-700 rounded-md items-center justify-between overflow-x-hidden;
		grid-template-columns: 1fr;
	}

	.todo-list {
		@apply flex w-full h-full rounded-md flex-col items-center justify-between overflow-y-auto;
		grid-row: 1;
		grid-column: 1;
	}

	.tasks-container {
		@apply flex flex-col w-full mb-2 px-1 py-1 gap-y-1;
	}

	.add-task-button {
		@apply flex items-center justify-center bg-indigo-500 mb-2 w-8 h-8 p-2 rounded-md hover:bg-indigo-400 transition-colors active:bg-indigo-600;
	}

	.left-content {
		@apply flex flex-col w-full justify-center;
	}

	.add-button {
		@apply py-2 bg-indigo-500 w-60 flex items-center justify-center hover:bg-indigo-400 active:bg-indigo-600 transition-colors rounded-lg mt-4;
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
		@apply flex h-full gap-x-6 w-full;
	}

	.input-half {
		@apply flex-col gap-y-4;
	}

	.half {
		display: flex;
		width: 50%;
		height: 100%;
	}

	.modal-content {
		@apply flex gap-x-4 pt-4 h-full flex-col items-center;
	}

	.modal-container {
		@apply min-h-fit h-96 w-[544px] bg-neutral-800 flex px-4 py-2 rounded-md;
	}

	.close-button {
		@apply p-0.5 rounded-sm bg-slate-500/20 text-red-200 hover:text-red-400 transition-colors hover:bg-red-300/20;
	}

	.title {
		@apply text-neutral-300 font-semibold text-lg;
	}

	.topbar-container {
		@apply flex flex-col w-full;
	}

	.topbar-content {
		@apply flex justify-between;
	}

	.topbar-divider {
		@apply border-neutral-600/40 mt-2;
	}
</style>
