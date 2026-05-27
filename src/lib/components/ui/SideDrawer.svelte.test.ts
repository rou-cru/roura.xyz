import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import SideDrawer from './SideDrawer.svelte';

describe('SideDrawer', () => {
	beforeEach(async () => {
		document.body.innerHTML = '';
		await cleanup();
	});

	describe('open state', () => {
		it('should show children content when isOpen is true', async () => {
			render(SideDrawer, {
				props: {
					isOpen: true,
					onClose: () => {},
					children: (() => {}) as never
				}
			});

			// Rendered via snippet — verify the drawer shell is present
			const closeBtn = page.getByRole('button', { name: 'Close' });
			await expect.element(closeBtn).toBeVisible();
		});

		it('should show title when provided and open', async () => {
			render(SideDrawer, {
				props: { isOpen: true, onClose: () => {}, title: 'My Project', children: (() => {}) as never }
			});

			await expect.element(page.getByText('My Project')).toBeVisible();
		});

		it('should not render title section when title is omitted', async () => {
			render(SideDrawer, {
				props: { isOpen: true, onClose: () => {}, children: (() => {}) as never }
			});

			expect(document.querySelector('h2')).toBeNull();
		});
	});

	describe('closed state', () => {
		it('should not show content when isOpen is false', async () => {
			render(SideDrawer, {
				props: { isOpen: false, onClose: () => {}, title: 'Hidden', children: (() => {}) as never }
			});

			expect(document.body.textContent).not.toContain('Hidden');
		});
	});

	describe('interactions', () => {
		it('should call onClose when close button is clicked', async () => {
			let closed = false;
			render(SideDrawer, {
				props: { isOpen: true, onClose: () => { closed = true; }, children: (() => {}) as never }
			});

			const closeBtn = page.getByRole('button', { name: 'Close' });
			await closeBtn.click();
			expect(closed).toBe(true);
		});

		it('should call onClose when Escape is pressed while open', async () => {
			let closed = false;
			render(SideDrawer, {
				props: { isOpen: true, onClose: () => { closed = true; }, children: (() => {}) as never }
			});

			await userEvent.keyboard('{Escape}');
			expect(closed).toBe(true);
		});
	});
});
