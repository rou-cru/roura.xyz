<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Tilt } from 'svelte-ux';
	import Card from './Card.svelte';
	import { tilt as tiltConfig } from '$lib/config/effects';
	import { createTouchQuery } from '$lib/utils/media.svelte';

	/**
	 * CardTilt: Wraps Card with a 3D tilt effect on pointer-capable devices.
	 * On touch devices, renders Card statically. Tilt parameters are sourced
	 * from the design system (`effects.ts` tokens) with optional prop overrides.
	 */

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Override default maxRotation from design system (degrees) */
		maxRotation?: number;
		/** Override default setBrightness from design system */
		setBrightness?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		maxRotation = tiltConfig.card.maxRotation,
		setBrightness = tiltConfig.card.setBrightness,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const isTouch = createTouchQuery();
</script>

{#if isTouch.matches}
	<!-- Touch: static Card with active-scale feedback -->
	<div class="touch-scale-active h-full">
		<Card class={className} {...rest}>
			{@render children()}
		</Card>
	</div>
{:else}
	<!-- Pointer: Tilt-wrapped Card with 3D rotation effect -->
	<Tilt class="h-full" {maxRotation} {setBrightness}>
		<Card class={className} {...rest}>
			{@render children()}
		</Card>
	</Tilt>
{/if}
