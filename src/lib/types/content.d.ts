/**
 * Core content types for roura.xyz
 *
 * Migrated from dkstudio.com with improvements:
 * - readonly arrays for immutable data
 * - JSDoc documentation
 * - Consistent interface usage
 */

/**
 * Global site metadata used for SEO and site configuration
 */
export interface SiteMetadata {
	title: string;
	description: string;
	author: string;
	url: string;
}

/**
 * Navigation link structure for header and footer menus
 */
export interface NavLink {
	id: string;
	label: string;
	href: string;
}

/**
 * CTA (Call to Action) button configuration
 */
export interface CTALink {
	label: string;
	href: string;
}

/**
 * Hero section content structure
 */
export interface HeroContent {
	title: string;
	subtitle: string;
	cta: CTALink;
}

/**
 * Service item displayed in services/offerings sections
 */
export interface ServiceItem {
	id: string;
	title: string;
	description: string;
	/** SVG path d attribute for icon rendering */
	iconPath: string;
}

/**
 * External link reference for projects
 */
export interface ProjectLink {
	label: string;
	href?: string;
}

/**
 * Project showcase entry with optional detail fields
 */
export interface Project {
	id: string;
	title: string;
	description: string;
	/** Placeholder image or diagram URL */
	imageUrl: string;
	/** Technology tags - immutable */
	readonly tags: string[];
	/** Featured projects get highlighted treatment */
	featured?: boolean;
	/** Optional timeframe display (e.g., "Apr 2024 - Present") */
	subtitle?: string;
	/** Extended description for detail views */
	longDescription?: string;
	/** Achievement bullet points - immutable */
	readonly achievements?: string[];
	/** Action links (View docs, GitHub, etc.) - immutable */
	readonly links?: readonly ProjectLink[];
}

/**
 * CTA button pair for SaaS showcase section
 */
export interface SaaSCTAs {
	primary: {
		label: string;
		href?: string;
	};
	secondary?: {
		label: string;
		href?: string;
	};
}

/**
 * SaaS product showcase section content
 */
export interface SaaSShowcase {
	title: string;
	subtitle: string;
	/** Monitor mockup image URL */
	imageUrl: string;
	ctas: SaaSCTAs;
}

/**
 * Social media link for footer
 */
export interface SocialLink {
	label: string;
	href: string;
	/** Icon identifier for future icon integration */
	icon?: string;
}

/**
 * Footer content configuration
 */
export interface FooterContent {
	copyright: string;
	/** Social media links - immutable */
	readonly socials: readonly SocialLink[];
}

/**
 * Email contact CTA configuration
 */
export interface ContactCTA {
	label: string;
	email: string;
}

/**
 * Contact section content
 */
export interface ContactSection {
	title: string;
	description: string;
	cta: ContactCTA;
}

/**
 * Technology stack entry for skills/tech sections
 */
export interface Technology {
	name: string;
	/** Simple Icons slug for icon lookup (e.g., "svelte", "typescript") */
	simpleIconSlug: string;
	category: string;
}
