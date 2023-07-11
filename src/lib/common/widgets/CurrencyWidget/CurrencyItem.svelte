<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	type ChartData = {
		something: string;
	};

	type DailyChange = {
		value: number;
		positive: boolean;
	};

	type C = $$Generic<typeof SvelteComponent<any, any, any>>;
	export let flagComponent: C extends typeof SvelteComponent<infer P extends Record<string, any>>
		? P
		: never;

	export let value = 0;
	export let currencyName: string;
	export let chartData: ChartData;
	export let dayChange: DailyChange;
</script>

<div class="item">
	<span class="currency"
		>{#if flagComponent}
			<svelte:component this={flagComponent} />
		{/if}
		<p>{currencyName}</p></span
	>
	<span><p>{value}</p></span>
	<span><p>{chartData.something}</p></span>
	<span
		><p>
			{#if dayChange.positive}
				+
			{:else}
				-
			{/if}
			{dayChange.value}
		</p></span
	>
</div>

<style lang="postcss">
	.item {
		@apply grid grid-cols-4 gap-x-2 text-sm px-1;
	}
	.item p {
		@apply flex justify-center;
	}
	.item .currency {
		@apply flex gap-x-2 items-center;
	}

	.item .currency p {
		@apply text-xs uppercase;
	}
</style>
