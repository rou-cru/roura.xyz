<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { NavLink } from '$lib/data/navigation';
	import NavLinkComponent from './NavLink.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import CloseIcon from '../CloseIcon.svelte';
	import MenuIcon from '../MenuIcon.svelte';
	import { lockScroll, unlockScroll } from '$lib/config/effects';
	import { MediaQuery } from '$lib/utils/media.svelte';

	interface Props {
		links: NavLink[];
		logoText: string;
	}

	const { links, logoText }: Props = $props();

	let isOpen = $state(false);
	let scrollY = $state(0);
	const scrolled = $derived(scrollY > 20);
	const isDesktop = new MediaQuery('(min-width: 1024px)');

	function toggleMenu(): void {
		isOpen = !isOpen;
	}

	function closeMenu(): void {
		isOpen = false;
	}

	$effect(() => {
		if (isDesktop.matches && isOpen) closeMenu();
	});

	$effect(() => {
		if (typeof window === 'undefined') return;
		if (!isOpen) return;

		const savedScrollY = lockScroll();

		return () => {
			unlockScroll(savedScrollY);
		};
	});

	onDestroy(() => isDesktop.destroy());
</script>

<svelte:window bind:scrollY />

<header
	class="fixed top-0 right-0 left-0 z-[var(--nav-z-index)] transition-all duration-[var(--duration-hover)] {scrolled
		? 'bg-[var(--color-nav-bg-scrolled)] shadow-[var(--shadow-lg)] backdrop-blur-[var(--nav-backdrop-blur)]'
		: 'bg-transparent'}"
>
	<div
		class="container mx-auto flex items-center justify-between px-[var(--space-4)] py-[var(--space-4)]"
	>
		<a
			href="/"
			aria-label={logoText}
			class="text-[length:var(--text-body-size)] font-bold text-text-high transition-colors duration-[var(--duration-hover)] hover:text-accent-text"
		>
			{logoText}
		</a>

		<nav class="hidden gap-[var(--space-8)] lg:flex">
			{#each links as link (link.id)}
				<NavLinkComponent href={link.href} label={link.label} />
			{/each}
		</nav>

		<button
			onclick={toggleMenu}
			class="relative z-[var(--nav-overlay-z-index)] text-text-high transition-colors duration-[var(--duration-hover)] hover:text-accent-text lg:hidden"
			aria-label="Toggle menu"
			aria-expanded={isOpen}
			aria-controls="mobile-nav"
		>
			{#if isOpen}
				<CloseIcon class="h-[var(--space-6)] w-[var(--space-6)]" />
			{:else}
				<MenuIcon class="h-[var(--space-6)] w-[var(--space-6)]" />
			{/if}
		</button>
	</div>
</header>

<MobileMenu {links} {isOpen} onClose={closeMenu} />
