<script lang="ts">
	import CtaButton from '$lib/common/buttons/CTAButton.svelte';
	import GhostButton from '$lib/common/buttons/GhostButton.svelte';
	import SectionContentWrapper from '$lib/common/containers/main/SectionContentWrapper.svelte';
	import Client from '$lib/common/misc/tags/Client.svelte';
	import Novyasset from '$lib/svgs/novyasset.svelte';
</script>

<SectionContentWrapper>
	<div class="flex justify-between">
		<div class="flex flex-col max-w-lg mt-20">
			<h1 class="text-6xl tracking-tight">Design system infrastructure for modern teams</h1>
			<p class="text-lg text-neutral-400 font-medium mt-6">
				With Specify's versatility, product teams realease better experiences faster while staying
				in-line with company standards.
			</p>
			<div class="flex mt-8 gap-x-4">
				<CtaButton>Book a demo</CtaButton>
				<GhostButton>Read our vision</GhostButton>
			</div>
		</div>
		<Novyasset />
	</div>
	<div class="flex mt-16 items-center flex-col w-full gap-y-4">
		<p class="text-neutral-400">Already loved and trusted by product teams</p>
		<div class="flex gap-x-6">
			<Client icon="logos:amp-icon">Kim</Client>
			<Client icon="logos:eta-icon">Peder</Client>
			<Client icon="logos:nats-icon">Maroš</Client>
			<Client />
			<Client />
		</div>
		<div class="flex gap-x-6">
			<Client />
			<Client />
		</div>
	</div>
</SectionContentWrapper>
