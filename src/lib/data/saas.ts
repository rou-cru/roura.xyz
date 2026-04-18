import { z } from 'zod';

/**
 * SaaS showcase section content for live monitoring demonstration.
 * Defines product title, description, image, and call-to-action links.
 */

const SaaSShowcaseSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	imageUrl: z.string(),
	ctas: z.object({
		primary: z.object({
			label: z.string(),
			href: z.string().optional()
		}),
		secondary: z.object({
			label: z.string(),
			href: z.string().optional()
		})
	})
});

export type SaaSShowcase = z.infer<typeof SaaSShowcaseSchema>;

export const saasShowcase = SaaSShowcaseSchema.parse({
	title: 'Production Grade GitOps. Live.',
	subtitle:
		'See my infrastructure monitoring in real-time. Explore metrics, logs, and deployment pipelines.',
	imageUrl: 'https://placehold.co/1200x800/1C1C1E/445A4D?text=Grafana+Dashboard',
	ctas: {
		primary: {
			label: 'VIEW LIVE MONITOR'
		},
		secondary: {
			label: 'VIEW DETAILS'
		}
	}
});
