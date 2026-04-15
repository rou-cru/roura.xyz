<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * Card component: A foundational container for UI elements.
	 * Follows the Design System for surface isolation and elevation.
	 */

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className = '', ...rest }: Props = $props();

	const baseClasses =
		'bg-surface-elevated/40 border border-border rounded-lg shadow-sm backdrop-blur-md overflow-hidden transition-all duration-hover ease-standard';

	const classes = $derived(`${baseClasses} ${className}`.trim());
</script>

<div class={classes} {...rest}>
	{@render children()}
</div>
