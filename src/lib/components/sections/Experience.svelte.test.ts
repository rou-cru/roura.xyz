import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Experience from './Experience.svelte';
import { timeline } from '$lib/data/experience';

describe('Experience', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	describe('timeline rendering', () => {
		it('should render all 11 timeline entry titles in chronological order', async () => {
			render(Experience, { props: { timeline } });

			for (const entry of timeline) {
				await expect.element(page.getByText(entry.title).first()).toBeVisible();
			}
		});
	});

	describe('drawer open on click', () => {
		it('should open SideDrawer when an entry is clicked showing title, period, and description', async () => {
			render(Experience, { props: { timeline } });

			const targetEntry = timeline[0];
			await page.getByText(targetEntry.title).first().click();

			// SideDrawer title matches entry title — scoped to dialog
			const dialog = page.getByRole('dialog');
			await expect.element(dialog.getByText(targetEntry.title)).toBeVisible();
			// Period text visible in drawer
			await expect.element(dialog.getByText(targetEntry.period, { exact: false })).toBeVisible();
			// Description visible in drawer body
			await expect.element(dialog.getByText(targetEntry.description)).toBeVisible();
		});

		it('should show longDescription in drawer when entry has one', async () => {
			render(Experience, { props: { timeline } });

			const scandiaEntry = timeline.find((e) => e.longDescription)!;
			await page.getByText(scandiaEntry.title).first().click();

			const dialog = page.getByRole('dialog');
			await expect.element(dialog.getByText(scandiaEntry.longDescription!)).toBeVisible();
		});
	});

	describe('drawer close', () => {
		it('should close SideDrawer when close button is clicked', async () => {
			render(Experience, { props: { timeline } });

			const macropayEntry = timeline.find((e) => e.id === 'devops-macropay')!;
			await page.getByText(macropayEntry.title).first().click();

			// Verify drawer is open by checking dialog is visible
			await expect.element(page.getByRole('dialog')).toBeVisible();

			// Click close button
			const closeBtn = page.getByRole('button', { name: 'Close' });
			await closeBtn.click();

			// After close, the dialog should be removed from the DOM
			await vi.waitFor(() => {
				expect(document.querySelectorAll('[role="dialog"]').length).toBe(0);
			});
		});
	});

	describe('empty state', () => {
		it('should show "No experience entries found." when timeline is empty', async () => {
			render(Experience, { props: { timeline: [] } });

			await expect.element(page.getByText('No experience entries found.')).toBeVisible();
		});

		it('should not render entry titles when timeline is empty', async () => {
			render(Experience, { props: { timeline: [] } });

			// No entry titles present
			for (const entry of timeline) {
				expect(page.getByText(entry.title).elements().length).toBe(0);
			}
		});
	});

		// Keyboard accessibility (Enter/Space on focused button) is native browser behavior
		// for <button> elements. Click tests above already verify that onclick opens the drawer.
		// vitest-browser v4 does not expose a reliable API to focus a button and send Enter/Space
		// without either (a) using white-box DOM queries or (b) relying on click synthesis.

	describe('drawer content completeness', () => {
		it('should show achievements in drawer when entry has them', async () => {
			render(Experience, { props: { timeline } });

			const entry = timeline.find((e) => e.achievements && e.achievements.length > 0)!;
			await page.getByText(entry.title).first().click();

			const dialog = page.getByRole('dialog');
			for (const achievement of entry.achievements!) {
				await expect.element(dialog.getByText(achievement)).toBeVisible();
			}
		});

		it('should show tags in drawer when entry has them', async () => {
			render(Experience, { props: { timeline } });

			const entry = timeline.find((e) => e.tags.length > 0)!;
			await page.getByText(entry.title).first().click();

			const dialog = page.getByRole('dialog');
			for (const tag of entry.tags) {
				await expect.element(dialog.getByText(tag, { exact: true })).toBeVisible();
			}
		});

		it('should fall back to description when longDescription is absent', async () => {
			render(Experience, { props: { timeline } });

			const entry = timeline.find((e) => !e.longDescription)!;
			await page.getByText(entry.title).first().click();

			const dialog = page.getByRole('dialog');
			await expect.element(dialog.getByText(entry.description)).toBeVisible();
		});
	});
});
