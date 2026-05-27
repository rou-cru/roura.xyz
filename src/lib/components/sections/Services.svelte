<script lang="ts">
	import type { ServiceItem } from '$lib/data/services';
	import Section from '$lib/components/ui/Section.svelte';
	import CardTilt from '$lib/components/ui/CardTilt.svelte';

	interface Props {
		services: ServiceItem[];
	}

	const { services }: Props = $props();
</script>

<Section id="services">
	<div class="mb-[var(--space-12)] text-center">
		<h2 class="text-section-title">Services</h2>
	</div>
	<div class="grid grid-cols-1 gap-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-3">
		{#each services as service (service.id)}
			<CardTilt class="flex flex-col gap-[var(--space-4)] p-[var(--space-6)]">
				<div class="text-accent-text">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-[var(--space-8)] w-[var(--space-8)]"
						aria-hidden="true"
					>
						<path d={service.iconPath} />
					</svg>
				</div>
				<h3>{service.title}</h3>
				<p class="text-text-medium">{service.description}</p>
			</CardTilt>
		{/each}
	</div>
</Section>
