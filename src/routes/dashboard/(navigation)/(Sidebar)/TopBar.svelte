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
		@apply w-12 p-2 bg-indigo-950 hover:bg-indigo-900/80 transition-colors;
	}

	.hamburger-container {
		@apply md:fixed flex w-12 items-center justify-start overflow-hidden;
		transition: width 200ms ease-in-out, background-color 200ms ease-in-out;
	}

	.hamburger-container.active {
		@apply w-64 bg-indigo-950;
	}

	.hamburger.active {
		@apply text-indigo-400 bg-indigo-950;
	}

	.closing-chevron {
		@apply flex opacity-0 justify-center p-2 ml-auto w-12 h-full hover:bg-slate-700/40 transition-all duration-300;
		@apply hover:text-indigo-400;
	}

	.closing-chevron.active {
		@apply opacity-100;
	}
</style>
