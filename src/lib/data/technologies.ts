import { z } from 'zod';

/**
 * Technology stack collection for the tech carousel display.
 * Organized by categories (cloud, containers, cicd, tools, observability, etc.).
 */

const TechnologySchema = z.object({
	name: z.string(),
	simpleIconSlug: z.string(),
	category: z.enum([
		'cloud',
		'containers',
		'cicd',
		'tools',
		'observability',
		'programming',
		'security'
	])
});

export type Technology = z.infer<typeof TechnologySchema>;

export const technologies = TechnologySchema.array().parse([
	// Cloud & Infrastructure
	{ name: 'GCP', simpleIconSlug: 'googlecloud', category: 'cloud' },
	{ name: 'AWS', simpleIconSlug: 'amazonaws', category: 'cloud' },
	{ name: 'Terraform', simpleIconSlug: 'terraform', category: 'cloud' },
	{ name: 'Ansible', simpleIconSlug: 'ansible', category: 'cloud' },
	{ name: 'Crossplane', simpleIconSlug: 'crossplane', category: 'cloud' },
	{ name: 'Karpenter', simpleIconSlug: 'kubernetes', category: 'cloud' },

	// Container Orchestration
	{ name: 'Kubernetes', simpleIconSlug: 'kubernetes', category: 'containers' },
	{ name: 'Helm', simpleIconSlug: 'helm', category: 'containers' },
	{ name: 'Kustomize', simpleIconSlug: 'kubernetes', category: 'containers' },
	{ name: 'Docker', simpleIconSlug: 'docker', category: 'containers' },

	// CI/CD
	{ name: 'Argo CD', simpleIconSlug: 'argo', category: 'cicd' },
	{ name: 'Jenkins', simpleIconSlug: 'jenkins', category: 'cicd' },
	{ name: 'GitHub Actions', simpleIconSlug: 'githubactions', category: 'cicd' },

	// Developer Tools
	{ name: 'GitHub', simpleIconSlug: 'github', category: 'tools' },
	{ name: 'Bitbucket', simpleIconSlug: 'bitbucket', category: 'tools' },
	{ name: 'Jira', simpleIconSlug: 'jira', category: 'tools' },

	// Observability
	{ name: 'Prometheus', simpleIconSlug: 'prometheus', category: 'observability' },
	{ name: 'Grafana', simpleIconSlug: 'grafana', category: 'observability' },
	{ name: 'Loki', simpleIconSlug: 'grafana', category: 'observability' },
	{ name: 'CloudWatch', simpleIconSlug: 'amazonaws', category: 'observability' },
	{ name: 'Kubecost', simpleIconSlug: 'kubernetes', category: 'observability' },

	// Programming
	{ name: 'C', simpleIconSlug: 'c', category: 'programming' },
	{ name: 'Python', simpleIconSlug: 'python', category: 'programming' },
	{ name: 'Bash', simpleIconSlug: 'gnubash', category: 'programming' },
	{ name: 'Groovy', simpleIconSlug: 'apachegroovy', category: 'programming' },
	{ name: 'Node.js', simpleIconSlug: 'nodedotjs', category: 'programming' },

	// Security & Quality
	{ name: 'Checkov', simpleIconSlug: 'terraform', category: 'security' },
	{ name: 'SonarQube', simpleIconSlug: 'sonarqube', category: 'security' },
	{ name: 'Trivy', simpleIconSlug: 'aqua', category: 'security' },
	{ name: 'Kyverno', simpleIconSlug: 'kubernetes', category: 'security' },
	{ name: 'IAM', simpleIconSlug: 'amazonaws', category: 'security' }
]);
