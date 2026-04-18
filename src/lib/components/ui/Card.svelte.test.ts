import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Card from './Card.svelte';
import { createTextSnippet } from './test-utils';

describe('Card', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	function renderCard(extraProps: Record<string, unknown> = {}) {
		return render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				...extraProps
			}
		});
	}

	it('should render content', async () => {
		renderCard({
			children: createTextSnippet('Card Content'),
			'data-testid': 'card'
		});

		await expect.element(page.getByTestId('card')).toBeInTheDocument();
		await expect.element(page.getByText('Card Content')).toBeInTheDocument();
	});

	it('should propagate native attributes', async () => {
		renderCard({
			'data-testid': 'card',
			role: 'article',
			'aria-labelledby': 'card-title'
		});

		const card = page.getByTestId('card');
		await expect.element(card).toHaveAttribute('role', 'article');
		await expect.element(card).toHaveAttribute('aria-labelledby', 'card-title');
	});

	it('should render as a div element', async () => {
		renderCard({ 'data-testid': 'card-div' });

		const card = page.getByTestId('card-div');
		await expect.element(card).toBeInTheDocument();
		const el = card.element() as HTMLElement;
		expect(el.tagName.toLowerCase()).toBe('div');
	});

	it('should have semantic data-card attribute', async () => {
		renderCard({ 'data-testid': 'card-semantic' });

		const card = page.getByTestId('card-semantic');
		await expect.element(card).toHaveAttribute('data-card');
	});

	it('should merge custom class with base classes', async () => {
		renderCard({
			class: 'custom-class',
			'data-testid': 'card-merge'
		});

		const card = page.getByTestId('card-merge');
		await expect.element(card).toHaveAttribute('class', expect.stringContaining('custom-class'));
		await expect.element(card).toHaveAttribute('data-card');
	});

	it('should not have trailing whitespace or double spaces in class', async () => {
		renderCard({ 'data-testid': 'card-trim' });

		const card = page.getByTestId('card-trim');
		const classValue = (card.element() as HTMLElement).className;
		expect(classValue).not.toMatch(/\s$/);
		expect(classValue).not.toMatch(/\s{2,}/);
	});

	it('should support id attribute via rest props', async () => {
		renderCard({
			id: 'my-card',
			'data-testid': 'card-id'
		});

		await expect.element(page.getByTestId('card-id')).toHaveAttribute('id', 'my-card');
	});
});
