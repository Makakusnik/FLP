<script lang="ts">
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';
	import type { Confirmation } from '$lib/events/confirmations';
	import { createEventDispatcher } from 'svelte';

	export let isOpened: boolean;
	export let close: () => void;

	const eventDispatcher = createEventDispatcher<{ resolve: Confirmation }>();

	const handleResolve = () => eventDispatcher('resolve', 'confirm');
	const handleReject = () => eventDispatcher('resolve', 'discard');
	const handleCancel = () => eventDispatcher('resolve', 'cancel');
</script>

<Modal bind:isOpened>
	<ModalOverlay closeCallback={close}>
		<div class="modal-container">
			<button on:click={handleResolve} class="bg-green-500 hover:bg-green-400 active:bg-green-300"
				>True</button>
			<button on:click={handleReject} class="bg-rose-500 hover:bg-rose-400 active:bg-rose-300"
				>False</button>
			<button
				on:click={handleCancel}
				class="bg-neutral-500 hover:bg-neutral-400 active:bg-neutral-300">Cancel</button>
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.modal-container {
		@apply flex flex-col max-h-[350px] h-full w-[350px] bg-neutral-800 px-4 py-2 rounded-md;
	}
	button {
		@apply flex w-fit justify-center px-4 py-2 transition-colors rounded-md;
	}
</style>
