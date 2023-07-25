<script lang="ts">
	import PictureIcon from '$lib/assets/icons/PictureIcon.svelte';
</script>

<div class="flex h-[50px] min-w-fit gap-x-3 text-neutral-400">
	<span class="icon-wrapper">
		<slot name="icon">
			<PictureIcon class="h-full w-[40px] text-neutral-600/60" />
		</slot>
	</span>

	{#if $$slots.default}
		<p class="flex items-center text-lg whitespace-nowrap">
			<slot />
		</p>
	{:else}
		<p class="flex items-center text-lg whitespace-nowrap text-neutral-600/60">Your company</p>
	{/if}
</div>

<style lang="postcss">
	.icon-wrapper :global(svg) {
		@apply h-full w-[40px];
	}
</style>
