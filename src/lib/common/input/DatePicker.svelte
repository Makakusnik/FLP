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
	import { onDestroy, onMount } from 'svelte';
	import { clickOutside } from '$lib/utilities/directives/clickOutside';

	export let name: string;
	export let isOpen: boolean;
	export let focusGuardRef: HTMLDivElement;

	dayjs.extend(updateLocalePlugin);
	dayjs.extend(weekDayPlugin);
	dayjs.locale('sk');

	let dateInView = dayjs();
	let isYearViewOpen = false;

	let increasedEffect = false;
	let decreasedEffect = false;

	let firstButtonRef: HTMLElement;
	let nextMonthButtonRef: HTMLElement;
	let focusLastFocusedDate: (e: KeyboardEvent) => void;

	const days: string[] = dayjsSkLocale.weekdaysMin || [];

	const close = () => {
		isOpen = false;
	};

	const handleOpenYearView = () => (isYearViewOpen = !isYearViewOpen);

	const increaseMonthOffset = () => {
		increasedEffect = true;
		dateInView = dateInView.add(1, 'month');
	};
	const decreaseMonthOffset = () => {
		decreasedEffect = true;
		dateInView = dateInView.subtract(1, 'month');
	};

	const handleFocusGuardKeydown = (e: KeyboardEvent) => {
		e.preventDefault();
	};

	const handleFirstButtonFocusSwitch = (e: KeyboardEvent) => {
		if (e.shiftKey && e.key === 'Tab') {
			focusLastFocusedDate(e);
		}
	};

	onMount(() => {
		focusGuardRef.focus();
		focusGuardRef.addEventListener('keydown', handleFocusGuardKeydown);
		firstButtonRef.addEventListener('keydown', handleFirstButtonFocusSwitch);
	});

	onDestroy(() => {
		focusGuardRef.focus();
		focusGuardRef.removeEventListener('keydown', handleFocusGuardKeydown);
	});

	const handleSelectYear = (year: number) => () => (dateInView = dateInView.set('year', year));
</script>

<div class="absolute" use:clickOutside on:clickoutside={close} in:fade={{ duration: 100 }}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div id="focus-guard" bind:this={focusGuardRef} tabindex="0" />
	<div class="calendar-container" role="dialog">
		<div class="top-list">
			<div class="select" on:click={handleOpenYearView} role="presentation" aria-live="polite">
				{#key dateInView}
					<p in:fade>{`${dateInView.format('MMMM')} ${dateInView.format('YYYY')}`}</p>
				{/key}
				<button
					type="button"
					id="{name}-year-view-expand"
					bind:this={firstButtonRef}
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
						id="{name}-prev-month-button"
						on:click={decreaseMonthOffset}
						title="Previous month"
						aria-label="Previous month">
						<ChevronLeftIcon class="w-5 h-5" />
					</button>
					<button
						type="button"
						id="{name}-next-month-button"
						bind:this={nextMonthButtonRef}
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
			<DayCells
				bind:increasedEffect
				bind:decreasedEffect
				bind:focusGuardRef
				bind:firstButtonRef
				bind:focusLastFocusedDate
				bind:nextMonthButtonRef
				{dateInView}
				{increaseMonthOffset}
				{decreaseMonthOffset} />
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
		@apply flex flex-col bg-neutral-800 h-96 w-80 rounded-md overflow-hidden relative isolate;
	}

	.top-list {
		@apply flex relative z-10;
	}
</style>
