import { siteMetadata } from './site';
import { services } from './services';
import { projects } from './projects';

/**
 * Generates JSON-LD structured data for SEO and AI search.
 * Returns Person and WebSite schemas.
 */
export function generateStructuredData() {
	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteMetadata.author,
		url: siteMetadata.url,
		jobTitle: 'Platform Engineer & DevOps Architect',
		description: siteMetadata.description,
		email: 'rc@roura.xyz',
		sameAs: [
			'https://github.com/rou-cru',
			'https://www.linkedin.com/in/albertoroura',
			'https://store.roura.xyz'
		],
		knowsAbout: [
			'Platform Engineering',
			'Cloud Architecture',
			'Kubernetes',
			'DevOps',
			'CI/CD',
			'Infrastructure as Code',
			'Site Reliability Engineering',
			'Internal Developer Platforms'
		]
	};

	const website = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteMetadata.title,
		url: siteMetadata.url,
		description: siteMetadata.description,
		author: {
			'@type': 'Person',
			name: siteMetadata.author
		}
	};

	const professionalServices = services.map((service) => ({
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: service.title,
		description: service.description,
		provider: {
			'@type': 'Person',
			name: siteMetadata.author,
			url: siteMetadata.url
		}
	}));

	const softwareProjects = projects.map((project) => ({
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: project.title,
		description: project.longDescription || project.description,
		author: {
			'@type': 'Person',
			name: siteMetadata.author
		},
		keywords: project.tags.join(', ')
	}));

	return [person, website, ...professionalServices, ...softwareProjects];
}
