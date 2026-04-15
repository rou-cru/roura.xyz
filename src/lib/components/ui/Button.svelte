<script lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		HTMLButtonAttributes,
		HTMLAnchorAttributes,
		MouseEventHandler
	} from 'svelte/elements';
	import { parseLink } from '$lib/utils/links';

	/**
	 * Polymorphic button component. Renders as <a> (with secure link handling) or <button>.
	 * Strictly uses Design System tokens for styling and transitions.
	 */

	type Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		onclick?: MouseEventHandler<HTMLElement>;
		class?: string;
		children: Snippet;
		href?: string;
		disabled?: boolean;
	};

	let {
		variant = 'primary',
		size = 'lg',
		href,
		onclick,
		class: className = '',
		children,
		disabled = false,
		...rest
	}: Props = $props();

	const baseClasses =
		'inline-flex items-center justify-center whitespace-nowrap font-ui font-weight-medium tracking-wide uppercase transition-all duration-hover ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base rounded-sm disabled:opacity-50 disabled:pointer-events-none';

	const variantClasses = {
		primary:
			'bg-gradient-to-b from-accent to-accent-hover text-text-inverse shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95 focus-visible:ring-accent',
		secondary:
			'border border-border bg-surface/50 text-text-high backdrop-blur-sm hover:border-accent hover:bg-accent-surface/30 hover:text-accent-text focus-visible:ring-accent',
		ghost:
			'text-text-medium hover:text-accent-text hover:bg-surface-elevated/50 focus-visible:ring-accent'
	};

	const sizeClasses = {
		sm: 'px-2 py-1 text-ui-size',
		md: 'px-4 py-2 text-ui-size',
		lg: 'px-6 py-3 text-ui-size'
	};

	const safeVariant = $derived(variant in variantClasses ? variant : 'primary');
	const safeSize = $derived(size in sizeClasses ? size : 'md');

	const classes = $derived(
		`${baseClasses} ${variantClasses[safeVariant]} ${sizeClasses[safeSize]} ${className}`
	);

	const linkProps = $derived(href ? parseLink(href) : null);
</script>

{#if href && linkProps}
	<a
		href={linkProps.href}
		target={linkProps.target}
		rel={linkProps.rel}
		{onclick}
		class={classes}
		{...rest as HTMLAnchorAttributes}
	>
		{@render children()}
	</a>
{:else}
	<button
		{disabled}
		class={classes}
		{onclick}
		type={(rest as HTMLButtonAttributes).type || 'button'}
		{...rest as HTMLButtonAttributes}
	>
		{@render children()}
	</button>
{/if}
