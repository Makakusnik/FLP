<script lang="ts">
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';
	import type { ConfirmationEventMap } from '$lib/events/confirmations';
	import { createEventDispatcher } from 'svelte';

	export let isOpened: boolean;
	export let close: () => void;
	createEventDispatcher;
	const eventDispatcher = createEventDispatcher<ConfirmationEventMap>();

	const handleResolve = () => eventDispatcher('resolve', 'confirm');
	const handleReject = () => eventDispatcher('resolve', 'discard');
	const handleCancel = () => eventDispatcher('resolve', 'cancel');
</script>

<Modal bind:isOpened>
	<ModalOverlay closeCallback={close}>
		<div class="modal-container">
			<button on:click={handleResolve}>Confirm</button>
			<button on:click={handleReject}>Discard</button>
			<button on:click={handleCancel}>Cancel</button>
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.modal-container {
		@apply flex flex-col max-h-[350px] h-full w-[350px] bg-neutral-800 px-4 py-2 rounded-md;
	}
</style>
