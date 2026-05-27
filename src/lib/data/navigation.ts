/**
 * Navigation links for the global navbar.
 * Defines the sections accessible via the navigation menu.
 */
export interface NavLink {
	id: string;
	label: string;
	href: string;
}

export const navLinks: NavLink[] = [
	{ id: 'projects', label: 'Projects', href: '#projects' },
	{ id: 'experience', label: 'Experience', href: '#experience' },
	{ id: 'services', label: 'Services', href: '#services' },
	{ id: 'saas', label: 'SaaS Showcase', href: '#saas' },
	{ id: 'contact', label: 'Contact', href: '#contact' }
];
