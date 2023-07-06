<script lang="ts">
	import SectionContentWrapper from '$lib/common/containers/main/SectionContentWrapper.svelte';
	import SectionHeadingBig from '$lib/common/heading/SectionHeadingBig.svelte';
	import IntersectionObserver from '$lib/common/utility/IntersectionObserver.svelte';
	import Dashboard from '$lib/svgs/dashboard.svelte';
</script>

<SectionContentWrapper>
	<div class="flex flex-col h-full items-center">
		<SectionHeadingBig>DashBoard</SectionHeadingBig>
	</div>
	<a href="/dashboard">Dashboard link bitch</a>
</SectionContentWrapper>

<style>
	.placeholder {
		@apply flex w-full justify-center;
		height: 150px;
	}
</style>
