<script lang="ts">
	import Dropdown from '$lib/common/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/common/dropdown/DropdownItem.svelte';
	import DatePicker from '$lib/common/input/DatePicker.svelte';
	import DatePickerContainer from '$lib/common/input/DatePickerContainer.svelte';
	import CurrencyWidget from '$lib/common/widgets/CurrencyWidget/CurrencyWidget.svelte';
	import TodoWidget from '$lib/common/widgets/TodoWidget/TodoWidget.svelte';
	import WidgetContainer from '$lib/common/widgets/WidgetContainer.svelte';
	import type { Dayjs } from 'dayjs';
	export let data;
	const { currencyWidgetData, todoWidgetData } = data;

	const handleDateChange = (data: CustomEvent<Dayjs>) => {};
</script>

<main class="h-full w-full">
	<div class="view">
		<div class="content">
			<WidgetContainer>
				<Dropdown slot="dropdown" title="Settings">
					<DropdownItem>I dont know</DropdownItem>
					<DropdownItem>Edit</DropdownItem>
					<DropdownItem>Details</DropdownItem>
					<DropdownItem>Remove</DropdownItem>
				</Dropdown>
			</WidgetContainer>
			<CurrencyWidget data={currencyWidgetData} />
			<TodoWidget data={todoWidgetData} />
			<WidgetContainer className="row-span-2">
				<DatePickerContainer on:datechange={handleDateChange} name="datum" />
			</WidgetContainer>
			<WidgetContainer className="row-span-1" />
			<WidgetContainer className="row-span-1" />
			<WidgetContainer className="row-span-1" />
			<WidgetContainer className="row-span-1">8</WidgetContainer>
			<WidgetContainer className="row-span-1">9</WidgetContainer>
			<WidgetContainer className="row-span-1">10</WidgetContainer>
			<WidgetContainer className="row-span-1">11</WidgetContainer>
			<WidgetContainer className="row-span-1">12</WidgetContainer>
			<WidgetContainer className="row-span-1">13</WidgetContainer>
			<WidgetContainer>14</WidgetContainer>
			<WidgetContainer className="row-span-1">15</WidgetContainer>
			<WidgetContainer className="row-span-1">16</WidgetContainer>
			<WidgetContainer className="row-span-1">17</WidgetContainer>
			<WidgetContainer className="row-span-1">18</WidgetContainer>
			<WidgetContainer className="row-span-1">19</WidgetContainer>
			<WidgetContainer className="row-span-1">20</WidgetContainer>
			<WidgetContainer className="row-span-1">21</WidgetContainer>
			<WidgetContainer className="row-span-1" />
			<WidgetContainer className="row-span-1">23</WidgetContainer>
			<WidgetContainer className="row-span-1">24</WidgetContainer>
		</div>
	</div>
</main>

<style lang="postcss">
	.view {
		@apply md:pl-12;
	}
	.content {
		@apply grid p-4 gap-4 bg-slate-900;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		grid-auto-rows: minmax(0, 16rem);
	}
</style>
