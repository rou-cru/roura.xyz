import { z } from 'zod';

/**
 * Featured professional projects showcasing Platform Engineering expertise.
 * Used to render project cards with details, tags, and expandable descriptions.
 */

const ProjectLinkSchema = z.object({
	label: z.string(),
	href: z.string().optional()
});

const ProjectSchema = z.object({
	id: z.string(),
	title: z.string(),
	subtitle: z.string(),
	description: z.string(),
	longDescription: z.string().optional(),
	imageUrl: z.string(),
	tags: z.array(z.string()),
	featured: z.boolean(),
	achievements: z.array(z.string()).optional(),
	links: z.array(ProjectLinkSchema).optional()
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectLink = z.infer<typeof ProjectLinkSchema>;

export const projects = ProjectSchema.array().parse([
	{
		id: 'idp-blueprint',
		title: 'IDP Blueprint',
		subtitle: 'Production-grade Internal Developer Platform',
		description:
			'Production-grade internal developer platform — GitOps-native, security-first, no vendor lock-in, just Platform Engineering.',
		longDescription:
			'A complete IDP architecture including GitOps (ArgoCD), observability (Prometheus/Grafana/Loki), security (Vault/Kyverno/Trivy), and developer portal (Backstage). Designed to accelerate delivery, enforce standards, and empower development teams with self-service capabilities.',
		imageUrl: 'https://placehold.co/800x450/1C1C1E/445A4D?text=IDP+Blueprint',
		tags: [
			'Kubernetes',
			'ArgoCD',
			'Cilium',
			'Vault',
			'Prometheus',
			'Grafana',
			'Kyverno',
			'Backstage',
			'Loki',
			'Trivy'
		],
		featured: true,
		achievements: [
			'Architected a complete GitOps-native internal developer platform with ArgoCD',
			'Integrated full observability stack: Prometheus, Grafana, Loki, and Fluent-bit',
			'Implemented security-first approach with Vault, Kyverno, and Trivy',
			'Built developer portal with Backstage for self-service workflows',
			'Deployed Cilium as CNI for advanced networking and observability',
			'Configured Argo Workflows and Argo Events for CI/CD automation'
		],
		links: [
			{
				label: 'View on GitHub'
			}
		]
	},
	{
		id: 'k8s-homelab',
		title: 'Home Lab Cluster',
		subtitle: 'Bare-metal Kubernetes — Production patterns at $0',
		description:
			'Bare-metal Kubernetes cluster — declarative infrastructure, production patterns at cost $0.',
		longDescription:
			'A production-pattern Kubernetes cluster built on physical hardware for self-hosting and learning. Fully declarative infrastructure with GitOps workflows, monitoring, and automated certificate management.',
		imageUrl: 'https://placehold.co/800x450/1C1C1E/445A4D?text=Home+Lab+Cluster',
		tags: ['Kubernetes', 'Argo CD', 'Prometheus', 'Grafana', 'Helm', 'Terraform', 'Cilium'],
		featured: true,
		achievements: [
			'Deployed bare-metal Kubernetes cluster with production-grade patterns',
			'Implemented GitOps workflow with Argo CD for declarative application deployments',
			'Configured Prometheus and Grafana monitoring stack with custom dashboards',
			'Set up Helm and Terraform for reproducible infrastructure provisioning',
			'Deployed Cilium for networking with eBPF-based observability'
		],
		links: [
			{
				label: 'View on GitHub'
			}
		]
	}
]);
