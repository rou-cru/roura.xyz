<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { sanitizeId } from '$lib/utils/ids';

	/**
	 * Card component: A foundational container for UI elements.
	 * Follows the Design System for surface isolation and elevation.
	 * Automatically sanitizes provided IDs for safe DOM usage.
	 */

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
	}

	let { id, children, class: className = '', ...rest }: Props = $props();

	const safeId = $derived(sanitizeId(id));

	const baseClasses =
		'bg-surface-elevated/40 border border-border rounded-lg shadow-sm backdrop-blur-md overflow-hidden transition-all duration-hover ease-standard';

	const classes = $derived(`${baseClasses} ${className}`.trim());
</script>

<div id={safeId} data-card class={classes} {...rest}>
	{@render children()}
</div>
