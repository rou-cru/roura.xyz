<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { services } from '$lib/data/services';
	import { projects } from '$lib/data/projects';
	import { timeline } from '$lib/data/experience';
	import { contactContent } from '$lib/data/contact';
	import { footerContent } from '$lib/data/footer';
	import { siteMetadata } from '$lib/data/site';
	import { heroContent } from '$lib/data/hero';
	import { technologies } from '$lib/data/technologies';
	import { generateMeta } from '$lib/data/meta';
	import { generateStructuredData } from '$lib/data/structured-data';
	import { MetaHead } from '$lib/components/ui';

	const pageOverrides = {
		title: 'Alberto Roura - Platform Engineer',
		description: siteMetadata.description
	};

	const metaTags = generateMeta(siteMetadata, pageOverrides);

	const schemas = generateStructuredData();
	const serviceSchemas = schemas.filter((s) => s['@type'] === 'ProfessionalService');
	const projectSchemas = schemas.filter((s) => s['@type'] === 'SoftwareSourceCode');
</script>

<MetaHead tags={metaTags} />

<svelte:head>
	{#each serviceSchemas as schema}
		<script type="application/ld+json">
			{JSON.stringify(schema)}
		</script>
	{/each}
	{#each projectSchemas as schema}
		<script type="application/ld+json">
			{JSON.stringify(schema)}
		</script>
	{/each}
</svelte:head>

<Hero content={heroContent} {technologies} />
<Services {services} />
<Projects {projects} />
<Experience {timeline} />
<Contact content={contactContent} />
<Footer content={footerContent} />
