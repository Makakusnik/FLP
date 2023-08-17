<script lang="ts">
	import ChevronDownIcon from '$lib/assets/icons/ChevronDownIcon.svelte';
	import ChevronLeftIcon from '$lib/assets/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/assets/icons/ChevronRightIcon.svelte';
	import { fade } from 'svelte/transition';
	import updateLocalePlugin from 'dayjs/plugin/updateLocale';
	import dayjs, { Dayjs } from 'dayjs';
	import weekDayPlugin from 'dayjs/plugin/weekday';
	import dayjsSkLocale from 'dayjs/locale/sk';
	import YearView from './YearView.svelte';
	import DayCells from './DayCells.svelte';
	import { createEventDispatcher } from 'svelte';

	export let name: string;

	const dispatch = createEventDispatcher<{ datechange: Dayjs }>();

	function dateChangeDispatcher(changedDate: Dayjs) {
		dispatch('datechange', changedDate);
	}
	dayjs.extend(updateLocalePlugin);
	dayjs.extend(weekDayPlugin);
	dayjs.locale('sk');

	const days: string[] = dayjsSkLocale.weekdaysMin || [];

	let selectedDate: Dayjs;
	let dateInView = dayjs();

	let isYearViewOpen = false;

	let increasedEffect = false;
	let decreasedEffect = false;

	const handleOpenYearView = () => (isYearViewOpen = !isYearViewOpen);

	const selectDate = (newDate: Dayjs) => {
		selectedDate = newDate;
		dateChangeDispatcher(newDate);
	};

	const increaseMonthOffset = () => {
		increasedEffect = true;
		dateInView = dateInView.add(1, 'month');
	};
	const decreaseMonthOffset = () => {
		decreasedEffect = true;
		dateInView = dateInView.subtract(1, 'month');
	};

	const handleSelectYear = (year: number) => () => (dateInView = dateInView.set('year', year));
</script>

<label for={name}><slot /></label>
<input id={name} type="text" />
<div class="absolute">
	<div class="calendar-container relative isolate" role="dialog">
		<div class="top-list relative z-10">
			<div class="select" on:click={handleOpenYearView} role="presentation" aria-live="polite">
				{#key dateInView}
					<p in:fade>{`${dateInView.format('MMMM')} ${dateInView.format('YYYY')}`}</p>
				{/key}
				<button
					type="button"
					class="expand-button"
					aria-label="Calendar is opened switch to year view."
					><ChevronDownIcon
						class="w-5 h-5 transition-transform {isYearViewOpen ? 'rotate-180' : ''}" /></button>
			</div>
			{#if isYearViewOpen}
				<YearView {handleSelectYear} year={dateInView.get('year')} />
			{/if}
			{#if !isYearViewOpen}
				<div class="month-buttons" transition:fade={{ duration: 100 }}>
					<button
						type="button"
						on:click={decreaseMonthOffset}
						title="Previous month"
						aria-label="Previous month">
						<ChevronLeftIcon class="w-5 h-5" />
					</button>
					<button
						type="button"
						on:click={increaseMonthOffset}
						title="Next month"
						aria-label="Next month">
						<ChevronRightIcon class="w-5 h-5" />
					</button>
				</div>
			{/if}
		</div>
		<div class="content" role="grid" aria-labelledby={name}>
			<div class="day-headers" role="row">
				{#each days as _, index}
					<span role="columnheader" aria-label={dayjs().weekday(index).format('dddd')}
						>{days[dayjs().weekday(index).get('d')]}</span>
				{/each}
			</div>
			<div class="grid h-fit" role="presentation">
				<DayCells
					bind:increasedEffect
					bind:decreasedEffect
					{selectDate}
					{dateInView}
					{increaseMonthOffset}
					{decreaseMonthOffset}
					{selectedDate} />
			</div>
		</div>
		<div>tabs</div>
	</div>
</div>

<style lang="postcss">
	.content {
		@apply grid flex-col items-center justify-center;
	}

	.day-headers {
		@apply grid gap-x-1 h-full mt-2;
		grid-template-columns: repeat(7, 1fr);
	}

	.day-headers span {
		@apply uppercase font-semibold w-8 h-4 text-xs text-neutral-400;
		@apply flex justify-center items-center;
	}

	.expand-button {
		@apply hover:bg-neutral-700 transition-colors flex justify-center items-center p-2 rounded-full;
	}

	.expand-button:focus {
		@apply bg-neutral-600;
	}

	.month-buttons {
		@apply flex ml-auto items-center mr-4 gap-x-4;
	}

	.month-buttons button {
		@apply hover:bg-neutral-700 p-2 rounded-full transition-colors;
	}

	.month-buttons button:focus {
		@apply bg-neutral-600;
	}

	.select {
		@apply min-w-[10rem] px-1 py-1 items-center h-fit rounded-md m-1 cursor-pointer;
		@apply relative flex justify-between;
	}

	.select p {
		@apply font-medium px-4 py-1 transition-colors rounded-xl capitalize;
	}

	.calendar-container {
		@apply flex flex-col bg-neutral-800 h-96 w-80 rounded-md overflow-hidden;
	}

	.top-list {
		@apply flex;
	}
</style>
