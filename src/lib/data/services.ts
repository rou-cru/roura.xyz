import { z } from 'zod';

/**
 * Professional services offered (Platform Engineering, Cloud Architecture, DevOps).
 * Used to render service cards with titles, descriptions, and icons.
 */

const ServiceItemSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	iconPath: z.string()
});

export type ServiceItem = z.infer<typeof ServiceItemSchema>;

export const services = ServiceItemSchema.array().parse([
	{
		id: 'platform-eng',
		title: 'Platform Engineering',
		description:
			'Designing and building internal developer platforms (IDPs) that accelerate delivery and ensure standardization across teams.',
		iconPath:
			'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
	},
	{
		id: 'cloud-arch',
		title: 'Cloud Architecture',
		description:
			'Architecting secure, scalable, and cost-effective cloud solutions on AWS and Azure using Infrastructure as Code (Terraform/CDK).',
		iconPath:
			'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
	},
	{
		id: 'devops',
		title: 'DevOps & CI/CD',
		description:
			'Automating build, test, and deployment pipelines with GitHub Actions and GitLab CI to achieve zero-downtime releases.',
		iconPath:
			'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
	}
]);
