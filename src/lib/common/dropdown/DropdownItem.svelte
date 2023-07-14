<script lang="ts">
	import Icon from '@iconify/svelte';
	export let icon = '';
</script>

<button role="menuitem" class="item" on:click>
	<span class="icon">
		<Icon {icon} />
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

	.icon {
		@apply w-4 h-4 transition-colors;
	}
</style>
