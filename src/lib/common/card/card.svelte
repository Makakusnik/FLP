<script lang="ts">
	import Icon from '@iconify/svelte';
	export let icon = 'carbon:unknown-filled';
	export let title = 'unknown';
	export let isActive = false;
</script>

<div on:click on:keypress tabindex="0" class="wrapper" role="button" class:active={isActive}>
	<span class="flex gap-x-2">
		<Icon {icon} class="text-purple-200 h-6 w-6" />
		<p class="font-semibold text-purple-200">{title}</p>
	</span>
	<p class="text-purple-200">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore vel, beatae possimus ea
		rem.
	</p>
</div>

<style lang="postcss">
	.wrapper {
		@apply overflow-hidden flex flex-col cursor-pointer select-none gap-y-2 p-6 w-1/3 h-[150px] rounded-xl relative isolate transition-transform duration-700;
	}

	.wrapper:focus {
		@apply outline-[2px] outline-violet-400 -outline-offset-1;
	}

	.wrapper:after {
		content: '';
		@apply bg-card-gradient duration-1000 absolute w-full h-full -z-10 inset-0 opacity-0 rounded-xl;
		transition-property: transform, opacity;
	}

	.active:after {
		@apply bg-card-gradient opacity-50 duration-1000 shadow-xl shadow-black transition-opacity;
	}

	.active {
		@apply transition-transform duration-700;
		transform: scale(1.05);
	}

	.wrapper:hover:before {
		transform: translateX(150%);
		transition: 0.7s;
		opacity: 1;
	}

	.wrapper:before {
		content: '';
		@apply absolute z-20 w-full h-full inset-0;
		background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
		transform: translateX(-150%);
		transition: 0.7s;
		transition-property: none;
		opacity: 0;
	}

	.active:before {
		content: none;
	}
</style>
