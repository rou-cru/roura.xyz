import { describe, it, expect } from 'vitest';
import { generateStructuredData } from './structured-data';

describe('structured-data', () => {
	it('should generate structured data array', () => {
		const data = generateStructuredData();
		expect(data).toBeDefined();
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);
	});

	it('should include Person schema', () => {
		const data = generateStructuredData();
		const person = data.find((item) => item['@type'] === 'Person');
		expect(person).toBeDefined();
		expect(person?.name).toBeTypeOf('string');
		expect(person?.['@context']).toBe('https://schema.org');
	});

	it('should include WebSite schema', () => {
		const data = generateStructuredData();
		const website = data.find((item) => item['@type'] === 'WebSite');
		expect(website).toBeDefined();
		expect(website?.name).toBeTypeOf('string');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((website as any)?.url).toBeTypeOf('string');
	});

	it('should include ProfessionalService schemas', () => {
		const data = generateStructuredData();
		const services = data.filter((item) => item['@type'] === 'ProfessionalService');
		expect(services.length).toBeGreaterThan(0);
		services.forEach((service) => {
			expect(service.name).toBeTypeOf('string');
			expect(service.description).toBeTypeOf('string');
		});
	});

	it('should include SoftwareSourceCode schemas', () => {
		const data = generateStructuredData();
		const projects = data.filter((item) => item['@type'] === 'SoftwareSourceCode');
		expect(projects.length).toBeGreaterThan(0);
		projects.forEach((project) => {
			expect(project.name).toBeTypeOf('string');
			expect(project.description).toBeTypeOf('string');
		});
	});
});
