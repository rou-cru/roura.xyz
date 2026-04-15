/**
 * Sanitizes a string for use as an HTML ID attribute.
 * Normalizes whitespace, removes leading '#', replaces spaces with hyphens.
 * Returns undefined for empty/whitespace-only input to allow attribute omission.
 */
export function sanitizeId(value?: string | null): string | undefined {
	if (typeof value !== 'string') return undefined;

	const cleaned = value
		.trim()
		.replace(/^#+/, '') // Remove one or more leading hashes
		.replace(/\s+/g, '-') // Replace whitespace with hyphens
		.replace(/-+/g, '-') // Collapse multiple hyphens
		.toLowerCase(); // Consistent lowercase IDs

	return cleaned.length > 0 ? cleaned : undefined;
}
