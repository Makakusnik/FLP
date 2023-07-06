<script lang="ts">
	type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	export let as: Headings = 'h1';
</script>

<svelte:element this={as} class="text-4xl font-medium max-w-lg {$$props.class}">
	<slot />
</svelte:element>
