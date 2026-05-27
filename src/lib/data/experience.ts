import { z } from 'zod';
import { mdiSchool, mdiBriefcaseOutline } from '@mdi/js';

/**
 * Unified career timeline entries (education + professional experience).
 * Ordered chronologically from earliest to most recent.
 *
 * `year` is used on the timeline dot — only shown once per unique year.
 * `period` is the detailed date range shown inside the side drawer.
 */

const TimelineEntrySchema = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string(),
	year: z.number(),
	startDate: z.string(),
	endDate: z.string().nullable(),
	period: z.string(),
	description: z.string(),
	longDescription: z.string().optional(),
	icon: z.string(),
	imageUrl: z.string().optional(),
	tags: z.array(z.string()),
	type: z.enum(['education', 'work']),
	current: z.boolean().optional(),
	achievements: z.array(z.string()).optional(),
	links: z
		.array(
			z.object({
				label: z.string(),
				href: z.string().optional()
			})
		)
		.optional()
});

export type TimelineEntry = z.infer<typeof TimelineEntrySchema>;

export const timeline = TimelineEntrySchema.array().parse([
	{
		id: 'university',
		title: 'B.S. Mechatronics Engineering',
		subtitle: 'Universidad Tecnológica Metropolitana',
		year: 2015,
		startDate: '2015-08',
		endDate: '2019-05',
		period: 'Aug 2015 – May 2019',
		description:
			'Studied Mechatronics Engineering with focus on embedded systems, control theory, and electronics.',
		icon: mdiSchool,
		tags: ['Mechatronics', 'Embedded Systems', 'Control Theory', 'Electronics'],
		type: 'education'
	},
	{
		id: 'intern-sistemas-box-hw',
		title: 'Hardware Designer',
		subtitle: 'Sistemas Box',
		year: 2017,
		startDate: '2017-03',
		endDate: '2017-09',
		period: 'Mar 2017 – Sep 2017',
		description: 'Prototyped ultrasonic level sensors for industrial measurement applications.',
		icon: mdiBriefcaseOutline,
		tags: [],
		type: 'work'
	},
	{
		id: 'intern-sistemas-box-fw',
		title: 'Firmware Developer',
		subtitle: 'Sistemas Box',
		year: 2019,
		startDate: '2019-01',
		endDate: '2019-04',
		period: 'Jan 2019 – Apr 2019',
		description:
			'Developed Zigbee communication libraries for 8-bit microcontrollers enabling wireless sensor networks.',
		icon: mdiBriefcaseOutline,
		tags: [],
		type: 'work'
	},
	{
		id: 'intern-grupo-plenum',
		title: 'IT Engineer',
		subtitle: 'Grupo Plenum',
		year: 2019,
		startDate: '2019-02',
		endDate: '2019-07',
		period: 'Feb 2019 – Jul 2019',
		description:
			'Assisted with enterprise network maintenance, infrastructure troubleshooting, and end-user support.',
		icon: mdiBriefcaseOutline,
		tags: [],
		type: 'work'
	},
	{
		id: 'service-cielito',
		title: 'Service Engineer',
		subtitle: 'Cielito Drone',
		year: 2019,
		startDate: '2019-07',
		endDate: '2020-02',
		period: 'Jul 2019 – Feb 2020',
		description:
			'Maintained industrial UAV fleets, performed post-mortem analysis of flight incidents, and ensured operational readiness of drone systems.',
		icon: mdiBriefcaseOutline,
		tags: [],
		type: 'work'
	},
	{
		id: 'hw-ortmed',
		title: 'Hardware Design Engineer',
		subtitle: 'Ortmed',
		year: 2020,
		startDate: '2020-06',
		endDate: '2021-02',
		period: 'Jun 2020 – Feb 2021',
		description:
			'Designed electronics for sensory therapy medical equipment and built automated hardware testing rigs.',
		icon: mdiBriefcaseOutline,
		tags: [],
		type: 'work'
	},
	{
		id: 'product-scandia',
		title: 'Product Development Engineer',
		subtitle: 'Scandia Manufacturing',
		year: 2021,
		startDate: '2021-02',
		endDate: '2022-04',
		period: 'Feb 2021 – Apr 2022',
		description:
			"Managed electronics supply chain during the global component shortage and led the company's first IoT product development from concept through firmware delivery.",
		longDescription:
			"Led technical product development at Scandia Manufacturing, managing the electronics supply chain during the global component shortage and spearheading the company's first IoT product from concept through firmware delivery. Navigated vendor negotiations, component redesigns, and cost optimization while simultaneously building the embedded firmware stack.",
		imageUrl: 'https://placehold.co/800x450/1C1C1E/445A4D?text=Scandia+Manufacturing',
		icon: mdiBriefcaseOutline,
		tags: ['IoT', 'Firmware', 'Supply Chain'],
		type: 'work',
		achievements: [
			'Managed the electronics supply chain during the component shortage, cutting costs by ~37%',
			"Led the technical development of the company's first IoT product, including end-to-end firmware development"
		],
		links: [{ label: 'View Details' }]
	},
	{
		id: 'freelance-dev',
		title: 'Software Developer',
		subtitle: 'Freelance',
		year: 2022,
		startDate: '2022-04',
		endDate: '2022-06',
		period: 'Apr 2022 – Jun 2022',
		description:
			'Delivered an IoT controller MVP for a hazardous waste startup in one month, combining a Vue.js GUI on a microcontroller with event-driven business logic in C.',
		longDescription:
			'Freelance engagement delivering a functional IoT controller MVP in one month for a hazardous waste management startup, combining a Vue.js GUI running on a microcontroller with event-driven business logic in C using RTOS primitives.',
		imageUrl: 'https://placehold.co/800x450/1C1C1E/445A4D?text=IoT+Controller',
		icon: mdiBriefcaseOutline,
		tags: ['Vue.js', 'C', 'RTOS', 'IoT'],
		type: 'work',
		achievements: [
			'Delivered a functional MVP for a hazardous waste startup in one month, using a Vue.js GUI on a microcontroller',
			'Developed business logic in C using RTOS primitives and event-driven patterns'
		],
		links: [{ label: 'View Details' }]
	},
	{
		id: 'embedded-dextra',
		title: 'Embedded Software Engineer',
		subtitle: 'Dextra Technologies, a Deloitte business',
		year: 2022,
		startDate: '2022-06',
		endDate: '2024-02',
		period: 'Jun 2022 – Feb 2024',
		description:
			'Prototyped Software Defined Vehicle architectures for CES 2024, refactored embedded UI frameworks for Texas Instruments, and maintained a 22,000-line production firmware codebase.',
		longDescription:
			'Worked on cutting-edge embedded systems at Dextra Technologies (a Deloitte business), contributing to automotive SDV prototypes for CES 2024, recovering stalled firmware projects through UI framework refactoring, and maintaining a large-scale production codebase for Texas Instruments calculators.',
		imageUrl: 'https://placehold.co/800x450/1C1C1E/445A4D?text=Dextra+Technologies',
		icon: mdiBriefcaseOutline,
		tags: ['C', 'Embedded', 'RTOS', 'Xen', 'SOAFEE', 'Texas Instruments'],
		type: 'work',
		achievements: [
			'Prototyped SOAFEE architecture for CES 2024, replacing ECUs with containerized software in Xen-based VMs',
			'Refactored a custom UI framework for a Texas Instruments project, unblocking feature delivery',
			'Maintained and optimized a 22,000-line codebase for the TI-Nspire CX II'
		],
		links: [{ label: 'View Details' }]
	},
	{
		id: 'devops-macropay',
		title: 'DevOps Engineer',
		subtitle: 'Macropay',
		year: 2024,
		startDate: '2024-04',
		endDate: '2025-08',
		period: 'Apr 2024 – Aug 2025',
		description:
			'Built internal developer platforms, optimized CI/CD infrastructure with Kaniko on Kubernetes, and migrated observability stacks at a fintech company.',
		longDescription:
			'Led platform engineering initiatives at Macropay, transforming CI/CD infrastructure from a single Jenkins instance to dynamic Kubernetes-based agents, reducing cloud costs through observability migration from CloudWatch to the Prometheus/Grafana/Loki stack, and building an Internal Developer Platform MVP with Backstage to unify tooling and accelerate delivery across teams.',
		imageUrl: 'https://placehold.co/800x450/1C1C1E/445A4D?text=Macropay',
		icon: mdiBriefcaseOutline,
		tags: ['Kubernetes', 'ArgoCD', 'Backstage', 'Prometheus', 'Jenkins', 'EKS'],
		type: 'work',
		achievements: [
			'Replaced a single Jenkins instance with dynamic agents integrated with Kaniko on Kubernetes, improving scalability and removing EC2 dependencies',
			'Reduced CloudWatch spend by migrating observability to a Prometheus, Grafana, and Loki stack on EKS',
			'Built an IDP MVP using Backstage, unifying Jenkins, GitHub, Grafana, and Argo CD',
			'Enabled automated repository creation and pipeline setup via Backstage Software Scaffolder templates',
			'Automated environment handling using a multi-account Hub-Spoke architecture with Argo CD and ApplicationSets'
		],
		links: [{ label: 'View Details' }]
	},
	{
		id: 'devops-architect-kapital',
		title: 'DevOps Architect',
		subtitle: 'Kapital Grupo Financiero',
		year: 2026,
		startDate: '2026-02',
		endDate: null,
		period: 'Feb 2026 – Present',
		description: 'Leading DevOps architecture and platform engineering at a financial group.',
		icon: mdiBriefcaseOutline,
		tags: ['Kubernetes', 'Systems Architecture'],
		type: 'work',
		current: true
	}
]);
