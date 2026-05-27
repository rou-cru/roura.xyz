<script lang="ts">
	import { page } from '$app/stores';
	import { siteMetadata } from '$lib/data/site';
	import { generateMeta } from '$lib/data/meta';
	import { MetaHead } from '$lib/components/ui';

	const metaTags = generateMeta(siteMetadata);
</script>

<MetaHead tags={metaTags} />

<div
	class="flex min-h-[calc(100vh-var(--nav-height))] flex-col items-center justify-center gap-[var(--space-6)] px-[var(--space-4)] pt-[var(--nav-height)] text-center"
>
	<p class="text-eyebrow">{$page.status}</p>
	<h1 class="text-hero-main">{$page.error?.message ?? 'Something went wrong'}</h1>
	<a
		href="/"
		class="text-[length:var(--text-body-size)] text-accent-text underline-offset-4 hover:underline"
	>
		Back to home
	</a>
</div>
