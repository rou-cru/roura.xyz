import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import TechIconCarousel from './TechIconCarousel.svelte';
import type { Technology } from '$lib/data/technologies';

const mockTechnologies: Technology[] = [
	{ name: 'Docker', simpleIconSlug: 'docker', category: 'containers' },
	{ name: 'Kubernetes', simpleIconSlug: 'kubernetes', category: 'containers' },
	{ name: 'Terraform', simpleIconSlug: 'terraform', category: 'cloud' },
	{ name: 'Python', simpleIconSlug: 'python', category: 'programming' },
	{ name: 'Grafana', simpleIconSlug: 'grafana', category: 'observability' }
];

describe('TechIconCarousel', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should render technology labels when technologies are provided', async () => {
		render(TechIconCarousel, { props: { technologies: mockTechnologies } });

		// Each tech name appears in the DOM (labels have opacity:0 until hover,
		// so we assert DOM presence, not screen visibility)
		for (const tech of mockTechnologies) {
			await expect
				.element(page.getByText(tech.name).first())
				.toBeInTheDocument();
		}
	});

	it('should render nothing when technologies array is empty', async () => {
		render(TechIconCarousel, { props: { technologies: [] } });

		// No technology names should be in the DOM when the list is empty
		for (const tech of mockTechnologies) {
			await expect
				.element(page.getByText(tech.name))
				.not.toBeInTheDocument();
		}
	});

	it('should reveal technology label on hover', async () => {
		render(TechIconCarousel, { props: { technologies: mockTechnologies } });

		// Hover over the first tech icon to reveal its label
		// (tech-item-wrapper contains both the icon badge and the label)
		const firstTechName = mockTechnologies[0].name;
		await page.getByText(firstTechName).first().hover();

		// After hover, the label text of the first tech should be visible
		await expect
			.element(page.getByText(firstTechName).first())
			.toBeVisible();
	});
});
