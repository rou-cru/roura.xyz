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
	aria-hidden="true"
	{...rest}
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M4 6h16M4 12h16M4 18h16"
	/>
</svg>
