<script>
	import Icon from '@iconify/svelte';
	export let icon = '';
</script>

<button role="menuitem" class="item" on:click>
	<Icon {icon} class="icon" />
	<p class="text-slate-300">
		<slot default />
	</p>
</button>

<style>
	.item {
		@apply flex items-center justify-start px-2 py-1 transition-colors;
		@apply gap-x-2;
	}

	.item:hover {
		@apply bg-slate-100/5;
	}

	.item:hover > .icon {
		@apply w-10 text-indigo-500;
	}

	.icon {
		@apply w-4 h-4 transition-colors;
	}
</style>
