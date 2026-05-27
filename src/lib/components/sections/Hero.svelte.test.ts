import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Hero from './Hero.svelte';
import type { HeroContent } from '$lib/data/hero';
import type { Technology } from '$lib/data/technologies';

const mockContent: HeroContent = {
	title: 'The Why is Business.',
	subtitle: 'Alberto Roura | Platform Engineer',
	cta: {
		label: 'EXPLORE MY WORK',
		href: '#projects'
	}
};

const mockTechnologies: Technology[] = [
	{ name: 'Docker', simpleIconSlug: 'docker', category: 'containers' },
	{ name: 'Kubernetes', simpleIconSlug: 'kubernetes', category: 'containers' },
	{ name: 'Terraform', simpleIconSlug: 'terraform', category: 'cloud' }
];

describe('Hero', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should render title, subtitle, and CTA button', async () => {
		render(Hero, { props: { content: mockContent, technologies: mockTechnologies } });

		await expect.element(page.getByText(mockContent.title)).toBeVisible();
		await expect.element(page.getByText(mockContent.subtitle)).toBeVisible();
		await expect.element(page.getByText(mockContent.cta.label)).toBeVisible();
	});

	it('CTA should navigate to the target section on click', async () => {
		render(Hero, { props: { content: mockContent, technologies: mockTechnologies } });

		const cta = page.getByText(mockContent.cta.label);
		await expect.element(cta).toBeVisible();
		await expect.element(cta).toBeEnabled();

		// Click the CTA link and verify hash-based navigation occurred
		await cta.click();

		expect(window.location.hash).toBe(mockContent.cta.href);
	});

	it('should include the technology carousel when technologies are provided', async () => {
		render(Hero, { props: { content: mockContent, technologies: mockTechnologies } });

		// Technology names from the carousel should be present in the DOM
		// (labels start with opacity:0 but are in the document)
		await expect
			.element(page.getByText(mockTechnologies[0].name).first())
			.toBeInTheDocument();
		await expect
			.element(page.getByText(mockTechnologies[1].name).first())
			.toBeInTheDocument();
	});

	it('should render hero content even with empty technologies', async () => {
		render(Hero, { props: { content: mockContent, technologies: [] } });

		// Title and CTA should still be visible even without tech icons
		await expect.element(page.getByText(mockContent.title)).toBeVisible();
		await expect.element(page.getByText(mockContent.cta.label)).toBeVisible();
	});
});
