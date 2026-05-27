import { describe, it, expect } from 'vitest';
import { siteMetadata } from './site';

describe('site data', () => {
	it('should export valid site metadata', () => {
		expect(siteMetadata).toBeDefined();
		expect(siteMetadata.title).toBe('Alberto Roura - Platform Engineer');
		expect(siteMetadata.author).toBe('Alberto Roura');
		expect(siteMetadata.url).toBe('https://roura.xyz');
		expect(siteMetadata.description).toContain('Platform Engineer');
	});

	it('should have all required fields', () => {
		expect(siteMetadata.title).toBeTypeOf('string');
		expect(siteMetadata.description).toBeTypeOf('string');
		expect(siteMetadata.author).toBeTypeOf('string');
		expect(siteMetadata.url).toBeTypeOf('string');
	});
});
