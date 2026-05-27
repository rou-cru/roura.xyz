<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { page } from '$app/stores';
	import { parseLink } from '$lib/utils/links';

	/**
	 * Navigation link component with animated underline and secure link handling.
	 * Supports text label or custom children, with accessible aria-label fallback.
	 */

	interface Props extends HTMLAnchorAttributes {
		href: string;
		label: string;
		onClick?: (e: MouseEvent) => void;
		children?: Snippet;
	}

	let { href, label, onClick, children, class: className = '', ...rest }: Props = $props();

	const linkProps = $derived(parseLink(href));
	const hasLabel = $derived(label.trim().length > 0);
	const ariaLabel = $derived(!children && !hasLabel ? href : undefined);
	const isCurrentPage = $derived(($page.url?.pathname ?? '') === href);
	const classes = $derived(
		`group relative text-text-high transition-colors duration-[var(--duration-hover)] ease-[var(--ease-standard)] hover:text-accent-text ${className}`
	);
</script>

<a
	{...rest}
	href={linkProps.href}
	target={linkProps.target}
	rel={linkProps.rel}
	onclick={onClick}
	aria-label={ariaLabel}
	aria-current={isCurrentPage ? 'page' : undefined}
	class={classes}
>
	{#if children}
		{@render children()}
	{:else}
		{label.trim()}
	{/if}
	<span
		class="absolute bottom-0 left-0 h-[var(--border-width)] w-0 bg-accent-text transition-all duration-[var(--duration-hover)] ease-[var(--ease-standard)] group-hover:w-full"
	></span>
</a>
