<script lang="ts">
	import CancelIcon from '$lib/assets/icons/CancelIcon.svelte';
	import Check from '$lib/assets/icons/Check.svelte';
	import { linear } from 'svelte/easing';
	import { draw, fade, fly } from 'svelte/transition';
	import { todoState } from '$lib/stores/widgets stores/todo.store';
	import type { TodoLabel } from './types';
	import Label from '$lib/common/misc/labels/Label.svelte';

	export let title = 'Unknown';
	export let subtitle = 'Unknown';
	export let labels: TodoLabel[] = [];

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
		} else {
			timeoutId = setTimeout(() => {
				isClosed = true;
				canceled = false;
			}, 1550);
		}
	};

	let handleLabelClick = () => {
		$todoState.areLabelsExpanded = !$todoState.areLabelsExpanded;
	};
</script>

{#if !isClosed}
	<li class="item" out:fly={{ x: 100 }}>
		{#if labels.length > 0}
			<button
				class="flex flex-wrap gap-y-1 gap-x-1 w-fit max-w-[12rem] h-full"
				on:click={handleLabelClick}>
				{#each labels as { text, textColor, color }}
					<Label {text} {color} {textColor} collapsed={$todoState.areLabelsExpanded} />
				{/each}
			</button>
		{/if}
		<div class="flex items-center">
			<button
				class="check-button relative"
				on:click={() => {
					shouldClose = !shouldClose;
					removeItem();
				}}
				on:mouseenter={() => {
					console.log('is canceled?', canceled);
					isHovering = true;
				}}
				on:mouseleave={() => {
					console.log('is canceled?', canceled);
					isHovering = false;
				}}>
				{#if !isHovering}
					<div class="absolute w-full h-full" out:fade|local={{ duration: 100 }}>
						{#if !shouldClose}
							<div class="check-wrapper" />
						{/if}
					</div>
				{/if}
				{#if shouldClose}
					<div class="absolute w-full h-full">
						<svg viewBox="0 0 46 46" class="text-blue-400">
							<defs>
								<path
									in:draw|local={{ duration: 1500, easing: linear }}
									fill="none"
									id="circle"
									stroke="currentcolor"
									stroke-width="6"
									d="M 0, 0
						m 0, 23
						a 23,23 0 1,0 46,0
						a 23,23 0 1,0 -46,0" />
								<clipPath id="clip">
									<use xlink:href="#circle" />
								</clipPath>
							</defs>
							<g>
								<use
									xlink:href="#circle"
									stroke="currentcolor"
									fill="none"
									clip-path="url(#clip)" />
							</g>
						</svg>
					</div>
				{/if}
				{#if isHovering || shouldClose}
					<span in:fade|local={{ duration: 100 }}>
						{#if !canceled}
							<Check class="w-4 h-4 text-blue-500" />
						{:else}
							<CancelIcon class="w-4 h-4 text-red-500" />
						{/if}
					</span>
				{/if}
			</button>
			<span class="heading">
				<p class="title">{title}</p>
				<p class="subtitle">{subtitle}</p>
			</span>
		</div>
	</li>
{/if}

<style lang="postcss">
	.item {
		@apply flex flex-col px-4 h-fit py-2 gap-y-2 bg-neutral-500/5 hover:bg-neutral-100/5 transition-colors cursor-pointer;
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
	.check-wrapper {
		@apply flex items-center rounded-full p-0.5 h-full w-full border-[2px] transition;
	}
	.check-button {
		@apply flex w-5 h-5 items-center justify-center;
	}
</style>
