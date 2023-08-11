<script lang="ts">
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click>
	<slot />
</div>

<style lang="postcss">
	.modal-overlay {
		@apply w-screen h-screen bg-black/30 text-white;
	}
</style>
