<script lang="ts">
	import HamburgerIcon from '$lib/assets/icons/HamburgerIcon.svelte';
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import { dashboardState } from '$lib/stores/dashboard.store';
	const handleClick = () => {
		$dashboardState.isMenuOpen = !$dashboardState.isMenuOpen;
	};
</script>

<div class="hamburger-container" class:active={$dashboardState.isMenuOpen}>
	<button
		class="hamburger"
		class:active={$dashboardState.isMenuOpen && !$dashboardState.isMenuOpenTemporary}
		on:click={handleClick}
		on:focus>
		<HamburgerIcon class="h-8 w-8 text-white" />
	</button>
	<p class="ml-4">Menu</p>
	{#if !$dashboardState.isMenuOpenTemporary}
		<button
			class="closing-chevron"
			on:click={handleClick}
			class:active={$dashboardState.isMenuOpen}>
			<CancelIcon class="w-8 h-full" />
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
