<script lang="ts">
	import type { FooterContent } from '$lib/data/footer';
	import { parseLink } from '$lib/utils/links';

	interface Props {
		content: FooterContent;
	}

	const { content }: Props = $props();
</script>

<footer class="border-t border-border px-[var(--space-6)] py-[var(--space-8)]">
	<div class="mx-auto flex max-w-container flex-col items-center gap-[var(--space-6)] sm:flex-row sm:justify-between">
		<p class="text-base text-text-medium">
			{content.copyright}
		</p>
		<nav aria-label="Social links" class="flex items-center gap-[var(--space-6)]">
			{#each content.socials as social (social.label)}
				{@const linkProps = parseLink(social.href)}
				<a
					href={linkProps.href}
					target={linkProps.target}
					rel={linkProps.rel}
					aria-label={social.label}
					class="text-text-medium transition-colors duration-hover hover:text-accent-text"
				>
					<svg
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-[var(--space-6)] w-[var(--space-6)]"
						aria-hidden="true"
					>
						<path d={social.icon} />
					</svg>
				</a>
			{/each}
		</nav>
	</div>
</footer>
