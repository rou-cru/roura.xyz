/**
 * Sanitizes a string for use as an HTML ID attribute.
 * Normalizes whitespace, removes leading '#', replaces invalid characters with hyphens,
 * and ensures CSS selector compatibility (no leading digits).
 * Returns undefined for empty/whitespace-only input to allow attribute omission.
 */
export function sanitizeId(value?: string | null): string | undefined {
	if (typeof value !== 'string') return undefined;

	const cleaned = value
		.trim() // Remove leading/trailing whitespace
		.replace(/^#+/, '') // Remove one or more leading hashes
		.replace(/[^a-zA-Z0-9_-]/g, '-') // Replace invalid chars with hyphens
		.replace(/-+/g, '-') // Collapse multiple hyphens
		.replace(/^-+/, '') // Strip leading hyphens
		.replace(/-+$/, '') // Strip trailing hyphens
		.toLowerCase(); // Consistent lowercase IDs

	if (cleaned.length === 0) return undefined;

	// Prefix with 'id-' if the ID starts with a digit (CSS selector compatibility)
	return /^\d/.test(cleaned) ? `id-${cleaned}` : cleaned;
}
