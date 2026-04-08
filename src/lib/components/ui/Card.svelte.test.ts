import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Card from './Card.svelte';
import { createTextSnippet } from './test-utils';

describe('Card', () => {
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
});
