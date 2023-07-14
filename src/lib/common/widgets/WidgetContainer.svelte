<script lang="ts">
	export let className = '';
	export let title = '';
	let showTopList = $$slots.dropdown;
</script>

<section class="widget {className}">
	{#if showTopList}
		<div class="list">
			<p class="title">
				{title}
			</p>
			<div class="dropdown">
				<slot name="dropdown" />
			</div>
		</div>
	{/if}
	<slot />
</section>

<style lang="postcss">
	.title {
		@apply font-medium text-slate-200 text-sm;
	}

	.dropdown {
		@apply ml-auto;
	}

	.widget {
		@apply flex flex-col bg-slate-700 w-full h-[16rem] overflow-hidden;
		@apply p-3;
	}

	.list {
		@apply flex w-full h-fit justify-between mb-2;
	}
</style>
