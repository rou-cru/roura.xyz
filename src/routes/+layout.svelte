<script lang="ts">
	import type { Snippet } from 'svelte';
	import './layout.css';
	import NavBar from '$lib/components/ui/Nav/NavBar.svelte';
	import { navLinks } from '$lib/data/navigation';
	import { siteMetadata } from '$lib/data/site';
	import { generateMeta } from '$lib/data/meta';
	import { generateStructuredData } from '$lib/data/structured-data';
	import { MetaHead } from '$lib/components/ui';

	let { children }: { children: Snippet } = $props();

	const metaTags = generateMeta(siteMetadata);

	const schemas = generateStructuredData();
	const personSchema = schemas.find((s) => s['@type'] === 'Person');
	const websiteSchema = schemas.find((s) => s['@type'] === 'WebSite');
</script>

<MetaHead tags={metaTags} />

<svelte:head>
	{#if personSchema}
		<script type="application/ld+json">
			{JSON.stringify(personSchema)}
		</script>
	{/if}
	{#if websiteSchema}
		<script type="application/ld+json">
			{JSON.stringify(websiteSchema)}
		</script>
	{/if}
</svelte:head>

<NavBar links={navLinks} logoText="roura.xyz" />

<main>
	{@render children()}
</main>
