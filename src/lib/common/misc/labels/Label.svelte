<script lang="ts">
	export let text: string;
	export let color: string;
	export let textColor: string;
	export let collapsed = true;
</script>

<button
	class="label"
	style="background-color: {color}; color: {textColor}"
	class:collapsed
	on:click>
	<p>{text}</p>
</button>

<style lang="postcss">
	.label {
		@apply flex items-center rounded-sm h-4 min-w-[2rem] w-fit overflow-hidden text-xs font-semibold px-2;
		transition: height 200ms ease-in-out;
	}
	p {
		transition: opacity 100ms 100ms ease-in-out;
	}
	.collapsed {
		@apply h-2;
	}

	.collapsed > p {
		transition: opacity 50ms ease-in-out;
		opacity: 0;
		pointer-events: none;
	}
</style>
