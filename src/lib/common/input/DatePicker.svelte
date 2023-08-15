<script lang="ts">
	import ChevronDownIcon from '$lib/assets/icons/ChevronDownIcon.svelte';
	import ChevronLeftIcon from '$lib/assets/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/assets/icons/ChevronRightIcon.svelte';
	import { fade } from 'svelte/transition';
	import updateLocalePlugin from 'dayjs/plugin/updateLocale';
	import dayjs, { Dayjs } from 'dayjs';
	import weekDayPlugin from 'dayjs/plugin/weekday';
	import dayjsSkLocale from 'dayjs/locale/sk';
	import YearSelection from './YearSelection.svelte';
	dayjs.extend(updateLocalePlugin);
	dayjs.extend(weekDayPlugin);
	dayjs.locale('sk');

	const days: string[] = dayjsSkLocale.weekdaysMin || [];

	const isToday = (day: number, currentDate: Dayjs) => {
		return (
			currentDate.format('M.YYYY') === dayjs().format('M.YYYY') &&
			day === Number(dayjs().format('D'))
		);
	};

	const isSelected = (day: number, currentDate: Dayjs, selectedDate: Dayjs) => {
		if (!selectedDate) return false;
		return (
			currentDate.format('M.YYYY') === selectedDate.format('M.YYYY') &&
			day === Number(selectedDate.format('D'))
		);
	};

	let selectedDate: Dayjs;
	let currentDateInView = dayjs();
	let monthBeforeSelectedDate: Dayjs;
	let monthAfterSelectedDate: Dayjs;

	$: {
		monthBeforeSelectedDate = currentDateInView.set('month', currentDateInView.get('month') - 1);
		monthAfterSelectedDate = currentDateInView.set('month', currentDateInView.get('month') + 1);
	}

	let selectedMonthYear: string;
	$: selectedMonthYear = `${currentDateInView.format('MMMM')} ${currentDateInView.format('YYYY')}`;

	let isSelectOpen = false;

	let monthStartDaysOffset: number;
	let monthEndDaysOffset: number;
	$: {
		const startNumber = Number(currentDateInView.startOf('month').format('d')) - 1;

		monthStartDaysOffset = startNumber < 0 ? 6 : startNumber;
		// 42 is number of tiles in calendar (6 rows * 7 columns)
		monthEndDaysOffset = 42 - (monthStartDaysOffset + currentDateInView.daysInMonth());
	}

	const handleOpenSelect = () => (isSelectOpen = !isSelectOpen);

	const increaseMonthOffset = () => (currentDateInView = currentDateInView.add(1, 'month'));
	const decreaseMonthOffset = () => (currentDateInView = currentDateInView.subtract(1, 'month'));

	const selectDate = (day: number, dateInView: Dayjs) => (event: MouseEvent) => {
		selectedDate = dateInView.set('date', day);
		console.log('Selected!:', selectedDate.format('DD.MM.YYYY'));
	};

	const selectDateMonthBefore = (day: number, dateInView: Dayjs) => () => {
		selectedDate = dateInView.set('date', day);

		decreaseMonthOffset();
	};

	const selectDateMonthAfter = (day: number, dateInView: Dayjs) => () => {
		selectedDate = dateInView.set('date', day);
		increaseMonthOffset();
	};
</script>

<input type="text" />
<div class="absolute">
	<div class="calendar-container relative">
		<div class="top-list relative">
			<div class="select-container" on:click={handleOpenSelect}>
				{#key selectedMonthYear}
					<p class="select-text" in:fade>{selectedMonthYear}</p>
				{/key}
				<button class="expand-button"
					><ChevronDownIcon
						class="w-5 h-5 transition-transform {isSelectOpen ? 'rotate-180' : ''}" /></button>
			</div>
			{#if isSelectOpen}
				<YearSelection bind:offsetDate={currentDateInView} />
			{/if}
			{#if !isSelectOpen}
				<div class="month-buttons" transition:fade={{ duration: 100 }}>
					<button on:click={decreaseMonthOffset}>
						<ChevronLeftIcon class="w-5 h-5" />
					</button>
					<button on:click={increaseMonthOffset}>
						<ChevronRightIcon class="w-5 h-5" />
					</button>
				</div>
			{/if}
		</div>
		<div class="content">
			<div class="day-headers">
				{#each days as _, index}
					<span>{days[dayjs().weekday(index).get('d')]}</span>
				{/each}
			</div>
			<div class="day-cells">
				{#each Array(monthStartDaysOffset) as _, index}
					<button
						class="month-outside"
						on:click={selectDateMonthBefore(
							Number(monthBeforeSelectedDate.endOf('month').format('D')) -
								monthStartDaysOffset +
								index +
								1,
							monthBeforeSelectedDate
						)}
						>{Number(monthBeforeSelectedDate.endOf('month').format('D')) -
							monthStartDaysOffset +
							index +
							1}
					</button>
				{/each}
				{#each Array(currentDateInView.daysInMonth()) as _, index}
					<button
						class:current={isToday(index + 1, currentDateInView)}
						class:selected={isSelected(index + 1, currentDateInView, selectedDate)}
						on:click={selectDate(index + 1, currentDateInView)}>{index + 1}</button>
				{/each}
				{#each Array(monthEndDaysOffset) as _, index}
					<button
						class="month-outside"
						on:click={selectDateMonthAfter(
							Number(monthAfterSelectedDate.startOf('month').format('D')) + index,
							monthAfterSelectedDate
						)}
						>{Number(monthAfterSelectedDate.startOf('month').format('D')) + index}
					</button>
				{/each}
			</div>
		</div>

		<div>tabs</div>
	</div>
</div>

<style lang="postcss">
	.content {
		@apply flex flex-col items-center justify-center;
	}

	.day-headers {
		@apply grid gap-x-2 w-[80%] h-full justify-center mt-2;
		grid-template-columns: repeat(7, 1fr);
	}

	.day-headers span {
		@apply uppercase font-semibold w-8 h-8 text-xs text-neutral-400;
		@apply flex justify-center;
	}

	.day-cells {
		@apply grid w-[80%] h-full gap-2 justify-center mt-4;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(6, 1fr);
	}

	.day-cells .month-outside {
		@apply text-neutral-600;
	}

	.day-cells button {
		@apply flex justify-center items-center text-sm font-medium cursor-pointer w-8 h-8 hover:bg-neutral-600/40 rounded-sm;
	}

	.day-cells .current {
		@apply bg-indigo-500;
	}

	.day-cells .selected {
		@apply bg-indigo-600 shadow-inner;
	}

	.expand-button {
		@apply hover:bg-neutral-700 transition-colors flex justify-center items-center p-2 rounded-full;
	}

	.month-buttons {
		@apply flex ml-auto items-center mr-4 gap-x-4;
	}

	.month-buttons button {
		@apply hover:bg-neutral-700 p-2 rounded-full transition-colors;
	}

	.select-text {
		@apply font-medium px-4 py-1 transition-colors rounded-xl capitalize;
	}

	.select-container {
		@apply min-w-[10rem] px-1 py-1 items-center h-fit rounded-md m-1 cursor-pointer;
		@apply relative flex justify-between;
	}

	.calendar-container {
		@apply flex flex-col bg-neutral-800 h-96 w-80 rounded-md overflow-hidden;
	}

	.top-list {
		@apply flex;
	}
</style>
