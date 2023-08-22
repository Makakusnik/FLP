<script lang="ts">
	import updateLocalePlugin from 'dayjs/plugin/updateLocale';
	import dayjs from 'dayjs';
	import weekDayPlugin from 'dayjs/plugin/weekday';
	import DatePicker from './DatePicker.svelte';

	export let name: string;

	dayjs.extend(updateLocalePlugin);
	dayjs.extend(weekDayPlugin);
	dayjs.locale('sk');

	let isOpen = false;

	let focusGuardRef: HTMLDivElement;

	const open = () => {
		isOpen = true;
	};
</script>

<button class="open-button" on:click={open}>testing</button>
<label for={name}><slot /></label>
<input id={name} tabindex={isOpen ? -1 : 0} type="text" />
{#if isOpen}
	<DatePicker on:datechange {name} bind:isOpen bind:focusGuardRef />
{/if}

<style lang="postcss">
	.open-button {
		@apply bg-neutral-500 w-fit px-2 py-1 rounded-sm mb-1 hover:bg-neutral-400 transition-colors;
	}

	.open-button:focus {
		@apply bg-indigo-400;
	}
</style>
