import { describe, it, expect } from 'vitest';
import { footerContent } from './footer';

describe('footer data', () => {
	it('should export valid footer content', () => {
		expect(footerContent).toBeDefined();
		expect(footerContent.copyright).toBeTypeOf('string');
		expect(footerContent.socials).toBeDefined();
		expect(Array.isArray(footerContent.socials)).toBe(true);
	});

	it('should have valid social links structure', () => {
		footerContent.socials.forEach((social) => {
			expect(social).toHaveProperty('label');
			expect(social).toHaveProperty('href');
			expect(social).toHaveProperty('icon');
			expect(social.label).toBeTypeOf('string');
			expect(social.href).toBeTypeOf('string');
			expect(social.icon).toBeTypeOf('string');
		});
	});

	it('should have copyright with year', () => {
		expect(footerContent.copyright).toContain('2026');
		expect(footerContent.copyright).toContain('Alberto Roura');
	});

	it('should have expected social platforms', () => {
		const labels = footerContent.socials.map((s) => s.label);
		expect(labels).toContain('GitHub');
		expect(labels).toContain('LinkedIn');
		expect(labels).toContain('Gumroad');
	});
});
