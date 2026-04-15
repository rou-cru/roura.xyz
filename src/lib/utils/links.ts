interface LinkResult {
	href: string;
	isInternal: boolean;
	target?: string;
	rel?: string;
}

/**
 * Blocked protocols for security.
 */
const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

/**
 * Builders for canonical link shapes to ensure DRY and consistency.
 */
const buildInternalLink = (href = '#'): LinkResult => ({
	href,
	isInternal: true,
	target: undefined,
	rel: undefined
});

const buildExternalLink = (href: string): LinkResult => ({
	href,
	isInternal: false,
	target: '_blank',
	rel: 'noopener noreferrer'
});

/**
 * Parses a string href into a structured link object.
 * Identifies if the link is internal, external, or a special protocol.
 * Sanitizes URLs to prevent XSS through protocol obfuscation.
 */
export function parseLink(href: string): LinkResult {
	// Defensive: Handle null, undefined or non-string
	const safeHref = typeof href === 'string' ? href.trim() : '';

	/**
	 * Security: Browser URL parsers drop ASCII control characters (U+0000–U+001F and U+007F).
	 * We must strip them manually before doing prefix checks to prevent bypasses
	 * like "jav\tascript:". We use a character filter to avoid ESLint 'no-control-regex'.
	 */
	const sanitizedHref = Array.from(safeHref)
		.filter((ch) => {
			const code = ch.charCodeAt(0);
			return !(code <= 0x1f || code === 0x7f);
		})
		.join('');

	if (!sanitizedHref) {
		return buildInternalLink();
	}

	const normalizedHref = sanitizedHref.toLowerCase();

	// Security: Block malicious protocols (case-insensitive)
	if (BLOCKED_PROTOCOLS.some((p) => normalizedHref.startsWith(p))) {
		return buildInternalLink();
	}

	// Check internal paths (/ # mailto tel) or protocol-less relative paths
	// Ensure // protocol-relative URLs are treated as external
	const isProtocolRelative = normalizedHref.startsWith('//');
	const hasScheme = /^[a-z][a-z0-9+.-]*:/.test(normalizedHref);

	const isInternal =
		(!isProtocolRelative && normalizedHref.startsWith('/')) ||
		normalizedHref.startsWith('#') ||
		normalizedHref.startsWith('mailto:') ||
		normalizedHref.startsWith('tel:') ||
		(!hasScheme && !isProtocolRelative);

	if (isInternal) {
		return buildInternalLink(sanitizedHref);
	}

	// External links
	return buildExternalLink(sanitizedHref);
}
