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

	// Browser URL parsers can normalize/drop control chars; strip them before protocol checks
	const sanitizedHref = safeHref.replace(/[\u0000-\u001F\u007F]/g, '');

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
