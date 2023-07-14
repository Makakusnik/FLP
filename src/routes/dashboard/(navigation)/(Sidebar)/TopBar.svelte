<script lang="ts">
	import { dashboardState } from '$lib/stores/dashboard.store';
	import Icon from '@iconify/svelte';
	const handleClick = () => {
		$dashboardState.isMenuOpen = !$dashboardState.isMenuOpen;
	};
</script>

<div class="hamburger-container" class:active={$dashboardState.isMenuOpen}>
	<button
		class="hamburger"
		class:active={$dashboardState.isMenuOpen && !$dashboardState.isMenuOpenTemporary}
		on:click={handleClick}
		on:focus
	>
		<Icon icon="ci:hamburger-lg" class="h-8 w-8" />
	</button>
	<p class="ml-4">Menu</p>
	{#if !$dashboardState.isMenuOpenTemporary}
		<button
			class="closing-chevron"
			on:click={handleClick}
			class:active={$dashboardState.isMenuOpen}
		>
			<Icon icon="iconoir:cancel" class="w-8 h-full" />
		</button>
	{/if}
</div>

<style lang="postcss">
	.hamburger {
		@apply w-12 p-2 hover:bg-slate-500/20 transition-colors;
	}

	.hamburger-container {
		@apply flex w-12 items-center justify-start overflow-hidden;
		transition: width 200ms ease-in-out;
	}

	.hamburger-container.active {
		@apply w-64;
	}

	.hamburger.active {
		@apply text-indigo-400;
	}

	.closing-chevron {
		@apply flex opacity-0 justify-center ml-auto w-12 h-full hover:bg-slate-700/40 transition-all duration-300;
		@apply hover:text-indigo-400;
	}

	.closing-chevron.active {
		@apply opacity-100;
	}
</style>
