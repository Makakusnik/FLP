<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { Day } from './types';
	import {
		generateDaysInView,
		addWeek,
		subtractDay,
		addDay,
		subtractWeek,
		getDate,
		arrowKeyCodes
	} from './utils';
	import { modulo } from '$lib/utilities/calculations';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let dateInView: Dayjs;
	export let decreaseMonthOffset: () => void;
	export let increaseMonthOffset: () => void;
	export let increasedEffect: boolean;
	export let decreasedEffect: boolean;
	export let firstButtonRef: HTMLElement;
	export let nextMonthButtonRef: HTMLElement;
	export let selectedDate: Dayjs | null = null;

	const today = dayjs();

	let daysInView: Day[][];
	let dayViewRef: HTMLElement;
	let focusedDate: Dayjs = today;

	let elementToFocus: HTMLElement | null;

	$: {
		const monthStartDaysOffset = modulo(dateInView.startOf('month').get('d') - 1, 7);

		const monthEndDaysOffset = 42 - (monthStartDaysOffset + dateInView.daysInMonth()); // 42 is number of tiles in calendar (6 rows * 7 columns)

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

	onMount(() => {
		dayViewRef?.addEventListener('keydown', navigationHandler);
	});

	onDestroy(() => {
		dayViewRef?.removeEventListener('keydown', navigationHandler);
	});

	const navigationHandler = (event: KeyboardEvent) => {
		if (!focusedDate) return;
		if ([...arrowKeyCodes, 'Tab'].includes(event.key)) event.preventDefault();

		if (event.key === 'ArrowDown') {
			focusedDate = addWeek(focusedDate);
			if (focusedDate.isAfter(dateInView, 'month')) increaseMonthOffset();
		} else if (event.key === 'ArrowUp') {
			focusedDate = subtractWeek(focusedDate);
			if (focusedDate.isBefore(dateInView, 'month')) decreaseMonthOffset();
		} else if (event.key === 'ArrowLeft') {
			focusedDate = subtractDay(focusedDate);
			if (focusedDate.isBefore(dateInView, 'month')) decreaseMonthOffset();
		} else if (event.key === 'ArrowRight') {
			focusedDate = addDay(focusedDate);
			if (focusedDate.isAfter(dateInView, 'month')) increaseMonthOffset();
		} else if (event.shiftKey && event.key === 'Tab') {
			nextMonthButtonRef.focus();
		} else if (event.key === 'Tab') {
			firstButtonRef.focus();
		}
	};

	const updateDate = (day: number, dateToSelect: Dayjs | undefined) => () =>
		dateToSelect && selectDate(dateToSelect.set('date', day));

	const moveFocusMonthAfter = (day: number) => () => {
		focusedDate = dateInView.set('month', dateInView.get('month') + 1).set('date', day);
		increaseMonthOffset();
	};

	const moveFocusMonthBefore = (day: number) => () => {
		focusedDate = dateInView.set('month', dateInView.get('month') - 1).set('date', day);
		decreaseMonthOffset();
	};
	const handleCellFocus = (day: number) => (event: FocusEvent) => {
		focusedDate = dateInView.set('date', day);
	};

	const dispatch = createEventDispatcher<{ datechange: Dayjs }>();

	function dateChangeDispatcher(changedDate: Dayjs) {
		dispatch('datechange', changedDate);
	}

	const selectDate = (newDate: Dayjs) => {
		selectedDate = newDate;
		dateChangeDispatcher(newDate);
	};

	const getTabindex = (
		day: number,
		dateInView: Dayjs,
		focusedDate: Dayjs,
		selectedDate: Dayjs | null
	) => {
		if (
			!focusedDate.isSame(dateInView, 'month') &&
			!selectedDate?.isSame(dateInView, 'month') &&
			day === dateInView.endOf('month').get('D')
		) {
			return 0;
		}
		const isSelectedCheck = getDate(day, dateInView).isSame(selectedDate, 'date');
		let isFocusedCheck = false;

		if (focusedDate) {
			isFocusedCheck = getDate(day, dateInView).isSame(focusedDate, 'date');
		}

		if (
			!selectedDate?.isSame(dateInView, 'month') &&
			!focusedDate?.isSame(dateInView, 'month') &&
			!today.isSame(dateInView, 'month')
		) {
			if (day === dateInView.endOf('month').get('D')) return 0;
			return -1;
		}

		return isSelectedCheck || isFocusedCheck ? 0 : -1;
	};

	export const focusLastFocusedDate = (e: KeyboardEvent) => {
		e.preventDefault();
		elementToFocus?.focus();
	};

	$: elementToFocus = document.getElementById(`date-${focusedDate.format('DD.MM.YYYY')}`);

	$: {
		if (focusedDate && !(increasedEffect || decreasedEffect)) {
			elementToFocus?.focus();
		}
	}
</script>

<div class="grid h-fit" role="presentation" bind:this={dayViewRef}>
	{#key dateInView}
		<div
			class="hack"
			role="presentation"
			in:fly={{ x: increasedEffect ? '320' : '-320', duration: 400, opacity: 0, easing: cubicOut }}
			out:fly={{ x: decreasedEffect ? '320' : '-320', duration: 400, opacity: 0, easing: cubicOut }}
			on:outroend={() => {
				increasedEffect = false;
				decreasedEffect = false;
			}}
			on:introstart={() => {}}
			on:introend={() => {
				const element = document.getElementById(`date-${focusedDate.format('DD.MM.YYYY')}`);
				element?.focus();
			}}>
			<div class="day-cells" role="rowgroup">
				{#each daysInView as innerArray, mainIndex}
					<div class="row" role="row" aria-rowindex={mainIndex + 1}>
						{#each innerArray as { type, value }, index}
							{#if type === 'before'}
								<button
									id="date-{getDate(value, dateInView.subtract(1, 'month')).format('DD.MM.YYYY')}"
									type="button"
									role="gridcell"
									class="outside"
									tabindex="-1"
									aria-colindex={index + 1}
									aria-selected="false"
									on:click={moveFocusMonthBefore(value)}
									class:current={getDate(value, dateInView.subtract(1, 'month')).isSame(
										today,
										'date'
									)}
									>{value}
								</button>
							{/if}
							{#if type === 'current'}
								<button
									id="date-{getDate(value, dateInView).format('DD.MM.YYYY')}"
									type="button"
									role="gridcell"
									class:current={getDate(value, dateInView).isSame(today, 'date')}
									class:selected={getDate(value, dateInView).isSame(selectedDate, 'date')}
									on:focus={handleCellFocus(value)}
									tabindex={getTabindex(value, dateInView, focusedDate, selectedDate)}
									aria-colindex={index + 1}
									aria-selected={getDate(value, dateInView).isSame(selectedDate, 'date')}
									on:click={updateDate(value, focusedDate)}>
									{value}
								</button>
							{/if}
							{#if type === 'after'}
								<button
									id="date-{getDate(value, dateInView.add(1, 'month')).format('DD.MM.YYYY')}"
									type="button"
									role="gridcell"
									class="outside"
									tabindex="-1"
									aria-colindex={index + 1}
									on:click={moveFocusMonthAfter(value)}>
									{value}
								</button>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	{/key}
</div>

<style lang="postcss">
	.hack {
		grid-row: 1;
		grid-column: 1;
	}
	.day-cells {
		@apply grid w-fit h-full gap-y-1 mt-2;
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
		@apply flex justify-center items-center text-sm font-medium cursor-pointer w-8 h-8 rounded-sm transition-colors;
	}

	button:hover {
		@apply bg-neutral-600/40;
	}

	button:focus {
		@apply bg-indigo-600/40;
	}

	.selected {
		@apply bg-indigo-600;
	}

	.selected:focus {
		@apply bg-indigo-700;
	}

	.selected:hover {
		@apply bg-indigo-500;
	}

	.current {
		@apply outline outline-1;
	}
</style>
