<script lang="ts">
	import type { Technology } from '$lib/data/technologies';
	import {
		siGooglecloud,
		siTerraform,
		siAnsible,
		siKubernetes,
		siHelm,
		siDocker,
		siArgo,
		siJenkins,
		siGithubactions,
		siGithub,
		siBitbucket,
		siJira,
		siPrometheus,
		siGrafana,
		siC,
		siPython,
		siGnubash,
		siApachegroovy,
		siNodedotjs,
		siSonarqubeserver,
		siAqua,
		type SimpleIcon
	} from 'simple-icons';
	import { Shine, Tilt } from 'svelte-ux';
	import { shine, tilt } from '$lib/config/effects';

	interface Props {
		technologies: Technology[];
	}

	const { technologies }: Props = $props();

	const shineConfig = shine.carousel;
	const tiltConfig = tilt.carousel;

	const ICON_MAP: Record<string, SimpleIcon> = {
		googlecloud: siGooglecloud,
		terraform: siTerraform,
		ansible: siAnsible,
		kubernetes: siKubernetes,
		helm: siHelm,
		docker: siDocker,
		argo: siArgo,
		jenkins: siJenkins,
		githubactions: siGithubactions,
		github: siGithub,
		bitbucket: siBitbucket,
		jira: siJira,
		prometheus: siPrometheus,
		grafana: siGrafana,
		c: siC,
		python: siPython,
		gnubash: siGnubash,
		apachegroovy: siApachegroovy,
		nodedotjs: siNodedotjs,
		sonarqube: siSonarqubeserver,
		aqua: siAqua
	};

	function getIconData(slug: string): { path: string; color: string } {
		const fallbackPath = 'M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20z';
		const icon = ICON_MAP[slug];

		if (icon) {
			return {
				path: icon.path || fallbackPath,
				color: icon.hex ? `#${icon.hex}` : 'currentColor'
			};
		}

		return { path: fallbackPath, color: 'currentColor' };
	}

	/**
	 * Minimum items required for a visually seamless infinite scroll loop.
	 * 30 ensures the duplicated set stays outside the visible viewport during
	 * the full animation cycle at the configured carousel duration (60s).
	 * Below this threshold, the gap between the original and cloned set
	 * would become visible before the animation resets.
	 */
	const MIN_ITEMS_FOR_LOOP = 30;

	const displayItems = $derived.by(() => {
		if (!technologies || technologies.length === 0) return [];
		const repeatCount = Math.ceil(MIN_ITEMS_FOR_LOOP / technologies.length);
		return Array(repeatCount).fill(technologies).flat();
	});
</script>

{#if displayItems.length > 0}
	<Shine lightColor={shineConfig.lightColor} lightRadius={shineConfig.lightRadius}>
		<div class="carousel-mask" role="region" aria-label="Technology stack carousel">
			<div class="carousel-track" role="list">
				{#each [0, 1] as iteration (iteration)}
					{#each displayItems as tech, idx (iteration + '-' + idx + '-' + tech.simpleIconSlug)}
						{@const icon = getIconData(tech.simpleIconSlug)}
						<div class="tech-item-wrapper" role="listitem" aria-hidden={iteration === 1}>
							<div class="tech-item">
								<Tilt maxRotation={tiltConfig.maxRotation}>
									<div class="icon-badge" aria-hidden="true">
										<div class="icon-container">
											<svg viewBox="0 0 24 24" fill="currentColor" class="tech-icon">
												<path d={icon.path} />
											</svg>
										</div>
									</div>
								</Tilt>
								<span class="tech-label">{tech.name}</span>
							</div>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</Shine>
{/if}

<style>
	.carousel-mask {
		width: 100%;
		max-width: var(--container-max);
		margin-inline: auto;
		overflow: hidden;
		mask-image: linear-gradient(
			to right,
			transparent,
			black var(--space-16),
			black calc(100% - var(--space-16)),
			transparent
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black var(--space-16),
			black calc(100% - var(--space-16)),
			transparent
		);
	}

	.carousel-track {
		display: flex;
		--carousel-gap: var(--space-6);
		gap: var(--carousel-gap);
		width: max-content;
		animation: scroll var(--duration-carousel) linear infinite;
		padding-block: var(--space-4);
		will-change: transform;
	}

	/* Pause on hover only for devices with true hover capability */
	@media (hover: hover) {
		.carousel-track:hover {
			animation-play-state: paused;
		}
	}

	.tech-item-wrapper {
		width: var(--space-24);
		flex-shrink: 0;
	}

	.tech-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		width: 100%;
		overflow: visible;
		color: var(--color-text-medium);
		transition: color var(--duration-hover) var(--ease-standard);
	}

	.icon-badge {
		display: grid;
		place-items: center;
		width: var(--space-24);
		height: var(--space-24);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-sm);
	}

	.icon-container {
		width: var(--space-16);
		height: var(--space-16);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-medium);
		transition: color var(--duration-hover) var(--ease-standard);
	}

	.tech-item:hover .icon-container {
		color: var(--color-accent-text);
	}

	.tech-icon {
		width: 100%;
		height: 100%;
	}

	.tech-label {
		width: max-content;
		max-width: none;
		font-family: var(--font-ui);
		font-size: var(--text-ui-size);
		line-height: var(--text-ui-leading);
		font-weight: var(--text-ui-weight);
		text-align: center;
		opacity: 0;
		transition: opacity var(--duration-hover) var(--ease-standard);
		white-space: nowrap;
	}

	.tech-item:hover .tech-label {
		opacity: 1;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			/* Account for the inter-set gap so the loop is seamless. */
			transform: translateX(calc(-50% - (var(--carousel-gap) * 0.5)));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-track {
			animation-play-state: paused;
		}
	}
</style>
