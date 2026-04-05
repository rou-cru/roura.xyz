import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Tag from './Tag.svelte';

describe('Tag', () => {
	it('should render label text', async () => {
		render(Tag, {
			target: document.body,
			props: {
				label: 'Svelte',
				'data-testid': 'tag'
			}
		});

		await expect.element(page.getByTestId('tag')).toHaveTextContent('Svelte');
	});

	it('should not render if label is empty', async () => {
		render(Tag, {
			target: document.body,
			props: {
				label: '   ', // Logic check: trim()
				'data-testid': 'tag'
			}
		});

		await expect.element(page.getByTestId('tag')).not.toBeInTheDocument();
	});

	it('should propagate native attributes', async () => {
		render(Tag, {
			target: document.body,
			props: {
				label: 'Tag',
				'data-testid': 'tag',
				title: 'Tooltip'
			}
		});

		await expect.element(page.getByTestId('tag')).toHaveAttribute('title', 'Tooltip');
	});
});
