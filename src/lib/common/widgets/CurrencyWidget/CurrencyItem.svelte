<script lang="ts">
	import CaretDown from '$lib/assets/icons/CaretDownIcon.svelte';
	import CurrencyChart from '$lib/common/charts/CurrencyChart.svelte';
	import type { CurrencyFluctuation } from '$lib/types/currency';
	import type { SvelteComponent } from 'svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type C = $$Generic<typeof SvelteComponent<any, any>>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let flagComponent: C extends typeof SvelteComponent<infer P extends Record<string, any>>
		? P
		: never;

	export let name: string;
	export let dailyValues: number[];

	let isRendered = false;
	const originalValue = dailyValues[0];
	const currentValue = dailyValues[dailyValues.length - 1];

	const change = Number((originalValue - currentValue).toFixed(2));

	let fluctuation: CurrencyFluctuation;
	if (change > 0.0) {
		fluctuation = 'decrease';
	} else if (change < 0.0) {
		fluctuation = 'increase';
	} else {
		fluctuation = 'no change';
	}
	let changePercentage = (Math.abs(change) / originalValue).toFixed(2);
	if (changePercentage === '0' && fluctuation !== 'no change') {
		changePercentage = '0.01';
	}
</script>

<div class="item" class:hidden={!isRendered}>
	<span class="currency"
		>{#if flagComponent}
			<svelte:component this={flagComponent} class="w-6 h-6" />
		{/if}
		<p>{name}</p></span>
	<span class="flex items-center justify-center h-full w-full"
		><p class="w-12">{currentValue}</p></span>
	<span class="chart"
		><CurrencyChart
			onComplete={() => {
				isRendered = true;
			}}
			currencyData={dailyValues} /></span>
	<span
		class="changeWrapper"
		class:positive={fluctuation === 'increase'}
		class:negative={fluctuation === 'decrease'}
		class:stable={fluctuation === 'no change'}>
		{#if fluctuation === 'no change'}
			<p class="w-full mx-auto">-</p>
		{:else}
			<CaretDown class="flex items-center justify-center w-3 h-3" />
			<p>
				{changePercentage} %
			</p>
		{/if}
	</span>
</div>

<style lang="postcss">
	.hidden {
		@apply opacity-0;
	}
	.chart {
		@apply flex px-2 w-20 items-center mx-auto;
	}
	.item {
		@apply grid grid-cols-4 gap-x-2 text-sm px-1;
	}
	.item p {
		@apply flex justify-center;
	}
	.currency {
		@apply flex gap-x-2 items-center;
	}
	.currency p {
		@apply text-xs uppercase;
	}
	.positive {
		@apply text-green-300;
	}
	.negative {
		@apply text-rose-300;
	}

	.changeWrapper {
		@apply flex items-center gap-x-1 font-semibold mx-auto  w-fit;
	}

	.positive :global(svg) {
		@apply rotate-180 text-green-400;
	}

	.negative :global(svg) {
		@apply text-rose-400;
	}
	.stable {
		@apply text-yellow-200;
	}
	.stable :global(svg) {
		@apply text-transparent;
	}
</style>
