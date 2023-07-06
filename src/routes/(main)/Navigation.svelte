<script>
	import CtaButton from '$lib/common/buttons/CTAButton.svelte';
	import GhostButton from '$lib/common/buttons/GhostButton.svelte';
	import Link from '$lib/common/links/navLink.svelte';
	import NavigationWrapper from '$lib/common/containers/main/NavigationWrapper.svelte';
</script>

<NavigationWrapper>
	<div class="nav-section logo-section">Logo</div>
	<div class="nav-section link-wrapper">
		<Link>About us</Link>
		<Link>Clients</Link>
		<Link>Get your app</Link>
		<Link>Contacts</Link>
	</div>
	<div class="nav-section buttons-section">
		<GhostButton>Sign In</GhostButton>
		<CtaButton>Book a meeting</CtaButton>
	</div>
</NavigationWrapper>

<style>
	.nav-section {
		@apply flex py-4;
	}

	.link-wrapper {
		@apply justify-center col-span-6 gap-x-6;
	}

	.buttons-section {
		@apply justify-end col-span-3 gap-x-2;
	}

	.logo-section {
		@apply justify-start col-span-3;
	}
</style>
