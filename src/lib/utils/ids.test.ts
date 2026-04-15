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
});
