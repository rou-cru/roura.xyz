import { describe, it, expect } from 'vitest';
import { saasShowcase } from './saas';

describe('saas data', () => {
	it('should export saas showcase with Zod validation', () => {
		expect(saasShowcase).toBeDefined();
		expect(saasShowcase.title).toBeTypeOf('string');
		expect(saasShowcase.subtitle).toBeTypeOf('string');
		expect(saasShowcase.imageUrl).toBeTypeOf('string');
		expect(saasShowcase.ctas).toBeDefined();
	});

	it('should have valid CTAs structure', () => {
		expect(saasShowcase.ctas.primary).toBeDefined();
		expect(saasShowcase.ctas.secondary).toBeDefined();
		expect(saasShowcase.ctas.primary.label).toBeTypeOf('string');
		expect(saasShowcase.ctas.secondary.label).toBeTypeOf('string');
	});

	it('should have meaningful content', () => {
		expect(saasShowcase.title.length).toBeGreaterThan(0);
		expect(saasShowcase.subtitle.length).toBeGreaterThan(0);
		expect(saasShowcase.imageUrl.length).toBeGreaterThan(0);
	});

	it('should have valid image URL', () => {
		expect(saasShowcase.imageUrl.startsWith('http')).toBe(true);
	});
});
