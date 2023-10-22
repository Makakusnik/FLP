<script lang="ts">
	import Modal from '$lib/common/modal/Modal.svelte';
	import ModalOverlay from '$lib/common/modal/ModalOverlay.svelte';
	import type { Order } from '../types';

	export let isOpened: boolean;
	export let handleClose: () => void;
	export let data: Order;
</script>

<Modal bind:isOpened>
	<ModalOverlay closeCallback={handleClose}>
		<div class="modal-container">
			{data.person.name}
		</div>
	</ModalOverlay>
</Modal>

<style lang="postcss">
	.modal-container {
		@apply flex flex-col max-h-96 h-full w-[544px] bg-neutral-800 px-4 py-2 rounded-md;
	}
</style>
