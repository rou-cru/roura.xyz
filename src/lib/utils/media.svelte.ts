/**
 * Reactive media query utilities for device capability detection.
 * Uses Svelte 5 reactive patterns with $state for automatic updates.
 * @module media.svelte
 */

/**
 * Reactive wrapper for CSS media queries.
 * Automatically updates when the media query match state changes.
 *
 * @example
 * ```ts
 * const isTouch = new MediaQuery('(pointer: coarse)');
 * // In template: {#if isTouch.matches}...{/if}
 * ```
 */
export class MediaQuery {
	#current = $state(false);
	#mql: MediaQueryList | null = null;
	#handler: ((e: MediaQueryListEvent) => void) | null = null;

	constructor(query: string) {
		if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
			this.#mql = window.matchMedia(query);
			this.#current = this.#mql.matches;
			this.#handler = (e: MediaQueryListEvent) => {
				this.#current = e.matches;
			};
			this.#mql.addEventListener('change', this.#handler);
		}
	}

	/** Current match state of the media query */
	get matches(): boolean {
		return this.#current;
	}

	/**
	 * Cleanup method to remove event listeners.
	 * Call this when the component is destroyed to prevent memory leaks.
	 */
	destroy(): void {
		if (this.#mql && this.#handler) {
			this.#mql.removeEventListener('change', this.#handler);
			this.#mql = null;
			this.#handler = null;
		}
	}
}

/**
 * Detects if primary input is coarse (touch/stylus).
 * Use to disable mouse-specific interactions on touch devices.
 */
export function createTouchQuery(): MediaQuery {
	return new MediaQuery('(pointer: coarse)');
}

/**
 * Detects if device supports true hover (not emulated).
 * Use to conditionally apply hover-only styles/behaviors.
 */
export function createHoverQuery(): MediaQuery {
	return new MediaQuery('(hover: hover)');
}

/**
 * Detects if primary pointer is fine (mouse/trackpad).
 * Use to enable precision-dependent interactions.
 */
export function createFinePointerQuery(): MediaQuery {
	return new MediaQuery('(pointer: fine)');
}
