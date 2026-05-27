import { describe, it, expect } from 'vitest';
import { technologies, type Technology } from './technologies';

describe('technologies data', () => {
	it('should export technologies array with Zod validation', () => {
		expect(technologies).toBeDefined();
		expect(Array.isArray(technologies)).toBe(true);
		expect(technologies.length).toBeGreaterThan(0);
	});

	it('should have valid technology structure', () => {
		technologies.forEach((tech: Technology) => {
			expect(tech).toHaveProperty('name');
			expect(tech).toHaveProperty('simpleIconSlug');
			expect(tech).toHaveProperty('category');
			expect(tech.name).toBeTypeOf('string');
			expect(tech.simpleIconSlug).toBeTypeOf('string');
			expect(tech.category).toBeTypeOf('string');
		});
	});

	it('should have valid categories', () => {
		const validCategories = [
			'cloud',
			'containers',
			'cicd',
			'tools',
			'observability',
			'programming',
			'security'
		];
		technologies.forEach((tech: Technology) => {
			expect(validCategories).toContain(tech.category);
		});
	});

	it('should include expected technologies', () => {
		const names = technologies.map((t: Technology) => t.name);
		expect(names).toContain('Kubernetes');
		expect(names).toContain('AWS');
		expect(names).toContain('Terraform');
		expect(names).toContain('Docker');
	});
});
