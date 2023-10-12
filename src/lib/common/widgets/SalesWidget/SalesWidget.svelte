<script lang="ts">
	import BinFillIcon from '$lib/assets/icons/BinFillIcon.svelte';
	import DotsIcon from '$lib/assets/icons/DotsIcon.svelte';
	import ListIcon from '$lib/assets/icons/ListIcon.svelte';
	import PencilIcon from '$lib/assets/icons/PencilIcon.svelte';
	import SettingsIcon from '$lib/assets/icons/SettingsIcon.svelte';
	import Dropdown from '$lib/common/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/common/dropdown/DropdownItem.svelte';

	import WidgetContainer from '../WidgetContainer.svelte';
	import type { Order } from './types';

	export let data: Order[] = [];
</script>

<WidgetContainer title="Recent orders" className="col-span-2 row-span-2 isolate">
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
			<BinFillIcon slot="icon" />
			Remove
		</DropdownItem>
	</Dropdown>
	<div class="widget-content">
		<div class="item-container">
			{#each data as { items, id, person } (id)}
				{#each items as { quantity, boughtAtPrice, name }}
					<div class="item">
						<p class="productName" title={name}>{name}</p>
						<p class="price">{boughtAtPrice} $</p>
						<p class="quantity">{quantity}</p>
						<p class="person">{person.name}</p>
						<button class="action-button"><DotsIcon class="w-4 h-4" /></button>
					</div>
				{/each}
			{/each}
		</div>
	</div>
</WidgetContainer>

<style lang="postcss">
	.action-button {
		@apply ml-auto p-1 bg-neutral-300/20 hover:bg-neutral-300/40 transition-colors active:bg-neutral-200/40 mr-2 rotate-90;
	}
	.item {
		@apply flex bg-neutral-100/20 p-1.5 rounded-md;
	}

	.item-container {
		@apply flex flex-col w-full p-2 pr-4 h-screen overflow-y-scroll gap-y-1;
		min-height: 100%;
		height: 0;
	}

	.price {
		@apply max-w-[10ch] min-w-[10ch] pl-4 pr-2 text-right;
	}

	.productName {
		@apply whitespace-nowrap overflow-hidden text-ellipsis min-w-[25ch] max-w-[25ch];
	}

	.quantity {
		@apply max-w-[4ch] min-w-[4ch] text-right pr-2;
	}

	.person {
	}

	.widget-content {
		@apply flex w-full max-h-max h-full;
	}
</style>
