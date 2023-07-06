<script lang="ts">
	import Icon from '@iconify/svelte';
	export let className: string = '';
</script>

<section class="widget {className}">
	<div class="list">
		<button class="button">
			<Icon icon="ri:refresh-line" class="w-5 h-5" />
		</button>
		<button class="button">
			<Icon icon="pepicons-pop:dots-y" class="w-5 h-5" />
		</button>
	</div>
	<div class="content">
		<slot />
	</div>
</section>

<style lang="postcss">
	.widget {
		@apply flex flex-col bg-slate-700 w-full h-full min-h-[16rem];
		@apply p-3;
	}

	.list {
		@apply flex w-full h-fit justify-between;
	}

	.list > .button {
		@apply p-1 rounded-sm transition-colors;
		@apply hover:bg-slate-100/20;
	}

	.content {
		@apply pt-2;
	}
</style>
