import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { writable } from 'svelte/store';
import NavLink from './NavLink.svelte';

const mockPageStore = writable({ url: new URL('http://localhost/') });

vi.mock('$app/stores', () => ({
	page: { subscribe: (fn: Parameters<typeof mockPageStore.subscribe>[0]) => mockPageStore.subscribe(fn) }
}));

describe('NavLink', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	describe('rendering', () => {
		it('should render internal link with label and correct href', async () => {
			render(NavLink, {
				props: { href: '/about', label: 'About', 'data-testid': 'navlink-internal' }
			});

			const link = page.getByTestId('navlink-internal');
			await expect.element(link).toBeVisible();
			await expect.element(link).toHaveAttribute('href', '/about');
			await expect.element(link).toHaveTextContent('About');
		});

		it('should render external link with target and rel attributes', async () => {
			render(NavLink, {
				props: {
					href: 'https://github.com',
					label: 'GitHub',
					'data-testid': 'navlink-external'
				}
			});

			const link = page.getByTestId('navlink-external');
			await expect.element(link).toBeVisible();
			await expect.element(link).toHaveAttribute('target', '_blank');
			await expect.element(link).toHaveAttribute('rel', 'noopener noreferrer');
		});

		it('should not set aria-label when visible label text is provided', async () => {
			render(NavLink, {
				props: { href: '/home', label: 'Home', 'data-testid': 'navlink-aria' }
			});

			const link = page.getByTestId('navlink-aria');
			await expect.element(link).toBeVisible();
			// Behavior: link has visible text, so no redundant aria-label for screen readers
			await expect.element(link).not.toHaveAttribute('aria-label');
		});
	});

	describe('interaction', () => {
		it('should fire onClick when link is clicked', async () => {
			let clicked = false;
			render(NavLink, {
				props: {
					href: '#contact',
					label: 'Contact',
					onClick: () => (clicked = true),
					'data-testid': 'navlink-click'
				}
			});

			const link = page.getByTestId('navlink-click');
			await expect.element(link).toBeVisible();
			await link.click();
			expect(clicked).toBe(true);
		});
	});

	describe('aria-current', () => {
		it('should set aria-current="page" when href matches current pathname', async () => {
			mockPageStore.set({ url: new URL('http://localhost/about') });
			render(NavLink, { props: { href: '/about', label: 'About', 'data-testid': 'navlink-current' } });

			const link = page.getByTestId('navlink-current');
			await expect.element(link).toHaveAttribute('aria-current', 'page');
		});

		it('should not set aria-current when href does not match current pathname', async () => {
			mockPageStore.set({ url: new URL('http://localhost/') });
			render(NavLink, { props: { href: '/about', label: 'About', 'data-testid': 'navlink-not-current' } });

			const link = page.getByTestId('navlink-not-current');
			await expect.element(link).not.toHaveAttribute('aria-current');
		});
	});

	describe('edge cases', () => {
		it('should render hash link as internal (no target/rel)', async () => {
			render(NavLink, {
				props: {
					href: '#projects',
					label: 'Projects',
					'data-testid': 'navlink-hash'
				}
			});

			const link = page.getByTestId('navlink-hash');
			await expect.element(link).not.toHaveAttribute('target');
			await expect.element(link).not.toHaveAttribute('rel');
		});

		it('should render with empty label without crashing', async () => {
			render(NavLink, {
				props: { href: '/empty', label: '', 'data-testid': 'navlink-empty' }
			});

			const link = page.getByTestId('navlink-empty');
			await expect.element(link).toBeInTheDocument();
		});
	});
});
