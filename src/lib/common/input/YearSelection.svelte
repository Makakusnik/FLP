<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let offsetDate: Dayjs;

	const years = Array(150);
	for (let i = 0; i < years.length; i++) {
		years[i] = 1900 + i;
	}

	let yearContainerRef: HTMLElement;
	let currentYearNode: HTMLSpanElement | null;
	let yearOffsetPadding = 120;

	onMount(() => {
		currentYearNode = document?.getElementById(`y-${offsetDate.get('year')}`);
		let yearOffsetInPx = currentYearNode?.offsetTop || 0;
		yearContainerRef.scrollTo({ top: yearOffsetInPx - yearOffsetPadding });
	});

	const handleSelectYear = (year: number) => () => (offsetDate = offsetDate.set('year', year));
</script>

<div bind:this={yearContainerRef} class="select-content" transition:fade={{ duration: 100 }}>
	{#each years as year}
		<button
			id="y-{year}"
			class:active={year === offsetDate.get('year')}
			on:click={handleSelectYear(year)}>{year}</button>
	{/each}
</div>

<style lang="postcss">
	.select-content {
		@apply flex gap-2 py-2 overflow-y-auto h-[21rem] justify-center items-center absolute w-full flex-wrap top-full left-0 bg-neutral-900 scroll-mt-20;
	}

	.select-content > button {
		@apply flex p-2 cursor-pointer hover:bg-neutral-700 transition-colors rounded-lg;
	}

	.select-content > .active {
		@apply bg-indigo-600 transition-colors hover:bg-indigo-500;
	}
</style>
