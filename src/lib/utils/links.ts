/**
 * Blocked protocols for security.
 */
const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

/**
 * Parses a string href into a structured link object.
 * Identifies if the link is internal, external, or a special protocol.
 */
export function parseLink(href: string) {
	// Defensive: Handle null, undefined or non-string
	const safeHref = typeof href === 'string' ? href.trim() : '';

	if (!safeHref) {
		return {
			href: '#',
			isInternal: true,
			target: undefined,
			rel: undefined
		};
	}

	const normalizedHref = safeHref.toLowerCase();

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
	const isInternal =
		normalizedHref.startsWith('/') ||
		normalizedHref.startsWith('#') ||
		normalizedHref.startsWith('mailto:') ||
		normalizedHref.startsWith('tel:') ||
		!/^[a-z][a-z0-9+.-]*:/.test(normalizedHref);

	if (isInternal) {
		return {
			href: safeHref,
			isInternal: true,
			target: undefined,
			rel: undefined
		};
	}

	// External links
	return {
		href: safeHref,
		isInternal: false,
		target: '_blank',
		rel: 'noopener noreferrer'
	};
}
