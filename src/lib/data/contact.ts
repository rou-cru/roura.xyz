/**
 * Contact section content with call-to-action.
 * Defines invitation message and email contact information.
 */
export interface ContactSection {
	title: string;
	description: string;
	cta: {
		label: string;
		email: string;
	};
}

export const contactContent: ContactSection = {
	title: 'Ready to Start a Project?',
	description:
		'Whether you have a specific idea or just need some engineering advice, feel free to reach out. I am always open to discussing new opportunities and challenges.',
	cta: {
		label: 'Get in Touch',
		email: 'rc@roura.xyz'
	}
};
