<script lang="ts">
	import Phases from '$lib/svgs/phases.svelte';
	import { fly } from 'svelte/transition';
</script>

<div
	class="hack w-full h-full"
	in:fly|global={{ x: 300, duration: 500, delay: 650 }}
	out:fly|global={{ x: -800, duration: 600 }}>
	<div class="headlines">
		<p>Product development phases</p>
	</div>
	<div>
		<div class="section">
			<Phases />
		</div>
	</div>
</div>

<style lang="postcss">
	.section {
		@apply w-full relative shadow-2xl p-2;
		overflow: hidden;
		min-height: 30rem;
		width: 100%;
		background-color: #1f1f1f;
		border-radius: 16px;
	}
	.headlines {
		@apply flex justify-center w-full mb-6 text-2xl;
	}

	.hack {
		grid-row: 1;
		grid-column: 1;
	}
</style>
