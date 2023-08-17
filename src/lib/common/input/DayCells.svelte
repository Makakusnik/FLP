<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { Day } from './types';
	import { generateDaysInView, isSelected, isToday } from './utils';
	import { modulo } from '$lib/utilities/calculations';

	export let dateInView: Dayjs;

	export let selectedDate: Dayjs;
	export let decreaseMonthOffset: () => void;
	export let increaseMonthOffset: () => void;
	export let increasedEffect: boolean;
	export let decreasedEffect: boolean;
	export let selectDate: (newDate: Dayjs) => void;

	let daysInView: Day[][];

	$: {
		const monthStartDaysOffset = modulo(dateInView.startOf('month').get('d') - 1, 7);

		// 42 is number of tiles in calendar (6 rows * 7 columns)
		const monthEndDaysOffset = 42 - (monthStartDaysOffset + dateInView.daysInMonth());

		// Get number of last day in month before
		const numOfDaysBefore = dateInView
			.set('month', dateInView.get('month') - 1)
			.endOf('month')
			.get('D');

		const numOfDaysInCurrent = dateInView.daysInMonth();
		daysInView = generateDaysInView(
			monthStartDaysOffset,
			numOfDaysBefore,
			numOfDaysInCurrent,
			monthEndDaysOffset
		);
	}

	const updateDate = (day: number, dateInView: Dayjs) => () =>
		selectDate(dateInView.set('date', day));

	const selectDateMonthAfter = (day: number) => () => {
		selectedDate = dateInView.set('month', dateInView.get('month') + 1).set('date', day);
		increaseMonthOffset();
	};

	const selectDateMonthBefore = (day: number) => () => {
		selectedDate = dateInView.set('month', dateInView.get('month') - 1).set('date', day);
		decreaseMonthOffset();
	};
</script>

{#key dateInView}
	<div
		class="hack"
		role="presentation"
		in:fly={{ x: increasedEffect ? '320' : '-320', duration: 400, opacity: 0, easing: cubicOut }}
		out:fly={{ x: decreasedEffect ? '320' : '-320', duration: 400, opacity: 0, easing: cubicOut }}
		on:outroend={() => {
			increasedEffect = false;
			decreasedEffect = false;
		}}>
		<div class="day-cells" role="rowgroup">
			{#each daysInView as innerArray, index}
				<div class="row" role="row" aria-rowindex={index + 1}>
					{#each innerArray as { type, value }, index}
						{#if type === 'before'}
							<button
								type="button"
								role="gridcell"
								class="outside"
								tabindex="-1"
								aria-colindex={index + 1}
								aria-selected="false"
								on:click={selectDateMonthBefore(value)}
								>{value}
							</button>
						{/if}
						{#if type === 'current'}
							<button
								type="button"
								role="gridcell"
								class:current={isToday(value, dateInView)}
								class:selected={isSelected(value, dateInView, selectedDate)}
								tabindex={Number(
									isSelected(value, dateInView, selectedDate) || isToday(value, dateInView)
								) - 1}
								aria-colindex={index + 1}
								aria-selected={isSelected(value, dateInView, selectedDate)}
								on:click={updateDate(value, dateInView)}>
								{value}
							</button>
						{/if}
						{#if type === 'after'}
							<button
								type="button"
								role="gridcell"
								class="outside"
								tabindex="-1"
								aria-colindex={index + 1}
								on:click={selectDateMonthAfter(value)}>
								{value}
							</button>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
{/key}

<style lang="postcss">
	.hack {
		grid-row: 1;
		grid-column: 1;
	}
	.day-cells {
		@apply grid w-[80%] h-full gap-y-1 mt-2;
		grid-template-rows: repeat(6, 1fr);
	}

	.row {
		@apply grid w-full h-full gap-x-1 justify-center;
		grid-template-columns: repeat(7, 1fr);
	}

	.outside {
		@apply text-neutral-600;
	}

	button {
		@apply flex justify-center items-center text-sm font-medium cursor-pointer w-8 h-8 rounded-sm;
	}

	button:hover {
		@apply bg-neutral-600/40;
	}

	.selected {
		@apply bg-indigo-600;
	}

	.selected:focus {
		@apply bg-indigo-500;
	}

	.selected:hover {
		@apply bg-indigo-500;
	}

	button:focus {
		@apply bg-indigo-500/60;
	}

	.current {
		@apply outline outline-1;
	}
</style>
