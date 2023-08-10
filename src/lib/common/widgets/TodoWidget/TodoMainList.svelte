<script lang="ts">
	import BinFillIcon from '$lib/assets/icons/BinFillIcon.svelte';
	import ChevronDownIcon from '$lib/assets/icons/ChevronDownIcon.svelte';
	import PencilIcon from '$lib/assets/icons/PencilIcon.svelte';
	import PlusIcon from '$lib/assets/icons/PlusIcon.svelte';

	export let closedContent = false;
	export let completedTasks: number;
	export let allTasks: number;
	export let title: string;

	const toggleContentState = () => (closedContent = !closedContent);
</script>

<div class="list-wrapper">
	<button class="main-button" on:click={toggleContentState}>
		<p class="text-xs mr-2">{completedTasks} / {allTasks}</p>
		<p>{title}</p>
		<ChevronDownIcon class="ml-2 transition-transform {closedContent ? 'rotate-90' : ''}" />
	</button>
	<div class="action-button-wrapper">
		<button class="action-button add">
			<PlusIcon class="icon add" />
		</button>
		<button class="action-button edit">
			<PencilIcon class="icon edit" />
		</button>
		<button class="action-button remove">
			<BinFillIcon class="icon remove" />
		</button>
	</div>
</div>

<style lang="postcss">
	.list-wrapper {
		@apply flex justify-between;
	}

	.action-button {
		@apply flex items-center justify-center rounded-sm transition-colors w-7 h-7 bg-slate-100/5;
	}

	.action-button:hover.add {
		@apply bg-green-300/10;
	}
	.action-button:hover.edit {
		@apply bg-yellow-300/10;
	}
	.action-button:hover.remove {
		@apply bg-rose-300/10;
	}

	:global(.icon) {
		@apply w-5 h-5 transition-colors;
	}

	:global(.icon.add) {
		@apply text-green-200;
	}
	:global(.action-button:hover > .add) {
		@apply text-green-400;
	}

	:global(.icon.edit) {
		@apply text-yellow-200;
	}
	:global(.action-button:hover > .edit) {
		@apply text-yellow-400;
	}

	:global(.icon.remove) {
		@apply text-rose-200;
	}
	:global(.action-button:hover > .remove) {
		@apply text-rose-400;
	}

	.main-button {
		@apply flex items-center mx-2 cursor-pointer w-fit px-2 py-1 rounded-md hover:bg-neutral-100/5 transition-colors;
	}

	.action-button-wrapper {
		@apply flex items-center w-fit gap-x-2 mr-4;
	}
</style>
