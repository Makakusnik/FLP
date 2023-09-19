<script lang="ts">
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import { linear } from 'svelte/easing';
	import { draw, fade, slide } from 'svelte/transition';
	import TickIcon from '$lib/assets/icons/TickIcon.svelte';

	export let name = 'Unknown';
	export let remove: () => void;

	let shouldClose = false;
	let isHovering = false;
	let isClosed = false;
	let canceled = false;
	let timeoutId: NodeJS.Timeout;

	const removeItem = async () => {
		if (!shouldClose) {
			if (timeoutId) clearTimeout(timeoutId);
			canceled = true;
			setTimeout(() => {
				canceled = false;
			}, 1000);
			remove();
		} else {
			timeoutId = setTimeout(() => {
				isClosed = true;
				canceled = false;
				remove();
			}, 1550);
		}
	};

	let handleRemoveClick = () => {
		shouldClose = !shouldClose;
		removeItem();
	};

	let handleButtonMouseEnter = () => (isHovering = true);
	let handleButtonMouseLeave = () => (isHovering = false);
</script>

{#if !isClosed}
	<li class="item" transition:slide|global>
		<div class="check-button-wrapper">
			<button
				class="check-button"
				on:click={handleRemoveClick}
				on:mouseenter={handleButtonMouseEnter}
				on:mouseleave={handleButtonMouseLeave}>
				{#if !isHovering && !shouldClose}
					<div class="circle" />
				{/if}
				{#if shouldClose}
					<svg viewBox="0 0 49 49" class="absolute w-full h-full text-blue-400">
						<path
							in:draw={{ duration: 1500, easing: linear }}
							fill="none"
							id="circle-{name}"
							stroke="currentcolor"
							stroke-width="3"
							d="M 0, 0m 0, 23a 23,23 0 1,0 46,0a 23,23 0 1,0 -46,0" />
					</svg>
				{/if}
				{#if isHovering || shouldClose}
					<span in:fade|local={{ duration: 100 }}>
						{#if !canceled}
							<TickIcon class="w-4 h-4 text-blue-500" />
						{:else}
							<CancelIcon class="w-4 h-4 text-red-500" />
						{/if}
					</span>
				{/if}
			</button>
			<span class="heading">
				<p class="title">{name}</p>
			</span>
		</div>
	</li>
{/if}

<style lang="postcss">
	.item {
		@apply flex flex-col px-4 h-fit w-[90%] rounded-lg py-3 gap-y-2 bg-neutral-500/5 hover:bg-neutral-100/5 transition-colors cursor-pointer;
		list-style-type: none;
	}

	.heading {
		@apply flex flex-col pl-2;
	}
	.title {
		@apply text-blue-500 font-semibold leading-[1.0] pl-1;
	}

	.subtitle {
		@apply text-neutral-400 text-xs leading-[1.0] pl-1;
	}
	.circle {
		@apply flex items-center rounded-full p-0.5 h-full w-full border-[2px];
	}
	.check-button {
		@apply flex w-5 h-5 items-center justify-center relative;
	}

	.check-button-wrapper {
		@apply flex items-center;
	}
</style>
