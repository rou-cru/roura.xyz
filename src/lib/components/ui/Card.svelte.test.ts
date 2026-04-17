import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Card from './Card.svelte';
import { createTextSnippet } from './test-utils';

describe('Card', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should render content', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Card Content'),
				'data-testid': 'card'
			}
		});

		await expect.element(page.getByTestId('card')).toBeInTheDocument();
		await expect.element(page.getByText('Card Content')).toBeInTheDocument();
	});

	it('should propagate native attributes', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'card',
				role: 'article',
				'aria-labelledby': 'card-title'
			}
		});

		const card = page.getByTestId('card');
		await expect.element(card).toHaveAttribute('role', 'article');
		await expect.element(card).toHaveAttribute('aria-labelledby', 'card-title');
	});

	it('should render as a div element', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'card-div'
			}
		});

		const card = page.getByTestId('card-div');
		await expect.element(card).toBeInTheDocument();
		const el = card.element() as HTMLElement;
		expect(el.tagName.toLowerCase()).toBe('div');
	});

	it('should apply base CSS classes', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'card-classes'
			}
		});

		const card = page.getByTestId('card-classes');
		await expect.element(card).toHaveAttribute('class', expect.stringContaining('rounded-lg'));
		await expect.element(card).toHaveAttribute('class', expect.stringContaining('shadow-sm'));
		await expect.element(card).toHaveAttribute('class', expect.stringContaining('overflow-hidden'));
	});

	it('should merge custom class with base classes', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				class: 'custom-class',
				'data-testid': 'card-merge'
			}
		});

		const card = page.getByTestId('card-merge');
		await expect.element(card).toHaveAttribute('class', expect.stringContaining('custom-class'));
		await expect.element(card).toHaveAttribute('class', expect.stringContaining('rounded-lg'));
	});

	it('should not have trailing whitespace in class when no custom class is provided', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				'data-testid': 'card-trim'
			}
		});

		const card = page.getByTestId('card-trim');
		const classValue = (card.element() as HTMLElement).className;
		expect(classValue).toBe(classValue.trim());
	});

	it('should support id attribute via rest props', async () => {
		render(Card, {
			target: document.body,
			props: {
				children: createTextSnippet('Content'),
				id: 'my-card',
				'data-testid': 'card-id'
			}
		});

		await expect.element(page.getByTestId('card-id')).toHaveAttribute('id', 'my-card');
	});
});