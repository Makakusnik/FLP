<script lang="ts">
	import { dashboardState } from '$lib/stores/dashboard.store';
	const handleBlur = () => {
		if ($dashboardState.isMenuOpenTemporary) {
			$dashboardState.isMenuOpen = false;
			$dashboardState.isMenuOpenTemporary = false;
		}
	};
	const handleHover = () => {
		if ($dashboardState.isMenuOpen) {
			$dashboardState.isMenuOpen = true;
			$dashboardState.isMenuOpenTemporary = false;
		} else {
			$dashboardState.isMenuOpen = true;
			$dashboardState.isMenuOpenTemporary = true;
		}
	};
</script>

<nav
	class="sidebarContainer {$$props.class}"
	on:mouseenter={handleHover}
	class:active={$dashboardState.isMenuOpen}
	on:mouseleave={handleBlur}
	on:focus>
	<ul class="w-full">
		<slot />
	</ul>
</nav>

<style lang="postcss">
	.sidebarContainer {
		@apply hidden md:flex md:w-12 absolute h-screen bg-slate-800 overflow-hidden;
		transition: width 200ms ease-in-out;
	}

	.active {
		@apply w-64;
	}
</style>
