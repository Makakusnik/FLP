<script>
	import WidgetContainer from '$lib/common/widgets/WidgetContainer.svelte';
</script>

<main class="h-full w-full">
	<div class="view">
		<div class="content">
			<WidgetContainer className="col-span-3 row-span-1">1</WidgetContainer>
			<WidgetContainer className="col-span-3 row-span-1">2</WidgetContainer>
			<WidgetContainer className="col-span-3 row-span-1">3</WidgetContainer>
			<WidgetContainer className="col-span-3 row-span-1">4</WidgetContainer>
			<WidgetContainer className="col-span-6 row-span-1">5</WidgetContainer>
			<WidgetContainer className="col-span-6 row-span-1">6</WidgetContainer>
			<WidgetContainer className="col-span-6 row-span-2">7</WidgetContainer>
			<WidgetContainer className="col-span-6 row-span-1">8</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">9</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">10</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">11</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">12</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">13</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">14</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">15</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">16</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">17</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">18</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">19</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">20</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">21</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">22</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">23</WidgetContainer>
			<WidgetContainer className="col-span-1 row-span-1">24</WidgetContainer>
		</div>
	</div>
</main>

<style lang="postcss">
	.view {
		@apply pl-12;
	}

	.content {
		@apply grid grid-cols-12 p-4 gap-4 h-full bg-red-400;
		@apply grid-rows-[repeat(8,1fr)];
	}
</style>
