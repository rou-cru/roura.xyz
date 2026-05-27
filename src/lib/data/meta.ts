import type { SiteMetadata } from './site';

/**
 * Tag object representing a single HTML head element
 * for injection via {@link https://svelte.dev/docs/svelte/svelte-head | <svelte:head>}.
 */
export interface MetaTag {
	tag: 'title' | 'meta';
	attributes: Record<string, string>;
}

/**
 * Optional page-level overrides for title and description.
 * Nullish or empty values fall back to the base site metadata.
 */
export interface PageMetaOverrides {
	title?: string;
	description?: string;
}

/**
 * Generates HTML meta tag objects from base site metadata,
 * merging optional page-level overrides.
 *
 * Returns tag objects suitable for direct iteration in a Svelte
 * `<svelte:head>` block. Title is represented as
 * `{ tag: 'title', attributes: { '': 'value' } }`.
 *
 * @param base   Base site metadata (title, description, url, author).
 * @param overrides Optional page-specific title/description overrides.
 * @returns Array of `MetaTag` objects for <title>, <meta description>, OG, and Twitter.
 */
export function generateMeta(
	base: SiteMetadata,
	overrides?: PageMetaOverrides
): MetaTag[] {
	const title = overrides?.title || base.title;
	const description = overrides?.description || base.description;

	return [
		{ tag: 'title', attributes: { '': title } },
		{ tag: 'meta', attributes: { name: 'description', content: description } },
		{ tag: 'meta', attributes: { property: 'og:title', content: title } },
		{
			tag: 'meta',
			attributes: { property: 'og:description', content: description }
		},
		{ tag: 'meta', attributes: { property: 'og:type', content: 'website' } },
		{ tag: 'meta', attributes: { property: 'og:url', content: base.url } },
		{
			tag: 'meta',
			attributes: { name: 'twitter:card', content: 'summary_large_image' }
		},
		{ tag: 'meta', attributes: { name: 'twitter:title', content: title } },
		{
			tag: 'meta',
			attributes: { name: 'twitter:description', content: description }
		}
	];
}
