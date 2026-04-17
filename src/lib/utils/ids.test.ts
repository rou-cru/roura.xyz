import { describe, it, expect } from 'vitest';
import { sanitizeId } from './ids';

describe('sanitizeId', () => {
	it('should return undefined for non-string input', () => {
		expect(sanitizeId(undefined)).toBeUndefined();
		expect(sanitizeId(null)).toBeUndefined();
		expect(sanitizeId(123 as unknown as string)).toBeUndefined();
	});

	it('should return undefined for empty or whitespace string', () => {
		expect(sanitizeId('')).toBeUndefined();
		expect(sanitizeId('   ')).toBeUndefined();
	});

	it('should trim and lowercase', () => {
		expect(sanitizeId('  TestID  ')).toBe('testid');
	});

	it('should replace spaces and multiple spaces with a single hyphen', () => {
		expect(sanitizeId('my section id')).toBe('my-section-id');
		expect(sanitizeId('my   complex   id')).toBe('my-complex-id');
	});

	it('should remove leading hashes', () => {
		expect(sanitizeId('#section')).toBe('section');
		expect(sanitizeId('###header')).toBe('header');
	});

	it('should collapse multiple hyphens', () => {
		expect(sanitizeId('my--section')).toBe('my-section');
	});

	it('should handle complex mixed cases', () => {
		expect(sanitizeId('  ##My  Section--ID  ')).toBe('my-section-id');
	});

	it('should return undefined for a string containing only hashes', () => {
		expect(sanitizeId('#')).toBeUndefined();
		expect(sanitizeId('###')).toBeUndefined();
	});

	it('should not remove non-leading hashes', () => {
		// Only leading hashes are stripped; hashes elsewhere are preserved
		expect(sanitizeId('section#anchor')).toBe('section#anchor');
		expect(sanitizeId('my#id#value')).toBe('my#id#value');
	});

	it('should replace tab and newline whitespace with hyphens', () => {
		expect(sanitizeId('hello\tworld')).toBe('hello-world');
		expect(sanitizeId('hello\nworld')).toBe('hello-world');
		expect(sanitizeId('hello\t\nworld')).toBe('hello-world');
	});

	it('should handle a pure numeric string', () => {
		expect(sanitizeId('123')).toBe('123');
		expect(sanitizeId('  42  ')).toBe('42');
	});

	it('should handle a single hyphen input', () => {
		// A lone hyphen is not empty after processing, so it is returned
		expect(sanitizeId('-')).toBe('-');
	});

	it('should return undefined for boolean false passed as unknown string', () => {
		expect(sanitizeId(false as unknown as string)).toBeUndefined();
	});

	it('should handle a hash followed by spaces (all stripped away)', () => {
		// '#   ' → trim → '#' → strip leading hash → '' → undefined
		expect(sanitizeId('#   ')).toBeUndefined();
	});

	it('should lowercase uppercase ASCII characters', () => {
		expect(sanitizeId('HERO')).toBe('hero');
		expect(sanitizeId('AboutUs')).toBe('aboutus');
	});
});