<script lang="ts">
	import type { ContactSection } from '$lib/data/contact';
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		content: ContactSection;
	}

	const { content }: Props = $props();
</script>

<Section id="contact">
	<div class="mb-[var(--space-16)]">
		<h2 class="text-section-title mb-[var(--space-4)] text-text-high">{content.title}</h2>
		<p class="text-section-desc max-w-[var(--container-max-text)] text-text-medium">
			{content.description}
		</p>
	</div>

	{#if content.cta.email}
		<Button href="mailto:{content.cta.email}" variant="primary">
			{content.cta.label}
		</Button>
	{/if}
</Section>
