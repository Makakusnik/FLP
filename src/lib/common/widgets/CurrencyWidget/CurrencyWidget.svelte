<script lang="ts">
	import BinOutlineIcon from '$lib/assets/icons/BinOutlineIcon.svelte';
	import DotsIcon from '$lib/assets/icons/DotsIcon.svelte';
	import ListIcon from '$lib/assets/icons/ListIcon.svelte';
	import PencilIcon from '$lib/assets/icons/PencilIcon.svelte';
	import SettingsIcon from '$lib/assets/icons/SettingsIcon.svelte';
	import Dropdown from '../../dropdown/Dropdown.svelte';
	import DropdownItem from '../../dropdown/DropdownItem.svelte';
	import WidgetContainer from '../WidgetContainer.svelte';
	import CurrencyItem from './CurrencyItem.svelte';
	import type { Currency } from './types';

	export let data: Currency[];
</script>

<WidgetContainer title="Exchange rate" className="col-span-1 row-span-1 isolate">
	<Dropdown slot="dropdown" title="Settings">
		<SettingsIcon slot="titleIcon" />
		<DropdownItem>
			<DotsIcon slot="icon" />
			I dont know
		</DropdownItem>
		<DropdownItem>
			<PencilIcon slot="icon" />
			Edit
		</DropdownItem>
		<DropdownItem>
			<ListIcon slot="icon" />
			Details
		</DropdownItem>
		<DropdownItem>
			<BinOutlineIcon slot="icon" />
			Remove
		</DropdownItem>
	</Dropdown>
	<div class="head">
		<span>currency</span>
		<span class="center">value</span>
		<span class="center">trend</span>
		<span class="center">24h</span>
	</div>
	<hr class="main" />
	<div class="body -z-10">
		{#if data}
			{#each data as { dailyValues, flagComponent, name }, i}
				<CurrencyItem {name} {dailyValues} {flagComponent} />
				{#if i !== data.length - 1}
					<hr />
				{/if}
			{/each}
		{/if}
	</div>
</WidgetContainer>

<style lang="postcss">
	.body {
		@apply overflow-y-auto;
	}
	.main {
		@apply pb-1 border-t-2 border-slate-600;
	}

	.center {
		@apply justify-center;
	}
	.head {
		@apply grid text-xs font-medium text-slate-300;
		@apply mb-1;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.6fr) minmax(0, 1fr) minmax(0, 1fr);
	}
	.head span {
		@apply flex;
	}
	hr {
		@apply my-1 border-slate-800/40;
	}
</style>
