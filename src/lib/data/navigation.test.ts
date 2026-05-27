import { describe, it, expect } from 'vitest';
import { navLinks } from './navigation';

describe('navigation data', () => {
	it('should export navigation links array', () => {
		expect(navLinks).toBeDefined();
		expect(Array.isArray(navLinks)).toBe(true);
		expect(navLinks.length).toBeGreaterThan(0);
	});

	it('should have valid nav link structure', () => {
		navLinks.forEach((link) => {
			expect(link).toHaveProperty('id');
			expect(link).toHaveProperty('label');
			expect(link).toHaveProperty('href');
			expect(link.id).toBeTypeOf('string');
			expect(link.label).toBeTypeOf('string');
			expect(link.href).toBeTypeOf('string');
		});
	});

	it('should have expected navigation sections', () => {
		const ids = navLinks.map((link) => link.id);
		expect(ids).toContain('projects');
		expect(ids).toContain('experience');
		expect(ids).toContain('services');
		expect(ids).toContain('contact');
	});
});
