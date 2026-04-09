/**
 * Parsed link attributes for secure anchor element rendering
 */
export interface ParsedLink {
	/** Original URL or safe fallback */
	href: string;
	/** '_blank' for external links, undefined for internal */
	target: '_blank' | undefined;
	/** Security attributes for external links */
	rel: 'noopener noreferrer' | undefined;
	/** Whether link is internal, mailto, or relative */
	isInternal: boolean;
}

/**
 * Parses and validates a URL, determining if it's internal or external.
 * Returns safe anchor element attributes with XSS protection.
 *
 * @example
 * parseLink('/about')           // Internal: no target/rel
 * parseLink('https://site.com') // External: adds security attrs
 * parseLink('javascript:...')   // Blocked: returns safe fallback
 */
const SAFE_FALLBACK = '#';
const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

export function isBlockedProtocol(value: string): boolean {
	return BLOCKED_PROTOCOLS.some((protocol) => value.startsWith(protocol));
}

export function parseLink(href: string): ParsedLink {
	if (typeof href !== 'string' || href.trim() === '') {
		return {
			href: SAFE_FALLBACK,
			target: undefined,
			rel: undefined,
			isInternal: true
		};
	}

	const normalizedHref = href.trim();
	const loweredHref = normalizedHref.toLowerCase();

	if (isBlockedProtocol(loweredHref)) {
		return {
			href: SAFE_FALLBACK,
			target: undefined,
			rel: undefined,
			isInternal: true
		};
	}

	// Check internal paths (/ # mailto) or protocol-less relative paths
	const isInternal =
		normalizedHref.startsWith('/') ||
		normalizedHref.startsWith('#') ||
		normalizedHref.startsWith('mailto:') ||
		!/^[a-z][a-z0-9+.-]*:/.test(normalizedHref);

	return {
		href: normalizedHref,
		target: isInternal ? undefined : '_blank',
		rel: isInternal ? undefined : 'noopener noreferrer',
		isInternal
	};
}
