<script lang="ts">
	import ChevronDown from '$lib/assets/icons/ChevronDownIcon.svelte';
	import Unknown from '$lib/assets/icons/UnknownIcon.svelte';
	import { dashboardState } from '$lib/stores/dashboard.store';
	import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';

	export let active = false;
	let hasChildren = $$slots.children;

	$: {
		if (!$dashboardState.isMenuOpen) {
			active = false;
		}
	}

	const handleToggle = () => {
		if ($$slots.children) {
			active = !active;
		}
	};

	const customSlide = (node: Element, args: SlideParams): TransitionConfig => {
		if ($dashboardState.isMenuOpenTemporary) {
			return slide(node, { ...args, duration: 0 });
		} else {
			return $dashboardState.isMenuOpen ? slide(node, args) : slide(node, { ...args, duration: 0 });
		}
	};
</script>

<li>
	<div
		class="container"
		role="button"
		tabindex="0"
		on:click={handleToggle}
		on:keydown
		on:keyup
		on:keypress>
		<div class="flex items-center justify-center w-12 h-12">
			{#if $$slots.icon}
				<span class="flex justify-center items-center w-12 h-5">
					<slot name="icon" />
				</span>
			{:else}
				<Unknown class="flex w-12 h-5" />
			{/if}
		</div>
		<div class="flex flex-col w-full ml-4">
			<div class="title">
				<div class="flex w-full">
					<slot />
					{#if hasChildren}
						<ChevronDown
							class="w-5 h-5 ml-auto mr-2 transition-transform {active
								? 'rotate-0'
								: 'rotate-90'}" />
					{/if}
				</div>
			</div>
			{#if active}
				<ul class="content" in:customSlide={{ axis: 'y' }} out:customSlide={{ axis: 'y' }}>
					<slot name="children" />
				</ul>
			{/if}
		</div>
	</div>
</li>

<style lang="postcss">
	.container {
		@apply flex w-full h-fit bg-slate-800;
		@apply cursor-pointer;
	}

	.title {
		@apply flex justify-center items-center min-h-[3rem] whitespace-nowrap;
	}

	.content {
		@apply w-full;
	}
</style>
