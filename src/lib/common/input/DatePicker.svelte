<script lang="ts">
	import updateLocalePlugin from 'dayjs/plugin/updateLocale';
	import dayjs, { Dayjs } from 'dayjs';
	import weekDayPlugin from 'dayjs/plugin/weekday';
	import DatePickerView from './DatePickerView.svelte';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import CalendarIcon from '$lib/assets/icons/CalendarIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	dayjs.extend(customParseFormat);

	export let name: string;
	export let id: string;
	export let inputclass: string = '';

	const eventDispatcher = createEventDispatcher();

	let selectedDate: Dayjs;
	let dateFormat = 'DD.MM.YYYY';
	let selectedDateString = dateFormat;

	let hasError = false;

	dayjs.extend(updateLocalePlugin);
	dayjs.extend(weekDayPlugin);
	dayjs.locale('sk');

	let isOpen = false;

	let focusGuardRef: HTMLDivElement;
	let inputRef: HTMLInputElement;

	const openDatePicker = () => {
		if (!isOpen) isOpen = true;
	};

	const closeDatePicker = () => {
		isOpen = false;
	};

	const updateSelectedDateString = (date: Dayjs) => {
		if (date) {
			selectedDateString = date.format(dateFormat) || '';
		} else {
			selectedDateString = '';
		}
	};

	const handleInput = (e: Event) => {
		const value = (e?.target as HTMLInputElement)?.value;
		const currentDate = dayjs(value, dateFormat);
		if (currentDate.isValid()) {
			selectedDate = currentDate;
			hasError = false;
		} else if (value === '') {
			hasError = false;
		}
	};

	const handleBlur = (e: Event) => {
		eventDispatcher('inputblur');

		const value = (e?.target as HTMLInputElement)?.value;
		const currentDate = dayjs(value, dateFormat);
		if (currentDate.isValid()) {
			selectedDate = currentDate;
			hasError = false;
		} else if (value === '') {
			hasError = false;
		} else {
			hasError = true;
		}
	};

	const handleFocus = (e: Event) => {
		eventDispatcher('inputfocus');
	};

	$: updateSelectedDateString(selectedDate);
</script>

<div class="main-container">
	<div class="wrapper">
		<input
			{id}
			class={inputclass}
			tabindex={isOpen ? -1 : 0}
			type="text"
			placeholder={dateFormat}
			value={selectedDateString}
			bind:this={inputRef}
			on:input={handleInput}
			on:blur={handleBlur}
			on:focus={handleFocus}
			on:click={openDatePicker} />
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			on:click={openDatePicker}
			tabindex="-1"
			class="text-indigo-600 p-1 absolute right-2 cursor-pointer hover:bg-indigo-400/20 rounded-md">
			<CalendarIcon class="h-5 w-5" />
		</span>
	</div>
	{#if hasError}
		<small class="error">Wrong date format.</small>
	{/if}
	{#if isOpen}
		<DatePickerView
			on:datechange
			{id}
			{name}
			bind:inputRef
			bind:selectedDate
			bind:focusGuardRef
			{closeDatePicker} />
	{/if}
</div>

<style lang="postcss">
	input::placeholder {
		@apply lowercase;
	}

	.main-container {
		@apply relative;
	}

	input {
		@apply text-black px-1 w-full h-8;
	}

	input:focus {
		@apply bg-blue-200;
	}

	.open-button {
		@apply bg-neutral-500 w-fit px-2 py-1 rounded-sm mb-1 hover:bg-neutral-400 transition-colors;
	}

	.open-button:focus {
		@apply bg-indigo-400;
	}
	.error {
		@apply text-red-300;
	}
	.wrapper {
		@apply flex items-center relative w-full;
	}
</style>
