<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import Section from '$lib/components/ui/Section.svelte';
	import CardTilt from '$lib/components/ui/CardTilt.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SideDrawer from '$lib/components/ui/SideDrawer.svelte';

	interface Props {
		projects: Project[];
	}

	const { projects }: Props = $props();

	let selectedProject = $state<Project | null>(null);
	let drawerProject = $state<Project | null>(null);

	function openProject(project: Project): void {
		selectedProject = project;
		drawerProject = project;
	}

	function closeProject(): void {
		selectedProject = null;
	}
</script>

<Section id="projects">
	<div class="mb-[var(--space-12)] text-center">
		<h2 class="text-section-title">Projects</h2>
	</div>
	<div class="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-2">
		{#each projects as project (project.id)}
			<button
				onclick={() => openProject(project)}
				aria-label="View details for {project.title}"
				class="block w-full cursor-pointer bg-transparent p-0 text-left"
			>
				<CardTilt class="flex h-full flex-col gap-[var(--space-4)] p-[var(--space-6)]">
					<h3>{project.title}</h3>
					{#if project.subtitle}
						<p class="text-eyebrow">{project.subtitle}</p>
					{/if}
					<p class="text-text-medium">{project.description}</p>
					{#if project.tags.length > 0}
						<div class="mt-auto flex flex-wrap gap-[var(--space-2)]">
							{#each project.tags as tag}
								<Tag label={tag} />
							{/each}
						</div>
					{/if}
				</CardTilt>
			</button>
		{/each}
	</div>
</Section>

<SideDrawer isOpen={selectedProject !== null} onClose={closeProject} title={drawerProject?.title}>
	{#if drawerProject}
		<div class="flex flex-col gap-[var(--space-6)]">
			{#if drawerProject.longDescription}
				<p class="text-text-medium">{drawerProject.longDescription}</p>
			{/if}
			{#if drawerProject.achievements && drawerProject.achievements.length > 0}
				<div>
					<h3 class="mb-[var(--space-3)]">Key Achievements</h3>
					<ul class="flex flex-col gap-[var(--space-2)]">
						{#each drawerProject.achievements as achievement}
							<li class="flex gap-[var(--space-2)] text-text-medium">
								<span class="mt-1 text-accent-text" aria-hidden="true">▸</span>
								<span>{achievement}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if drawerProject.links && drawerProject.links.length > 0}
				<div class="flex flex-wrap gap-[var(--space-3)]">
					{#each drawerProject.links as link (link.label)}
						<Button variant="secondary" href={link.href} disabled={!link.href}>
							{link.label}
						</Button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</SideDrawer>
