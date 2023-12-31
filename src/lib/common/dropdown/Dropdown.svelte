<script lang="ts">
	import { fade } from 'svelte/transition';
	import DropdownDivider from './DropdownDivider.svelte';
	import { clickOutside } from '$lib/utilities/directives/clickOutside';
	import DotsIcon from '$lib/assets/icons/DotsIcon.svelte';

	export let title = '';

	let active = false;

	const deactivateDropdown = () => {
		active = false;
	};
</script>

<div class="container" use:clickOutside on:clickoutside={deactivateDropdown}>
	<button
		class="button"
		class:active
		on:click={() => {
			active = !active;
		}}>
		<DotsIcon class="w-5 h-5" />
	</button>
	{#if active}
		<div class="dropdown" role="menu" transition:fade={{ duration: 50 }}>
			{#if title}
				<div class="heading">
					{#if $$slots.titleIcon}
						<span class="titleIconWrapper">
							<slot name="titleIcon" />
						</span>
					{/if}
					<p class="title">{title}</p>
				</div>
				<DropdownDivider />
			{/if}
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.title {
		@apply px-2 py-1 font-semibold;
	}

	.heading {
		@apply flex items-center pl-2 mt-1;
	}

	.button {
		@apply p-1 rounded-sm transition-colors min-w-[1.75rem] min-h-[1.75rem];
		@apply hover:bg-slate-100/20;
	}
	.active {
		@apply text-indigo-400;
	}
	.container {
		@apply relative;
		display: flex;
		height: fit-content;
		width: fit-content;
	}
	.dropdown {
		@apply absolute flex flex-col overflow-hidden;
		@apply w-44 mr-8 right-0;
		@apply rounded-md bg-slate-600;
	}
	.titleIconWrapper :global(svg) {
		@apply w-5 h-5;
	}
</style>
