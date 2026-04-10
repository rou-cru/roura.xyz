import { describe, it, expect } from 'vitest';
import { parseLink } from './links';

describe('parseLink', () => {
	describe('happy path', () => {
		it('should parse internal path link correctly', () => {
			const result = parseLink('/about');

			expect(result.href).toBe('/about');
			expect(result.isInternal).toBe(true);
			expect(result.target).toBeUndefined();
			expect(result.rel).toBeUndefined();
		});

		it('should parse hash link as internal', () => {
			const result = parseLink('#services');

			expect(result.href).toBe('#services');
			expect(result.isInternal).toBe(true);
			expect(result.target).toBeUndefined();
			expect(result.rel).toBeUndefined();
		});

		it('should parse mailto link as internal (no new tab)', () => {
			const result = parseLink('mailto:test@example.com');

			expect(result.href).toBe('mailto:test@example.com');
			expect(result.isInternal).toBe(true);
			expect(result.target).toBeUndefined();
			expect(result.rel).toBeUndefined();
		});

		it('should parse tel link as internal (no new tab)', () => {
			const result = parseLink('tel:+123456789');

			expect(result.href).toBe('tel:+123456789');
			expect(result.isInternal).toBe(true);
			expect(result.target).toBeUndefined();
			expect(result.rel).toBeUndefined();
		});

		it('should parse external https link correctly', () => {
			const result = parseLink('https://github.com');

			expect(result.href).toBe('https://github.com');
			expect(result.isInternal).toBe(false);
			expect(result.target).toBe('_blank');
			expect(result.rel).toBe('noopener noreferrer');
		});

		it('should parse external http link correctly', () => {
			const result = parseLink('http://example.com');

			expect(result.href).toBe('http://example.com');
			expect(result.isInternal).toBe(false);
			expect(result.target).toBe('_blank');
			expect(result.rel).toBe('noopener noreferrer');
		});
	});

	describe('edge cases', () => {
		it('should treat empty string as invalid and return safe internal link', () => {
			const result = parseLink('');

			expect(result.href).toBe('#');
			expect(result.isInternal).toBe(true);
			expect(result.target).toBeUndefined();
			expect(result.rel).toBeUndefined();
		});

		it('should treat relative paths without leading slash as internal', () => {
			const result = parseLink('about');

			expect(result.href).toBe('about');
			expect(result.isInternal).toBe(true);
			expect(result.target).toBeUndefined();
			expect(result.rel).toBeUndefined();
		});

		it('should handle path with query parameters', () => {
			const result = parseLink('/search?q=test');

			expect(result.href).toBe('/search?q=test');
			expect(result.isInternal).toBe(true);
		});

		it('should treat protocol-relative URLs as external', () => {
			const result = parseLink('//example.com');

			expect(result.href).toBe('//example.com');
			expect(result.isInternal).toBe(false);
			expect(result.target).toBe('_blank');
		});
	});

	describe('defensive - security concerns', () => {
		it('should sanitize javascript: URLs', () => {
			const result = parseLink('javascript:alert(1)');

			expect(result.href).toBe('#');
			expect(result.isInternal).toBe(true);
		});

		it('should sanitize obfuscated javascript: URLs', () => {
			// Strips ASCII control characters like \t \n \r
			const result = parseLink('java\tscript:alert(1)');

			expect(result.href).toBe('#');
			expect(result.isInternal).toBe(true);
		});

		it('should sanitize javascript: URLs case-insensitively', () => {
			const result = parseLink('JAVASCRIPT:alert(1)');

			expect(result.href).toBe('#');
			expect(result.isInternal).toBe(true);
		});

		it('should sanitize data: URLs', () => {
			const result = parseLink('data:text/html,<script>alert(1)</script>');

			expect(result.href).toBe('#');
			expect(result.isInternal).toBe(true);
		});

		it('should return safe default on null input (runtime safety)', () => {
			const result = parseLink(null as unknown as string);

			expect(result.href).toBe('#');
			expect(result.isInternal).toBe(true);
		});
	});
});
