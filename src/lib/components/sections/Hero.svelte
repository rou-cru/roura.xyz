<script lang="ts">
	import type { HeroContent } from '$lib/data/hero';
	import type { Technology } from '$lib/data/technologies';
	import Section from '$lib/components/ui/Section.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import TechIconCarousel from '$lib/components/ui/TechIconCarousel.svelte';

	interface Props {
		content: HeroContent;
		technologies: Technology[];
	}

	const { content, technologies }: Props = $props();
</script>

<Section
	id="hero"
	class="relative flex min-h-screen items-center justify-center overflow-hidden py-32"
>
	<!-- Gradient overlay for depth -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent-surface/5"
		aria-hidden="true"
	></div>
	<div class="relative w-full text-center">
		<!--
			Static sr-only heading: screen readers need the full identity name
			for page context, which differs from the visually rendered tagline
			in content.title. The visible title is a stylistic tagline, not a
			personal identifier.
		-->
		<h1 class="sr-only">Alberto Roura — Platform Engineer & Cloud Architect</h1>
		<p
			class="animate-fade-in-up animation-delay-0 hero-title text-hero-main font-bold text-text-high"
			aria-hidden="true"
		>
			{content.title}
		</p>
		<p
			class="animate-fade-in-up animation-delay-150 hero-subtitle text-hero-sub text-text-medium"
		>
			{content.subtitle}
		</p>
		<div class="animate-fade-in-up animation-delay-300 mt-8 w-full">
			<TechIconCarousel {technologies} />
		</div>

		<div class="animate-fade-in-up animation-delay-300 mt-16">
			<Button href={content.cta.href} variant="primary">
				{content.cta.label}
			</Button>
		</div>
	</div>
</Section>

<style>
	.hero-title {
		line-height: var(--font-leading-tight);
		letter-spacing: var(--font-tracking-tighter);
	}

	.hero-subtitle {
		margin-top: var(--space-6);
		line-height: var(--font-leading-relaxed);
	}
</style>
