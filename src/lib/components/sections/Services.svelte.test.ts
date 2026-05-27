import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Services from './Services.svelte';
import type { ServiceItem } from '$lib/data/services';

const mockServices: ServiceItem[] = [
	{ id: 'svc-1', title: 'Platform Engineering', description: 'Build internal platforms.', iconPath: 'M5 12h14' },
	{ id: 'svc-2', title: 'Cloud Architecture', description: 'Design cloud solutions.', iconPath: 'M12 2v10' },
	{ id: 'svc-3', title: 'DevOps', description: 'Automate pipelines.', iconPath: 'M4 4v5h5' }
];

describe('Services', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should render all service cards', async () => {
		render(Services, { props: { services: mockServices } });

		for (const svc of mockServices) {
			await expect.element(page.getByText(svc.title)).toBeVisible();
		}
	});

	it('should render description for each service', async () => {
		render(Services, { props: { services: mockServices } });

		for (const svc of mockServices) {
			await expect.element(page.getByText(svc.description)).toBeVisible();
		}
	});

	it('should render an SVG icon for each service', async () => {
		render(Services, { props: { services: mockServices } });

		const svgs = document.querySelectorAll('svg[aria-hidden="true"]');
		expect(svgs.length).toBe(mockServices.length);
	});

	it('should render no cards when services array is empty', async () => {
		render(Services, { props: { services: [] } });

		expect(document.querySelectorAll('svg[aria-hidden="true"]').length).toBe(0);
	});
});
