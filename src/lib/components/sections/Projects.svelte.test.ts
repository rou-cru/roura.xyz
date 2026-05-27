import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Projects from './Projects.svelte';
import type { Project } from '$lib/data/projects';

const mockProjects: Project[] = [
	{
		id: 'proj-1',
		title: 'IDP Blueprint',
		subtitle: 'Internal Developer Platform',
		description: 'A complete internal developer platform.',
		imageUrl: 'https://placehold.co/800x600',
		tags: ['Kubernetes', 'ArgoCD'],
		featured: true,
		longDescription: 'Full long description here.',
		achievements: ['Reduced deploy time by 50%', 'Onboarded 3 teams'],
		links: [{ label: 'View on GitHub' }]
	},
	{
		id: 'proj-2',
		title: 'Home Lab',
		subtitle: 'K8s Homelab Cluster',
		description: 'Self-hosted infrastructure.',
		imageUrl: 'https://placehold.co/800x600',
		tags: ['Helm', 'Terraform'],
		featured: false
	}
];

describe('Projects', () => {
	beforeEach(async () => {
		document.body.innerHTML = '';
		await cleanup();
	});

	describe('rendering', () => {
		it('should render all project cards', async () => {
			render(Projects, { props: { projects: mockProjects } });

			for (const proj of mockProjects) {
				await expect.element(page.getByText(proj.title).first()).toBeVisible();
			}
		});

		it('should render tags for each project', async () => {
			render(Projects, { props: { projects: mockProjects } });

			await expect.element(page.getByText('Kubernetes')).toBeVisible();
			await expect.element(page.getByText('ArgoCD')).toBeVisible();
			await expect.element(page.getByText('Helm')).toBeVisible();
		});

		it('should render no cards when projects array is empty', async () => {
			render(Projects, { props: { projects: [] } });

			expect(page.getByRole('button').elements().length).toBe(0);
		});
	});

	describe('interactions', () => {
		it('should open drawer with project details when card is clicked', async () => {
			render(Projects, { props: { projects: mockProjects } });

			const cardBtn = page.getByRole('button', { name: 'View details for IDP Blueprint' });
			await cardBtn.click();

			await expect.element(page.getByText('Full long description here.')).toBeVisible();
		});

		it('should show achievements in drawer', async () => {
			render(Projects, { props: { projects: mockProjects } });

			await page.getByRole('button', { name: 'View details for IDP Blueprint' }).click();

			await expect.element(page.getByText('Reduced deploy time by 50%')).toBeVisible();
		});

		it('should show close button when drawer is open', async () => {
			render(Projects, { props: { projects: mockProjects } });

			await page.getByRole('button', { name: 'View details for IDP Blueprint' }).click();

			await expect.element(page.getByRole('button', { name: 'Close' })).toBeVisible();
		});
	});
});
