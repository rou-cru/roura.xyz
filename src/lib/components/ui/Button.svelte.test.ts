import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Button from './Button.svelte';
import { createRawSnippet } from 'svelte';

function createTextSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`
	}));
}

describe('Button', () => {
	it('should render external link', async () => {
		render(Button, {
			target: document.body,
			props: {
				href: 'https://example.com',
				children: createTextSnippet('External'),
				'data-testid': 'btn'
			}
		});

		const btn = page.getByTestId('btn');
		await expect.element(btn).toHaveAttribute('target', '_blank');
		await expect.element(btn).toHaveAttribute('rel', expect.stringMatching(/noopener|noreferrer/));
	});

	it('should render internal link', async () => {
		render(Button, {
			target: document.body,
			props: {
				href: '/internal',
				children: createTextSnippet('Internal'),
				'data-testid': 'btn'
			}
		});

		const btn = page.getByTestId('btn');
		await expect.element(btn).toHaveAttribute('href', '/internal');
		await expect.element(btn).not.toHaveAttribute('target');
	});

	it('should handle click', async () => {
		let clicked = false;
		render(Button, {
			target: document.body,
			props: {
				onclick: () => (clicked = true),
				children: createTextSnippet('Click'),
				'data-testid': 'btn'
			}
		});

		await page.getByTestId('btn').click();
		expect(clicked).toBe(true);
	});

	it('should prevent click and have disabled attribute when disabled', async () => {
		let clicked = false;
		render(Button, {
			target: document.body,
			props: {
				disabled: true,
				onclick: () => (clicked = true),
				children: createTextSnippet('Disabled'),
				'data-testid': 'btn-disabled'
			}
		});

		const btn = page.getByTestId('btn-disabled');
		await expect.element(btn).toBeDisabled();

		try {
			await btn.click({ timeout: 500 });
		} catch {
			// Expected to fail clicking a disabled element in browser tests
		}
		expect(clicked).toBe(false);
	});
});
