<script>
	import { dashboardState } from '$lib/stores/dashboard.store';
	import { fly } from 'svelte/transition';
</script>

<li class="title">
	<slot />
</li>

<style lang="postcss">
	.title {
		@apply flex items-center justify-between pl-[52px] w-full h-10 bg-slate-500/60;
		@apply cursor-pointer hover:bg-slate-400/80;
	}
</style>
