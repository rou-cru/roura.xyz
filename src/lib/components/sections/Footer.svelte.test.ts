import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Footer from './Footer.svelte';
import type { FooterContent } from '$lib/data/footer';

const mockContent: FooterContent = {
	copyright: '© 2026 Test User. All rights reserved.',
	socials: [
		{ label: 'GitHub', href: 'https://github.com/test', icon: 'M12 0C5.37 0 0 5.37 0 12z' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/test', icon: 'M19 0h-14C2.24 0 0 2.24 0 5z' }
	]
};

describe('Footer', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should render copyright text', async () => {
		render(Footer, { props: { content: mockContent } });

		await expect.element(page.getByText(mockContent.copyright)).toBeVisible();
	});

	it('should render all social links with correct hrefs', async () => {
		render(Footer, { props: { content: mockContent } });

		for (const social of mockContent.socials) {
			const link = page.getByRole('link', { name: social.label });
			await expect.element(link).toBeVisible();
			await expect.element(link).toHaveAttribute('href', social.href);
		}
	});

	it('should open social links in a new tab with secure rel', async () => {
		render(Footer, { props: { content: mockContent } });

		for (const social of mockContent.socials) {
			const link = page.getByRole('link', { name: social.label });
			await expect.element(link).toHaveAttribute('target', '_blank');
			await expect.element(link).toHaveAttribute('rel', 'noopener noreferrer');
		}
	});

	it('should render SVG icon for each social link', async () => {
		render(Footer, { props: { content: mockContent } });

		const icons = document.querySelectorAll('nav svg[aria-hidden="true"]');
		expect(icons.length).toBe(mockContent.socials.length);
	});
});
