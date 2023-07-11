<script>
	import Dropdown from '../../dropdown/Dropdown.svelte';
	import DropdownItem from '../../dropdown/DropdownItem.svelte';
	import WidgetContainer from '../WidgetContainer.svelte';
	import CurrencyItem from './CurrencyItem.svelte';
	import * as FlagIcons from 'svelte-flag-icons';

	// Base code, target code
</script>

<WidgetContainer title="Exchange rate" className="col-span-3 row-span-1">
	<Dropdown slot="dropdown" title="Settings" titleIcon="material-symbols:settings">
		<DropdownItem icon="pepicons-pop:dots-y">I dont know</DropdownItem>
		<DropdownItem icon="material-symbols:edit">Edit</DropdownItem>
		<DropdownItem icon="fe:list-bullet">Details</DropdownItem>
		<DropdownItem icon="pajamas:remove">Remove</DropdownItem>
	</Dropdown>
	<div class="head">
		<span>currency</span>
		<span class="center">value</span>
		<span class="center">trend</span>
		<span class="center">24h</span>
	</div>
	<hr class="main" />
	<div class="body">
		<CurrencyItem
			flagComponent={FlagIcons.Dk}
			dayChange={{ value: 4, positive: false }}
			currencyName="Dk"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Us}
			dayChange={{ value: 0, positive: true }}
			currencyName="USD"
			value={1}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Eu}
			dayChange={{ value: 65, positive: true }}
			currencyName="EUR"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Cz}
			dayChange={{ value: 125, positive: false }}
			currencyName="CZK"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Eu}
			dayChange={{ value: 65, positive: true }}
			currencyName="EUR"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Cz}
			dayChange={{ value: 125, positive: false }}
			currencyName="CZK"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Eu}
			dayChange={{ value: 65, positive: true }}
			currencyName="EUR"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Cz}
			dayChange={{ value: 125, positive: false }}
			currencyName="CZK"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Cz}
			dayChange={{ value: 125, positive: false }}
			currencyName="CZK"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
		<CurrencyItem
			flagComponent={FlagIcons.Cz}
			dayChange={{ value: 125, positive: false }}
			currencyName="CZK"
			value={12.4}
			chartData={{ something: 'smth' }}
		/>
		<hr />
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
		@apply grid grid-cols-4 text-xs font-medium text-slate-300;
		@apply mb-1;
	}
	.head span {
		@apply flex;
	}
	hr {
		@apply my-1 border-slate-800/40;
	}
</style>
