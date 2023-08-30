<script lang="ts">
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import Check from '$lib/assets/icons/Check.svelte';
	import DatePicker from '$lib/common/input/DatePicker.svelte';
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';

	export let isOpened: boolean;

	let nameFocus: boolean;
	const onFocusName = () => (nameFocus = true);
	const onBlurName = () => (nameFocus = false);

	let dateFocus: boolean;
	const onFocusDate = () => (dateFocus = true);
	const onBlurDate = () => {
		console.log('gay');

		dateFocus = false;
	};

	const handleClose = () => (isOpened = false);
</script>

<Modal bind:isOpened>
	<ModalOverlay on:click={handleClose}>
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
							<div class="todo-list">
								<div class="w-full h-full">x</div>
							</div>
						</div>
					</div>
					<button class="add-button"><Check /></button>
				</div>
			</div>
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.add-button {
		@apply py-2 bg-indigo-500 w-60 flex items-center justify-center hover:bg-indigo-400 transition-colors rounded-lg mt-4;
	}

	.input-container {
		@apply flex flex-col w-full gap-y-2;
	}

	.label {
		@apply uppercase font-semibold text-xs text-neutral-300/60 transition-all w-fit origin-left;
	}

	.focused-input {
		@apply text-indigo-300 scale-110;
	}

	.input {
		@apply w-full rounded-md h-8 text-black px-2;
	}

	.modal-form {
		@apply flex h-full gap-x-6 w-full;
	}

	.todo-list {
		@apply w-full bg-neutral-600 h-full rounded-md;
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
		@apply h-[360px] w-[544px] bg-neutral-800 flex px-4 py-2 rounded-md;
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
