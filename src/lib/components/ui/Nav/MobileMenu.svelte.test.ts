import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import MobileMenu from './MobileMenu.svelte';
import type { NavLink } from '$lib/data/navigation';

const mockLinks: NavLink[] = [
	{ id: 'home', label: 'Home', href: '#home' },
	{ id: 'about', label: 'About', href: '/about' }
];

describe('MobileMenu', () => {
	beforeEach(async () => {
		document.body.innerHTML = '';
		await cleanup();
	});

	describe('open state', () => {
		it('should show links when isOpen is true', async () => {
			render(MobileMenu, {
				props: { links: mockLinks, isOpen: true, onClose: () => {} }
			});

			await expect.element(page.getByText('Home').first()).toBeVisible();
			await expect.element(page.getByText('About').first()).toBeVisible();
		});

		it('should show no links when isOpen is true and links array is empty', async () => {
			render(MobileMenu, {
				props: { links: [], isOpen: true, onClose: () => {} }
			});

			expect(page.getByRole('link').elements().length).toBe(0);
		});
	});

	describe('closed state', () => {
		it('should not show links when isOpen is false', async () => {
			render(MobileMenu, {
				props: { links: mockLinks, isOpen: false, onClose: () => {} }
			});

			expect(document.body.textContent).not.toContain('Home');
		});
	});

	describe('interactions', () => {
		it('should call onClose when a nav link is clicked', async () => {
			let closed = false;
			render(MobileMenu, {
				props: {
					links: mockLinks,
					isOpen: true,
					onClose: () => {
						closed = true;
					}
				}
			});

			const homeLink = page.getByText('Home');
			await expect.element(homeLink.first()).toBeVisible();
			await homeLink.first().click();
			expect(closed).toBe(true);
		});

		it('should call onClose when Escape is pressed while open', async () => {
			let closed = false;
			render(MobileMenu, {
				props: {
					links: mockLinks,
					isOpen: true,
					onClose: () => {
						closed = true;
					}
				}
			});

			await expect.element(page.getByText('Home').first()).toBeVisible();
			await userEvent.keyboard('{Escape}');
			expect(closed).toBe(true);
		});

		it('should render nav with id="mobile-nav" when open', async () => {
			render(MobileMenu, {
				props: { links: mockLinks, isOpen: true, onClose: () => {} }
			});

			const nav = document.getElementById('mobile-nav');
			expect(nav).not.toBeNull();
		});
	});
});
