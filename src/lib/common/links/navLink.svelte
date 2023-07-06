<script>
	export let href = '';
</script>

<a {href}>
	<slot />
</a>

<style>
	a {
		@apply relative duration-300 transition-colors;
		@apply overflow-hidden;
		@apply text-neutral-400/90 font-medium;
	}
	a:hover {
		@apply text-violet-300/90;
	}
	a::after {
		@apply absolute transition-transform h-full w-full duration-500;
		@apply border-b-violet-500 border-b-2 text-neutral-300/90;
		content: '';
		transform: translateX(-205%);
	}
	a:hover::after {
		transform: translateX(5%);
	}
</style>
