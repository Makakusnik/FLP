<script lang="ts">
	import TopBar from './(Sidebar)/TopBar.svelte';
	import AvatarIcon from '$lib/assets/icons/AvatarIcon.svelte';
	import ChevronDown from '$lib/assets/icons/ChevronDownIcon.svelte';
</script>

<div class="w-full h-12 bg-indigo-950/60 grid grid-cols-3 z-10">
	<TopBar />
	<div class="flex items-center justify-center">
		<a href="/dashboard">Logo</a>
	</div>
	<div class="flex items-center justify-end">
		<button class="flex h-full items-center px-2 hover:bg-slate-500/20 transition-colors">
			<AvatarIcon class="h-8 w-8 mr-2" />
			Admin User
			<ChevronDown class="h-4 w-4 ml-2" />
		</button>
	</div>
</div>
