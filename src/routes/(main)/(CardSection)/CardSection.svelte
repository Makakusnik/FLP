<script>
	import Card from '$lib/common/card/card.svelte';
	import SectionContentWrapper from '$lib/common/containers/main/SectionContentWrapper.svelte';
	import { fly } from 'svelte/transition';
	import Card1 from './Card1.svelte';
	import Card2 from './Card2.svelte';
	import Card3 from './Card3.svelte';
	import SectionHeadingBig from '$lib/common/heading/SectionHeadingBig.svelte';

	let activeCard = 0;
</script>

<SectionContentWrapper>
	<div class="flex flex-col h-full items-center">
		<SectionHeadingBig>
			Your brand and your products, always in sync with Specify.
		</SectionHeadingBig>
		<div class="flex gap-x-6 w-full h-full mt-12">
			<Card
				title="High quality product"
				icon="material-symbols:diamond"
				isActive={activeCard === 0}
				on:click={(e) => {
					activeCard = 0;
				}}
			/>
			<Card
				title="Fast delivery"
				icon="mdi:clock-fast"
				isActive={activeCard === 1}
				on:click={(e) => {
					activeCard = 1;
				}}
			/>
			<Card
				title="Up-to-date technologies"
				icon="dashicons:update"
				isActive={activeCard === 2}
				on:click={(e) => {
					activeCard = 2;
				}}
			/>
		</div>
		<div class="gradient window">
			{#if activeCard === 0}
				<Card1 />
			{:else if activeCard === 1}
				<Card2 />
			{:else}
				<Card3 />
			{/if}
		</div>
	</div></SectionContentWrapper
>

<style>
	.window {
		@apply grid grid-cols-1 grid-rows-1 rounded-lg;
		@apply items-center justify-center;
		@apply max-w-5xl w-full mt-20 p-16 h-[712px];
		min-height: 42.5rem;
		height: fit-content;
		overflow: hidden;
		place-items: center;
	}

	.gradient {
		@apply bg-purple-900;
		background: linear-gradient(
			49deg,
			#440b74,
			#3b1759,
			#2c0f44
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
</style>
