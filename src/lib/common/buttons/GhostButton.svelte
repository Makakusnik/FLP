<button on:click><slot /> </button>

<style>
	button {
		@apply relative isolate overflow-hidden outline outline-[1px] outline-neutral-400 -outline-offset-2 px-4 py-2 h-fit rounded-md transition-colors duration-500;
		transition-property: outline-color, color, background-color;
	}
	button:focus {
		@apply outline-[3px] outline-violet-300;
	}
	button:hover {
		@apply text-violet-200 outline-violet-500;
	}
</style>
