<script lang="ts">
	import { fly } from 'svelte/transition';

	let activeSection: number | undefined = undefined;
</script>

<div
	class="hack w-full h-full"
	in:fly|global={{ x: 300, duration: 500, delay: 650 }}
	out:fly|global={{ x: -800, duration: 600 }}
>
	<div class="headlines">
		<p class:active={activeSection === 0}>Top-notch documentation</p>
		<p class:active={activeSection === 1}>Best practices</p>
		<p class:active={activeSection === 2}>Easily extensible</p>
	</div>
	<div class="small-window">
		<div
			on:mouseover={() => (activeSection = 0)}
			on:mouseleave={() => (activeSection = undefined)}
			on:focus
			role="img"
			class="clip clip1"
		/>
		<div
			on:mouseover={() => (activeSection = 1)}
			on:mouseleave={() => (activeSection = undefined)}
			on:focus
			role="img"
			class="clip clip2"
		/>
		<div
			on:mouseover={() => (activeSection = 2)}
			on:mouseleave={() => (activeSection = undefined)}
			on:focus
			role="img"
			class="clip clip3"
		/>
	</div>
</div>

<style lang="postcss">
	p {
		transition-property: color, transform;
		transition-duration: 500ms;
		transition-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
	.active {
		@apply scale-110 text-violet-400;
	}
	.headlines {
		@apply grid grid-cols-3 w-full mb-6;
	}
	.headlines p {
		@apply text-2xl mb-4 w-full flex justify-center;
	}
	.small-window {
		@apply w-full relative shadow-2xl;
		overflow: hidden;

		min-height: 30rem;
		background-color: #1f1f1f;
		border-radius: 16px;
	}

	.small-window .clip {
		@apply absolute w-full h-full;
		transition: 0.3s;
		top: 0;
		left: 0;
	}

	.small-window .clip.clip1 {
		clip-path: polygon(0 0, 55% 0, 20% 100%, 0% 100%);
		background-size: cover;
		background: url('/pic1.png');
		filter: brightness(100%);
	}
	.small-window .clip.clip2 {
		background-size: cover;
		clip-path: polygon(55% 0, 100% 0, 45% 100%, 20% 100%);
		background: url('/pic2.png');
		filter: brightness(75%);
	}
	.small-window .clip.clip3 {
		background-size: cover;
		clip-path: polygon(100% 0, 100% 0, 100% 100%, 45% 100%);
		background: url('/pic3.png');
	}

	/* clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); // to the right */
	/* clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); // to the left */

	.small-window:hover .clip {
		clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
	}

	.small-window:hover .clip1 {
		clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
	}

	.small-window .clip3:hover .clip2 {
		clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
	}

	.small-window .clip:hover {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
	}
</style>
