import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Section from './Section.svelte';
import { createTextSnippet } from './test-utils';

describe('Section', () => {
	it('should render content and attributes', async () => {
		render(Section, {
			target: document.body,
			props: {
				id: 'test-section',
				children: createTextSnippet('Content'),
				'data-testid': 'section',
				'aria-label': 'My Section'
			}
		});

		const section = page.getByTestId('section');
		await expect.element(section).toBeInTheDocument();
		await expect.element(section).toHaveAttribute('id', 'test-section');
		await expect.element(section).toHaveAttribute('aria-label', 'My Section');
	});

	it('should sanitise invalid ids', async () => {
		render(Section, {
			target: document.body,
			props: {
				id: '#invalid id',
				children: createTextSnippet('Content'),
				'data-testid': 'section'
			}
		});

		// Logic check: sanitizeId removes # and spaces
		await expect.element(page.getByTestId('section')).toHaveAttribute('id', 'invalid-id');
	});

	it('should render as semantic section', async () => {
		render(Section, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'section'
			}
		});

		const section = page.getByTestId('section');
		await expect.element(section).toBeInTheDocument();
		// Semantic check: MUST be a <section> tag
		const el = section.element();
		expect((el as HTMLElement).tagName.toLowerCase()).toBe('section');
	});

	it('should gracefully handle missing id', async () => {
		render(Section, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'section-no-id'
			}
		});

		const section = page.getByTestId('section-no-id');
		await expect.element(section).toBeInTheDocument();
		// If no ID is provided, it should either have no ID attribute or an empty one, not "undefined" or null
		const idAttr = await section.element().getAttribute('id');
		expect(idAttr === null || idAttr === '').toBe(true);
	});
});
