import { describe, it, expect } from 'vitest';
import { generateMeta } from './meta';
import { siteMetadata } from './site';

describe('meta generation', () => {
	it('generates base meta tags from site metadata', () => {
		const tags = generateMeta(siteMetadata);

		expect(tags).toBeDefined();
		expect(tags.length).toBeGreaterThan(0);

		const titleTag = tags.find((t) => t.tag === 'title');
		expect(titleTag).toBeDefined();
		expect(titleTag?.attributes['']).toBe(siteMetadata.title);

		const descTag = tags.find(
			(t) => t.tag === 'meta' && t.attributes.name === 'description'
		);
		expect(descTag).toBeDefined();
		expect(descTag?.attributes.content).toBe(siteMetadata.description);

		const ogType = tags.find(
			(t) => t.tag === 'meta' && t.attributes.property === 'og:type'
		);
		expect(ogType).toBeDefined();
		expect(ogType?.attributes.content).toBe('website');

		const ogUrl = tags.find(
			(t) => t.tag === 'meta' && t.attributes.property === 'og:url'
		);
		expect(ogUrl).toBeDefined();
		expect(ogUrl?.attributes.content).toBe(siteMetadata.url);

		const twitterCard = tags.find(
			(t) => t.tag === 'meta' && t.attributes.name === 'twitter:card'
		);
		expect(twitterCard).toBeDefined();
		expect(twitterCard?.attributes.content).toBe('summary_large_image');
	});

	it('returns MetaTag objects with correct shape', () => {
		const tags = generateMeta(siteMetadata);

		for (const tag of tags) {
			expect(tag).toHaveProperty('tag');
			expect(tag).toHaveProperty('attributes');
			expect(tag.tag).toMatch(/^(title|meta)$/);
			expect(typeof tag.attributes).toBe('object');
		}
	});

	it('merges partial overrides while preserving base values', () => {
		const overrides = { title: 'Custom Title' };
		const tags = generateMeta(siteMetadata, overrides);

		const titleTag = tags.find((t) => t.tag === 'title');
		expect(titleTag?.attributes['']).toBe('Custom Title');

		const descTag = tags.find(
			(t) => t.tag === 'meta' && t.attributes.name === 'description'
		);
		expect(descTag?.attributes.content).toBe(siteMetadata.description);

		const ogTitle = tags.find(
			(t) => t.tag === 'meta' && t.attributes.property === 'og:title'
		);
		expect(ogTitle?.attributes.content).toBe('Custom Title');

		const ogDesc = tags.find(
			(t) => t.tag === 'meta' && t.attributes.property === 'og:description'
		);
		expect(ogDesc?.attributes.content).toBe(siteMetadata.description);

		const twitterTitle = tags.find(
			(t) => t.tag === 'meta' && t.attributes.name === 'twitter:title'
		);
		expect(twitterTitle?.attributes.content).toBe('Custom Title');
	});

	it('ignores empty string override and falls back to base', () => {
		const overrides = { title: '', description: '' };
		const tags = generateMeta(siteMetadata, overrides);

		const titleTag = tags.find((t) => t.tag === 'title');
		expect(titleTag?.attributes['']).toBe(siteMetadata.title);

		const descTag = tags.find(
			(t) => t.tag === 'meta' && t.attributes.name === 'description'
		);
		expect(descTag?.attributes.content).toBe(siteMetadata.description);
	});

	it('handles empty overrides object cleanly', () => {
		const tags = generateMeta(siteMetadata, {});

		const titleTag = tags.find((t) => t.tag === 'title');
		expect(titleTag?.attributes['']).toBe(siteMetadata.title);

		expect(tags.length).toBe(9);
	});

	it('handles undefined overrides', () => {
		const tags = generateMeta(siteMetadata, undefined);

		const titleTag = tags.find((t) => t.tag === 'title');
		expect(titleTag?.attributes['']).toBe(siteMetadata.title);
		expect(tags.length).toBe(9);
	});

	it('returns consistent tag count', () => {
		const tags = generateMeta(siteMetadata);
		expect(tags.length).toBe(9);
	});

	it('all title tags use the title tag type', () => {
		const tags = generateMeta(siteMetadata);
		const titleTags = tags.filter((t) => t.tag === 'title');
		expect(titleTags.length).toBe(1);
	});

	it('all entries include og:type = website', () => {
		const tags = generateMeta(siteMetadata);
		const ogType = tags.find(
			(t) => t.tag === 'meta' && t.attributes.property === 'og:type'
		);
		expect(ogType?.attributes.content).toBe('website');
	});
});
