/**
 * Blocked protocols for security.
 */
const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

/**
 * Parses a string href into a structured link object.
 * Identifies if the link is internal, external, or a special protocol.
 * Sanitizes URLs to prevent XSS through protocol obfuscation.
 */
export function parseLink(href: string) {
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
		return {
			href: '#',
			isInternal: true,
			target: undefined,
			rel: undefined
		};
	}

	const normalizedHref = sanitizedHref.toLowerCase();

	// Security: Block malicious protocols (case-insensitive)
	if (BLOCKED_PROTOCOLS.some((p) => normalizedHref.startsWith(p))) {
		return {
			href: '#',
			isInternal: true,
			target: undefined,
			rel: undefined
		};
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
		return {
			href: sanitizedHref,
			isInternal: true,
			target: undefined,
			rel: undefined
		};
	}

	// External links
	return {
		href: sanitizedHref,
		isInternal: false,
		target: '_blank',
		rel: 'noopener noreferrer'
	};
}
