<script lang="ts">
	import Unknown from '$lib/assets/icons/UnknownIcon.svelte';
</script>

<button role="menuitem" class="item" on:click>
	<span class="icon">
		<slot name="icon">
			<Unknown class="w-4 h-4 " />
		</slot>
	</span>
	<p class="text-slate-300">
		<slot default />
	</p>
</button>

<style lang="postcss">
	.item {
		@apply flex items-center justify-start px-2 py-1 transition-colors;
		@apply gap-x-2;
	}

	.item:hover {
		@apply bg-slate-100/5;
	}

	.item:hover > .icon {
		@apply text-indigo-400;
	}

	.icon :global(svg) {
		@apply w-4 h-4 transition-colors;
	}
</style>
