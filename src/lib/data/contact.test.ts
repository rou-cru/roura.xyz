import { describe, it, expect } from 'vitest';
import { contactContent } from './contact';

describe('contact data', () => {
	it('should export valid contact content', () => {
		expect(contactContent).toBeDefined();
		expect(contactContent.title).toBeTypeOf('string');
		expect(contactContent.description).toBeTypeOf('string');
		expect(contactContent.cta).toBeDefined();
	});

	it('should have valid CTA structure', () => {
		expect(contactContent.cta.label).toBeTypeOf('string');
		expect(contactContent.cta.email).toBeTypeOf('string');
		expect(contactContent.cta.email).toContain('@');
	});

	it('should have complete content', () => {
		expect(contactContent.title.length).toBeGreaterThan(0);
		expect(contactContent.description.length).toBeGreaterThan(0);
		expect(contactContent.cta.label.length).toBeGreaterThan(0);
	});
});
