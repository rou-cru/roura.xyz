<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { sanitizeId } from '$lib/utils/ids';

	/**
	 * Section component: Semantic structural container for page content.
	 * Automatically sanitizes provided IDs for safe DOM usage.
	 */

	interface Props extends HTMLAttributes<HTMLElement> {
		id?: string;
		children: Snippet;
		class?: string;
	}

	let { id, children, class: className = '', ...rest }: Props = $props();

	const safeId = $derived(sanitizeId(id));

	const baseClasses = 'relative w-full py-16 md:py-24 px-container';
	const classes = $derived(`${baseClasses} ${className}`.trim());
</script>

<section id={safeId} class={classes} {...rest}>
	{@render children()}
</section>
