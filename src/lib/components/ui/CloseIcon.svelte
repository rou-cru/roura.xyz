<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<SVGElement> {
		size?: number;
		class?: string;
	}

	let { size = 24, class: className = '', ...rest }: Props = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	fill="none"
	stroke="currentColor"
	viewBox="0 0 24 24"
	{...rest}
>
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>
