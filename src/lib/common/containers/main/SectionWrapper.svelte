<script>
	export let hasGradient = false;
	let gradient =
		'after:-z-10 after:absolute after:w-full after:h-full after:bg-purple-radial-gradient-top';
</script>

<div
	class="flex flex-col items-center w-full h-full relative isolate {hasGradient ? gradient : ''}"
>
	<slot />
</div>
