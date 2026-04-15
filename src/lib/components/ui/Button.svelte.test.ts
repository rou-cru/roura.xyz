import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Button from './Button.svelte';
import { createTextSnippet } from './test-utils';

describe('Button', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should render external link', async () => {
		render(Button, {
			props: {
				href: 'https://example.com',
				children: createTextSnippet('External'),
				'data-testid': 'btn'
			}
		});

		const btn = page.getByTestId('btn');
		await expect.element(btn).toBeVisible();
		await expect.element(btn).toHaveAttribute('target', '_blank');
		await expect.element(btn).toHaveAttribute('rel', expect.stringMatching(/noopener|noreferrer/));
	});

	it('should render internal link', async () => {
		render(Button, {
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
			props: {
				onclick: () => (clicked = true),
				children: createTextSnippet('Click'),
				'data-testid': 'btn-click'
			}
		});

		const btn = page.getByTestId('btn-click');
		await expect.element(btn).toBeVisible();
		// Trigger NATIVE click to bypass locator abstraction issues
		await btn.element().click();
		expect(clicked).toBe(true);
	});

	it('should prevent click and have disabled attribute when disabled', async () => {
		let clicked = false;
		render(Button, {
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
			await btn.element().click();
		} catch {
			// Expected failure
		}
		expect(clicked).toBe(false);
	});
});
