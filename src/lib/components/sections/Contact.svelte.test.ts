import { describe, it, expect, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Contact from './Contact.svelte';
import type { ContactSection } from '$lib/data/contact';

const validContent: ContactSection = {
	title: 'Ready to Start a Project?',
	description:
		'Whether you have a specific idea or just need some engineering advice, feel free to reach out.',
	cta: {
		label: 'Get in Touch',
		email: 'rc@roura.xyz'
	}
};

const emptyEmailContent: ContactSection = {
	title: 'Contact Us',
	description: 'Reach out for collaboration.',
	cta: {
		label: 'Send Message',
		email: ''
	}
};

describe('Contact', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	describe('content rendering', () => {
		it('should render title, description, and CTA label from content prop', async () => {
			render(Contact, { props: { content: validContent } });

			await expect.element(page.getByText(validContent.title)).toBeVisible();
			await expect.element(page.getByText(validContent.description)).toBeVisible();
			await expect.element(page.getByText(validContent.cta.label)).toBeVisible();
		});

		it('should render title and description for a different content variant', async () => {
			render(Contact, { props: { content: emptyEmailContent } });

			await expect.element(page.getByText(emptyEmailContent.title)).toBeVisible();
			await expect.element(page.getByText(emptyEmailContent.description)).toBeVisible();
		});
	});

	describe('CTA button', () => {
		it('should render CTA as a link with mailto href containing the configured email', async () => {
			render(Contact, { props: { content: validContent } });

			const link = page.getByRole('link', { name: validContent.cta.label });
			await expect.element(link).toBeVisible();
			await expect.element(link).toHaveAttribute('href', `mailto:${validContent.cta.email}`);
		});

		it('should hide the CTA button when email is empty', async () => {
			render(Contact, { props: { content: emptyEmailContent } });

			await expect
				.element(page.getByRole('link', { name: emptyEmailContent.cta.label }))
				.not.toBeInTheDocument();

			// Title and description should still be visible even without CTA
			await expect.element(page.getByText(emptyEmailContent.title)).toBeVisible();
			await expect.element(page.getByText(emptyEmailContent.description)).toBeVisible();
		});
	});
});
