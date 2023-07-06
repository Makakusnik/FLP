<script>
	import Icon from '@iconify/svelte';
	import TopBar from './(Sidebar)/TopBar.svelte';
</script>

<div class="w-full h-12 bg-indigo-950/60 grid grid-cols-3">
	<TopBar />
	<div class="flex items-center justify-center">
		<a href="/dashboard">Logo</a>
	</div>
	<div class="flex items-center justify-end">
		<button class="flex h-full items-center px-2 hover:bg-slate-500/20 transition-colors">
			<Icon icon="mdi:user" class="h-8 w-8 mr-2" />
			Admin User
			<Icon icon="tabler:chevron-down" class="h-4 w-4 ml-2" />
		</button>
	</div>
</div>
