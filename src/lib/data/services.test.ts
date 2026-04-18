import { describe, it, expect } from 'vitest';
import { services, type ServiceItem } from './services';

describe('services data', () => {
	it('should export services array with Zod validation', () => {
		expect(services).toBeDefined();
		expect(Array.isArray(services)).toBe(true);
		expect(services.length).toBeGreaterThan(0);
	});

	it('should have valid service structure', () => {
		services.forEach((service: ServiceItem) => {
			expect(service).toHaveProperty('id');
			expect(service).toHaveProperty('title');
			expect(service).toHaveProperty('description');
			expect(service).toHaveProperty('iconPath');
			expect(service.id).toBeTypeOf('string');
			expect(service.title).toBeTypeOf('string');
			expect(service.description).toBeTypeOf('string');
			expect(service.iconPath).toBeTypeOf('string');
		});
	});

	it('should have unique ids', () => {
		const ids = services.map((s: ServiceItem) => s.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it('should include expected services', () => {
		const titles = services.map((s: ServiceItem) => s.title);
		expect(titles).toContain('Platform Engineering');
		expect(titles).toContain('Cloud Architecture');
		expect(titles).toContain('DevOps & CI/CD');
	});
});
