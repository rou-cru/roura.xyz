/**
 * Site metadata for SEO and social sharing.
 * Title, description, author, and canonical URL.
 */
export interface SiteMetadata {
	title: string;
	description: string;
	author: string;
	url: string;
}

export const siteMetadata: SiteMetadata = {
	title: 'Alberto Roura - Platform Engineer',
	description:
		'Alberto Roura, a Platform Engineer specializing in Cloud-Native, Embedded Systems, SRE, and Operations.',
	author: 'Alberto Roura',
	url: 'https://roura.xyz'
};
