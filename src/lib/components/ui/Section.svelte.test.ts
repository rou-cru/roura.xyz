import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Section from './Section.svelte';
import { createTextSnippet } from './test-utils';

describe('Section', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

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

	it('should apply base CSS classes', async () => {
		render(Section, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'section-base-classes'
			}
		});

		const section = page.getByTestId('section-base-classes');
		await expect.element(section).toHaveAttribute('class', expect.stringContaining('relative'));
		await expect.element(section).toHaveAttribute('class', expect.stringContaining('w-full'));
		await expect.element(section).toHaveAttribute('class', expect.stringContaining('py-16'));
	});

	it('should merge custom class with base classes', async () => {
		render(Section, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				class: 'my-custom-section',
				'data-testid': 'section-merge'
			}
		});

		const section = page.getByTestId('section-merge');
		await expect.element(section).toHaveAttribute('class', expect.stringContaining('my-custom-section'));
		await expect.element(section).toHaveAttribute('class', expect.stringContaining('relative'));
	});

	it('should not set id when provided id is whitespace-only', async () => {
		render(Section, {
			target: document.body,
			props: {
				id: '   ',
				children: createTextSnippet('Content'),
				'data-testid': 'section-whitespace-id'
			}
		});

		const section = page.getByTestId('section-whitespace-id');
		await expect.element(section).toBeInTheDocument();
		const idAttr = section.element().getAttribute('id');
		expect(idAttr === null || idAttr === '').toBe(true);
	});

	it('should not set id when provided id consists only of hash characters', async () => {
		render(Section, {
			target: document.body,
			props: {
				id: '###',
				children: createTextSnippet('Content'),
				'data-testid': 'section-hash-only-id'
			}
		});

		const section = page.getByTestId('section-hash-only-id');
		await expect.element(section).toBeInTheDocument();
		const idAttr = section.element().getAttribute('id');
		expect(idAttr === null || idAttr === '').toBe(true);
	});

	it('should not have trailing whitespace in class when no custom class is provided', async () => {
		render(Section, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'section-trim'
			}
		});

		const section = page.getByTestId('section-trim');
		const classValue = (section.element() as HTMLElement).className;
		expect(classValue).toBe(classValue.trim());
	});

	it('should render children inside the section', async () => {
		render(Section, {
			target: document.body,
			props: {
				children: createTextSnippet('Section Body Text'),
				'data-testid': 'section-children'
			}
		});

		await expect.element(page.getByText('Section Body Text')).toBeInTheDocument();
	});
});