<script lang="ts">
	import type { MetaTag } from '$lib/data/meta';

	let { tags } = $props<{ tags: MetaTag[] }>();
</script>

<svelte:head>
	{#each tags as metaTag}
		{#if metaTag.tag === 'title'}
			<title>{metaTag.attributes['']}</title>
		{:else}
			<meta {...metaTag.attributes} />
		{/if}
	{/each}
</svelte:head>
