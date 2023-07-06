<script lang="ts">
	import SectionWrapper from '$lib/common/containers/main/SectionWrapper.svelte';
	import CardSection from './(CardSection)/CardSection.svelte';
	import DashboardSection from './DashboardSection.svelte';
	import IntroSection from './IntroSection.svelte';
	import Navigation from './Navigation.svelte';
</script>

<div class="flex text-white w-full h-full flex-col gap-y-32">
	<SectionWrapper hasGradient={true}>
		<Navigation />
		<IntroSection />
	</SectionWrapper>
	<SectionWrapper>
		<CardSection />
	</SectionWrapper>
	<SectionWrapper>
		<DashboardSection />
	</SectionWrapper>
</div>
