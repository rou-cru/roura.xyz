<script lang="ts">
	import type { TimelineEntry } from '$lib/data/experience';
	import Section from '$lib/components/ui/Section.svelte';
	import SideDrawer from '$lib/components/ui/SideDrawer.svelte';
	import Tag from '$lib/components/ui/Tag.svelte';

	interface Props {
		timeline: TimelineEntry[];
	}

	const { timeline }: Props = $props();

	let selectedEntry = $state<TimelineEntry | null>(null);

	function openDrawer(entry: TimelineEntry): void {
		selectedEntry = entry;
	}

	function closeDrawer(): void {
		selectedEntry = null;
	}

	/** Converts a "YYYY-MM" string into an absolute month index for positioning calculations. */
	function parseYearMonth(ym: string): number {
		const match = ym.match(/^(\d{4})-(\d{2})$/);
		if (!match) {
			throw new Error(
				`Timeline Date Error: Invalid date format "${ym}". Expected strictly YYYY-MM.`
			);
		}
		const y = parseInt(match[1], 10);
		const m = parseInt(match[2], 10);
		return y * 12 + m - 1;
	}

	const minMonth = parseYearMonth('2015-01');
	const currentMonth = new Date().getFullYear() * 12 + new Date().getMonth();
	const maxMonth = currentMonth + 3;
	const totalMonths = maxMonth - minMonth;

	const yearMarkers = $derived.by(() => {
		const minYear = Math.min(...timeline.map((e) => e.year));
		const maxYear = new Date().getFullYear();
		const years: number[] = [];
		for (let y = minYear; y <= maxYear; y++) {
			years.push(y);
		}
		return years.map((y) => {
			const m = y * 12;
			return {
				year: y,
				topPercent: ((m - minMonth) / totalMonths) * 100
			};
		});
	});

	const positionedItems = $derived.by(() => {
		type TrackEntry = { start: number; end: number; cardEnd: number };
		const tracksLeft: TrackEntry[][] = [];
		const tracksRight: TrackEntry[][] = [];
		const minCardMonths = 8;

		return timeline.map((entry, i) => {
			const isOldest = i === 0;
			const isLatest = i === timeline.length - 1;

			const actualStart = parseYearMonth(entry.startDate);
			const end = entry.endDate ? parseYearMonth(entry.endDate) : currentMonth;
			const visualStart = isOldest ? minMonth : actualStart;

			const cardEnd = actualStart + minCardMonths;

			let side: 'left' | 'right' = 'left';
			let trackIdx = 0;

			const sideHasCardRoom = (tracks: TrackEntry[][]): boolean => {
				if (tracks.length === 0) return true;
				return tracks.some(
					(track) => !track.some((item) => actualStart < item.cardEnd && cardEnd > item.start)
				);
			};

			const findBarTrack = (tracks: TrackEntry[][]): number => {
				for (let t = 0; t < tracks.length; t++) {
					if (!tracks[t].some((item) => actualStart < item.end && end > item.start)) return t;
				}
				return -1;
			};

			const preferredSide: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';
			const preferredTracks = preferredSide === 'left' ? tracksLeft : tracksRight;
			const otherTracks = preferredSide === 'left' ? tracksRight : tracksLeft;
			const otherSide = preferredSide === 'left' ? 'right' : 'left';

			if (sideHasCardRoom(preferredTracks)) {
				side = preferredSide;
				const barTrack = findBarTrack(preferredTracks);
				trackIdx = barTrack !== -1 ? barTrack : preferredTracks.length;
			} else if (sideHasCardRoom(otherTracks)) {
				side = otherSide;
				const barTrack = findBarTrack(otherTracks);
				trackIdx = barTrack !== -1 ? barTrack : otherTracks.length;
			} else {
				side = preferredSide;
				trackIdx = preferredTracks.length;
			}

			const tracks = side === 'left' ? tracksLeft : tracksRight;
			if (!tracks[trackIdx]) tracks[trackIdx] = [];
			tracks[trackIdx].push({ start: actualStart, end, cardEnd });

			return {
				raw: entry,
				topPercent: ((visualStart - minMonth) / totalMonths) * 100,
				heightPercent: ((end - visualStart) / totalMonths) * 100,
				side,
				track: trackIdx,
				hideBar: isLatest
			};
		});
	});

	function getCardLayout(track: number): { offsetPct: number; widthPct: number } {
		const baseGapPct = 3;
		const barStepPct = 2;
		const offsetPct = baseGapPct + track * barStepPct;
		const widthPct = 46 - offsetPct;
		return { offsetPct, widthPct };
	}
</script>

<Section id="experience" class="py-[var(--space-24)]">
	<div class="mb-[var(--space-16)]">
		<h2 class="text-section-title mb-[var(--space-4)] text-text-high">Professional Experience</h2>
		<p class="text-section-desc max-w-[var(--container-max-text)] text-text-medium">
			From Mechatronics Engineering through Embedded Systems, IoT, and into Platform Engineering &
			DevOps.
		</p>
	</div>

	{#if timeline.length === 0}
		<p class="font-body text-[length:var(--text-body-lg-size)] text-text-medium">
			No experience entries found.
		</p>
	{:else}
		<div
			class="relative mx-auto mt-[var(--space-8)] mb-[var(--space-16)] w-full max-w-[var(--container-max)] px-[var(--space-4)] md:px-0"
			style="--total-months: {totalMonths}; height: calc(var(--total-months) * var(--space-3));"
		>
			<!-- Central timeline line -->
			<div
				class="absolute top-0 bottom-0 left-[var(--space-6)] z-[var(--layout-z-base)] w-[var(--border-width)] -translate-x-1/2 bg-border md:left-1/2"
			></div>

			<!-- Current position gradient line -->
			{#if timeline.some((t) => t.current)}
				{@const currentStarts = positionedItems.filter((p) => p.raw.current).map((p) => p.topPercent)}
				{@const topOfOngoing = Math.min(...currentStarts)}
				<div
					class="absolute left-[var(--space-6)] z-[var(--layout-z-base)] w-[var(--border-width)] -translate-x-1/2 md:left-1/2"
					style="top: {topOfOngoing}%; bottom: 0; background: linear-gradient(to bottom, var(--color-accent) 0%, transparent 100%);"
				></div>
			{/if}

			<!-- Year markers -->
			{#each yearMarkers as marker (marker.year)}
				<div
					class="absolute left-[var(--space-6)] z-[var(--layout-z-elevated)] -mt-[var(--space-5)] flex h-[var(--space-10)] w-[var(--space-16)] -translate-x-1/2 items-center justify-center rounded-[var(--radius-full)] border-[var(--border-width)] border-accent bg-surface font-caption text-[length:var(--text-body-size)] font-bold text-accent-text shadow-[var(--shadow-sm)] md:left-1/2"
					style="top: {marker.topPercent}%;"
				>
					{marker.year}
				</div>
			{/each}

			<!-- Timeline entries -->
			{#each positionedItems as item (item.raw.id)}
				{@const layout = getCardLayout(item.track)}

				<!-- Bar connecting card to timeline -->
				{#if !item.hideBar}
					<div
						class="absolute left-[calc(var(--space-6)+var(--card-offset))] z-[var(--layout-z-base)] w-[var(--space-1)] rounded-[var(--radius-full)] bg-accent opacity-60 shadow-[var(--shadow-sm)] transition-opacity duration-[var(--duration-hover)] ease-[var(--ease-standard)] hover:opacity-100 {item.side ===
						'left'
							? 'md:right-[calc(50%+var(--card-offset))] md:left-auto'
							: 'md:left-[calc(50%+var(--card-offset))]'}"
						style="top: {item.topPercent}%; height: {item.heightPercent}%; --card-offset: {layout.offsetPct}%;"
					></div>
				{/if}

				<!-- Card container -->
				<div
					class="absolute left-[calc(var(--space-6)+var(--card-offset))] z-[var(--layout-z-elevated)] -mt-[var(--space-5)] flex w-[calc(100%-var(--space-10)-var(--card-offset))] flex-col items-start pb-[var(--space-4)] transition-transform duration-[var(--duration-entrance)] ease-[var(--ease-standard)] hover:z-[var(--layout-z-overlay)] hover:translate-x-[var(--space-3)] {item.side ===
					'left'
						? 'md:right-[calc(50%+var(--card-offset)+var(--space-3))] md:left-auto md:w-[var(--card-width)] md:max-w-[var(--size-container-sm)] md:items-end md:hover:-translate-x-[var(--space-3)]'
						: 'md:left-[calc(50%+var(--card-offset)+var(--space-3))] md:w-[var(--card-width)] md:max-w-[var(--size-container-sm)] md:items-start md:hover:translate-x-[var(--space-3)]'}"
					style="top: {item.topPercent}%; --card-offset: {layout.offsetPct}%; --card-width: {layout.widthPct}%;"
				>
					<button
						class="group relative flex w-full flex-col items-start rounded-[var(--radius-md)] border-[var(--border-width)] border-transparent bg-transparent p-[var(--space-3)] text-left transition-colors duration-[var(--duration-entrance)] ease-[var(--ease-standard)] hover:border-[color:var(--color-border)] hover:bg-surface-elevated {item.side ===
						'right'
							? 'md:items-start md:text-left'
							: 'md:items-end md:text-right'}"
						onclick={() => openDrawer(item.raw)}
					>
						<span class="font-caption text-[length:var(--text-body-size)] text-accent-text">
							{item.raw.subtitle}
						</span>
						<h3
							class="mt-[var(--space-1)] font-card-title text-[length:var(--text-title-size)] font-[number:var(--text-card-title-weight)] tracking-[var(--text-card-title-tracking)] text-text-high"
						>
							{item.raw.title}
						</h3>
						<span
							class="mt-[var(--space-1)] font-mono text-[length:var(--text-body-size)] text-text-medium opacity-0 transition-opacity duration-[var(--duration-entrance)] ease-[var(--ease-standard)] group-hover:opacity-100"
						>
							{item.raw.period}
						</span>
					</button>

					<!-- SR-only: crawlable experience details -->
					{#if item.raw.longDescription || (item.raw.achievements && item.raw.achievements.length > 0)}
						<div class="sr-only">
							<p>{item.raw.description}</p>
							{#if item.raw.longDescription}
								<p>{item.raw.longDescription}</p>
							{/if}
							{#if item.raw.achievements && item.raw.achievements.length > 0}
								<ul>
									{#each item.raw.achievements as achievement}
										<li>{achievement}</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	{#if selectedEntry}
		<SideDrawer isOpen={true} onClose={closeDrawer} title={selectedEntry.title}>
			<p class="mb-[var(--space-4)] font-caption text-[length:var(--text-body-size)] text-accent-text">
				{selectedEntry.subtitle} · {selectedEntry.period}
			</p>

			{#if selectedEntry.imageUrl}
				<img
					src={selectedEntry.imageUrl}
					alt=""
					class="mb-[var(--space-6)] w-full rounded-[var(--radius-md)] object-cover"
					loading="lazy"
				/>
			{/if}

			{#if selectedEntry.longDescription}
				<p
					class="mb-[var(--space-6)] font-body text-[length:var(--text-body-lg-size)] leading-[var(--font-leading-relaxed)] text-text-medium"
				>
					{selectedEntry.longDescription}
				</p>
			{:else}
				<p
					class="mb-[var(--space-6)] font-body text-[length:var(--text-body-lg-size)] leading-[var(--font-leading-relaxed)] text-text-medium"
				>
					{selectedEntry.description}
				</p>
			{/if}

			{#if selectedEntry.achievements && selectedEntry.achievements.length > 0}
				<ul class="mb-[var(--space-6)] flex flex-col gap-[var(--space-3)]">
					{#each selectedEntry.achievements as achievement (achievement)}
						<li
							class="flex gap-[var(--space-3)] font-body text-[length:var(--text-body-lg-size)] leading-[var(--font-leading-relaxed)] text-text-medium"
						>
							<span class="mt-[var(--space-1)] text-accent-text">•</span>
							<span>{achievement}</span>
						</li>
					{/each}
				</ul>
			{/if}

			{#if selectedEntry.tags.length > 0}
				<div class="flex flex-wrap gap-[var(--space-2)]">
					{#each selectedEntry.tags as tag (tag)}
						<Tag label={tag} variant="accent" />
					{/each}
				</div>
			{/if}

			{#if selectedEntry.links && selectedEntry.links.length > 0}
				<div class="mt-[var(--space-4)] flex flex-wrap gap-[var(--space-2)]">
					{#each selectedEntry.links as link (link.label)}
						{#if link.href}
							<a
								href={link.href}
								class="font-ui text-[length:var(--text-ui-size)] text-accent-text underline decoration-accent/40 underline-offset-2 transition-colors duration-[var(--duration-hover)] hover:text-accent-text hover:decoration-accent"
							>
								{link.label}
							</a>
						{:else}
							<span class="font-ui text-[length:var(--text-ui-size)] text-text-disabled">
								{link.label}
							</span>
						{/if}
					{/each}
				</div>
			{/if}
		</SideDrawer>
	{/if}
</Section>
