<script lang="ts">
	import type { NavLink } from '$lib/data/navigation';
	import NavLinkComponent from './NavLink.svelte';
	import { Drawer } from 'svelte-ux';

	interface Props {
		links: NavLink[];
		isOpen: boolean;
		onClose: () => void;
	}

	const { links, isOpen, onClose }: Props = $props();
</script>

<Drawer open={isOpen} placement="right" on:close={onClose} class="w-[var(--drawer-width-sm)]">
	<div class="flex h-full flex-col bg-surface shadow-[var(--shadow-lg)]">
		<div class="h-[var(--nav-height)]"></div>

		<div class="flex-1 overflow-y-auto p-[var(--space-6)]">
			<nav id="mobile-nav" class="flex flex-col gap-[var(--space-6)]">
				{#each links as link (link.id)}
					<NavLinkComponent href={link.href} label={link.label} onClick={onClose} />
				{/each}
			</nav>
		</div>
	</div>
</Drawer>
