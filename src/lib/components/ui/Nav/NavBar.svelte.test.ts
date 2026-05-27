import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import NavBar from './NavBar.svelte';
import type { NavLink } from '$lib/data/navigation';

const mockLinks: NavLink[] = [
	{ id: 'home', label: 'Home', href: '#home' },
	{ id: 'about', label: 'About', href: '/about' },
	{ id: 'contact', label: 'Contact', href: '#contact' }
];

describe('NavBar', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		window.scrollTo(0, 0);
	});

	describe('rendering', () => {
		it('should render logo text as a link to the home page', async () => {
			render(NavBar, {
				props: { links: mockLinks, logoText: 'ACME' }
			});

			const logo = page.getByRole('link', { name: 'ACME' });
			await expect.element(logo).toBeVisible();
			await expect.element(logo).toHaveAttribute('href', '/');
			await expect.element(logo).toHaveAttribute('aria-label', 'ACME');
		});

		it('should render all navigation links in the DOM', async () => {
			render(NavBar, {
				props: { links: mockLinks, logoText: 'Test' }
			});

			for (const link of mockLinks) {
				const linkEl = page.getByText(link.label);
				await expect.element(linkEl.first()).toBeInTheDocument();
			}
		});

		it('should render header with banner role', async () => {
			render(NavBar, { props: { links: mockLinks, logoText: 'Test' } });

			const header = page.getByRole('banner');
			await expect.element(header).toBeInTheDocument();
		});

		it('should render a hamburger button with accessible label, collapsed state, and aria-controls', async () => {
			render(NavBar, {
				props: { links: mockLinks, logoText: 'Test' }
			});

			const button = page.getByRole('button', { name: 'Toggle menu' });
			await expect.element(button).toBeVisible();
			await expect.element(button).toHaveAttribute('aria-expanded', 'false');
			await expect.element(button).toHaveAttribute('aria-controls', 'mobile-nav');
		});
	});

	describe('interaction', () => {
		it('should toggle aria-expanded when hamburger button is clicked', async () => {
			render(NavBar, {
				props: { links: mockLinks, logoText: 'Test' }
			});

			const button = page.getByRole('button', { name: 'Toggle menu' });

			await button.click();
			await expect.element(button).toHaveAttribute('aria-expanded', 'true');

			await button.click();
			await expect.element(button).toHaveAttribute('aria-expanded', 'false');
		});
	});

	describe('edge cases', () => {
		it('should render without crash when links array is empty', async () => {
			render(NavBar, {
				props: { links: [], logoText: 'Solo' }
			});

			const logo = page.getByText('Solo');
			await expect.element(logo.first()).toBeVisible();

			const button = page.getByRole('button', { name: 'Toggle menu' });
			await expect.element(button).toBeVisible();
		});

		it('should toggle aria-expanded even when links array is empty', async () => {
			render(NavBar, {
				props: { links: [], logoText: 'Solo' }
			});

			const button = page.getByRole('button', { name: 'Toggle menu' });

			await button.click();
			await expect.element(button).toHaveAttribute('aria-expanded', 'true');
		});
	});
});
