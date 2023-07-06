<script>
	import Icon from '@iconify/svelte';
	export let icon = 'ant-design:picture-filled';
</script>

<div class="flex h-[50px] min-w-fit gap-x-3 text-neutral-400">
	<slot name="icon">
		<Icon {icon} class="h-full w-[40px] text-neutral-600/60" />
	</slot>

	{#if $$slots.default}
		<p class="flex items-center text-lg whitespace-nowrap">
			<slot />
		</p>
	{:else}
		<p class="flex items-center text-lg whitespace-nowrap text-neutral-600/60">Your company</p>
	{/if}
</div>
