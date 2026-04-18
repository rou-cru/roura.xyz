import { describe, it, expect } from 'vitest';
import { timeline, type TimelineEntry } from './experience';

describe('experience data', () => {
	it('should export timeline array with Zod validation', () => {
		expect(timeline).toBeDefined();
		expect(Array.isArray(timeline)).toBe(true);
		expect(timeline.length).toBeGreaterThan(0);
	});

	it('should have valid timeline entry structure', () => {
		timeline.forEach((entry: TimelineEntry) => {
			expect(entry).toHaveProperty('id');
			expect(entry).toHaveProperty('title');
			expect(entry).toHaveProperty('subtitle');
			expect(entry).toHaveProperty('year');
			expect(entry).toHaveProperty('startDate');
			expect(entry).toHaveProperty('period');
			expect(entry).toHaveProperty('description');
			expect(entry).toHaveProperty('icon');
			expect(entry).toHaveProperty('tags');
			expect(entry).toHaveProperty('type');

			expect(entry.id).toBeTypeOf('string');
			expect(entry.title).toBeTypeOf('string');
			expect(entry.subtitle).toBeTypeOf('string');
			expect(typeof entry.year).toBe('number');
			expect(entry.startDate).toBeTypeOf('string');
			expect(entry.period).toBeTypeOf('string');
			expect(entry.description).toBeTypeOf('string');
			expect(entry.icon).toBeTypeOf('string');
			expect(Array.isArray(entry.tags)).toBe(true);
			expect(['education', 'work']).toContain(entry.type);
		});
	});

	it('should have unique ids', () => {
		const ids = timeline.map((e: TimelineEntry) => e.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it('should have both education and work entries', () => {
		const types = timeline.map((e: TimelineEntry) => e.type);
		expect(types).toContain('education');
		expect(types).toContain('work');
	});

	it('should be ordered chronologically by start date', () => {
		for (let i = 1; i < timeline.length; i++) {
			const prev = timeline[i - 1];
			const curr = timeline[i];
			expect(curr.startDate >= prev.startDate).toBe(true);
		}
	});

	it('should have current position marked', () => {
		const currentEntries = timeline.filter((e: TimelineEntry) => e.current);
		expect(currentEntries.length).toBeGreaterThan(0);
	});
});
