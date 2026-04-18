import { describe, it, expect } from 'vitest';
import { heroContent } from './hero';

describe('hero data', () => {
	it('should export hero content with Zod validation', () => {
		expect(heroContent).toBeDefined();
		expect(heroContent.title).toBeTypeOf('string');
		expect(heroContent.subtitle).toBeTypeOf('string');
		expect(heroContent.cta).toBeDefined();
	});

	it('should have valid CTA structure', () => {
		expect(heroContent.cta.label).toBeTypeOf('string');
		expect(heroContent.cta.href).toBeTypeOf('string');
		expect(heroContent.cta.href.startsWith('#')).toBe(true);
	});

	it('should have meaningful content', () => {
		expect(heroContent.title.length).toBeGreaterThan(10);
		expect(heroContent.subtitle.length).toBeGreaterThan(5);
		expect(heroContent.subtitle).toContain('Alberto Roura');
	});
});
