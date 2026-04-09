<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	/**
	 * Tag component for displaying labeled badges.
	 * Safely trims label and only renders if content exists.
	 */

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		label: string;
		variant?: 'default' | 'accent';
		size?: 'sm' | 'md';
	}

	let { label, variant = 'default', size = 'sm', ...rest }: Props = $props();

	const variantClasses = {
		default: 'bg-surface-elevated text-text-medium',
		accent: 'bg-accent-surface text-accent-text'
	};

	const sizeClasses = {
		sm: 'px-2 py-1',
		md: 'px-4 py-2'
	};

	const safeLabel = $derived(label.trim());
	const safeVariant = $derived(variant in variantClasses ? variant : 'default');
	const safeSize = $derived(size in sizeClasses ? size : 'sm');
	const classes = $derived(
		`inline-flex items-center rounded-sm font-weight-medium text-ui-size ${variantClasses[safeVariant]} ${sizeClasses[safeSize]}`
	);
</script>

{#if safeLabel}
	<span class={classes} {...rest}>
		{safeLabel}
	</span>
{/if}
