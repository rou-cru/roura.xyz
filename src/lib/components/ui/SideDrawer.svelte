<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Drawer } from 'svelte-ux';
	import CloseIcon from './CloseIcon.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		title?: string;
		children: Snippet;
	}

	const { isOpen, onClose, title, children }: Props = $props();
</script>

<Drawer open={isOpen} placement="right" on:close={onClose} class="w-drawer-md">
	<div class="flex h-full flex-col bg-surface">
		<div class="flex items-center justify-between border-b border-border p-[var(--space-6)]">
			{#if title}
				<h2 class="text-section-title">{title}</h2>
			{/if}
			<button
				onclick={onClose}
				aria-label="Close"
				class="ml-auto text-text-medium transition-colors duration-hover hover:text-text-high"
			>
				<CloseIcon class="h-[var(--space-6)] w-[var(--space-6)]" />
			</button>
		</div>
		<div class="flex-1 overflow-y-auto p-[var(--space-6)]">
			{@render children()}
		</div>
	</div>
</Drawer>
