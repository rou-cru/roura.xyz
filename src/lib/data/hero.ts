import { z } from 'zod';

/**
 * Hero section content for the landing page.
 * Contains main headline, subtitle, and primary call-to-action.
 */

const HeroContentSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	cta: z.object({
		label: z.string(),
		href: z.string()
	})
});

export type HeroContent = z.infer<typeof HeroContentSchema>;

export const heroContent = HeroContentSchema.parse({
	title: 'The Why is Business. The What is Architecture. The How is Engineering.',
	subtitle: 'Alberto Roura | Platform Engineer',
	cta: {
		label: 'EXPLORE MY WORK',
		href: '#projects'
	}
});
