<script lang="ts">
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';
	import ExampleConfirmation from './ExampleConfirmation.svelte';
	import { useModalState } from '$lib/common/modal/modalStore';
	import type { Confirmation, ConfirmationEvent } from '$lib/events/confirmations';

	export let isOpened: boolean;
	export let close: () => void;

	let confirmationState: Confirmation;

	let {
		isOpened: isOpenedConfirmation,
		close: closeConfirmation,
		open: openConfirmation
	} = useModalState();

	const handleCustomClose = () => {
		if (confirmationState === 'confirm') {
			close();
		}
	};

	const handleResolve = (e: ConfirmationEvent) => {
		confirmationState = e.detail;
		closeConfirmation();
	};
</script>

<Modal bind:isOpened>
	<ModalOverlay closeCallback={handleCustomClose}>
		<div class="modal-container">
			<button on:click={openConfirmation}>Open confirmation 2</button>
			{#if isOpenedConfirmation}
				<ExampleConfirmation
					on:resolve={handleResolve}
					close={closeConfirmation}
					isOpened={$isOpenedConfirmation} />
			{/if}
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.modal-container {
		@apply flex flex-col max-h-[350px] h-full w-[350px] bg-neutral-800 px-4 py-2 rounded-md;
	}
</style>
