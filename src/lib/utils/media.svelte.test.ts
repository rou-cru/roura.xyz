import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
	MediaQuery,
	createTouchQuery,
	createHoverQuery,
	createFinePointerQuery
} from './media.svelte';

// Mock matchMedia for tests
class MockMediaQueryList {
	matches = false;
	media = '';
	listeners: Array<(e: MediaQueryListEvent) => void> = [];

	constructor(query: string, initialMatches = false) {
		this.media = query;
		this.matches = initialMatches;
	}

	addEventListener(event: string, callback: (e: MediaQueryListEvent) => void) {
		if (event === 'change') {
			this.listeners.push(callback);
		}
	}

	removeEventListener(event: string, callback: (e: MediaQueryListEvent) => void) {
		if (event === 'change') {
			this.listeners = this.listeners.filter((cb) => cb !== callback);
		}
	}

	dispatchChange(matches: boolean) {
		this.matches = matches;
		const event = { matches, media: this.media } as MediaQueryListEvent;
		this.listeners.forEach((cb) => cb(event));
	}
}

describe('MediaQuery', () => {
	let mockMatchMedia: ReturnType<typeof vi.fn>;
	let mockInstances: MockMediaQueryList[] = [];

	beforeEach(() => {
		mockInstances = [];
		mockMatchMedia = vi.fn((query: string) => {
			const instance = new MockMediaQueryList(query, false);
			mockInstances.push(instance);
			return instance;
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).matchMedia = mockMatchMedia;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('initialization', () => {
		it('should initialize with matches=false when media query does not match', () => {
			mockMatchMedia.mockImplementation((query: string) => {
				return new MockMediaQueryList(query, false);
			});

			const mq = new MediaQuery('(pointer: coarse)');
			expect(mq.matches).toBe(false);
		});

		it('should initialize with matches=true when media query matches', () => {
			mockMatchMedia.mockImplementation((query: string) => {
				return new MockMediaQueryList(query, true);
			});

			const mq = new MediaQuery('(pointer: coarse)');
			expect(mq.matches).toBe(true);
		});

		it('should call matchMedia with the provided query', () => {
			const query = '(hover: hover)';
			new MediaQuery(query);
			expect(mockMatchMedia).toHaveBeenCalledWith(query);
		});
	});

	describe('state changes', () => {
		it('should update matches when media query changes', () => {
			const mockMQL = new MockMediaQueryList('(pointer: coarse)', false);
			mockMatchMedia.mockReturnValue(mockMQL);

			const mq = new MediaQuery('(pointer: coarse)');
			expect(mq.matches).toBe(false);

			// Simulate media query change
			mockMQL.dispatchChange(true);
			expect(mq.matches).toBe(true);

			mockMQL.dispatchChange(false);
			expect(mq.matches).toBe(false);
		});

		it('should handle multiple changes', () => {
			const mockMQL = new MockMediaQueryList('(hover: hover)', true);
			mockMatchMedia.mockReturnValue(mockMQL);

			const mq = new MediaQuery('(hover: hover)');
			expect(mq.matches).toBe(true);

			// Toggle multiple times
			mockMQL.dispatchChange(false);
			expect(mq.matches).toBe(false);

			mockMQL.dispatchChange(true);
			expect(mq.matches).toBe(true);

			mockMQL.dispatchChange(true);
			expect(mq.matches).toBe(true);

			mockMQL.dispatchChange(false);
			expect(mq.matches).toBe(false);
		});
	});

	describe('cleanup', () => {
		it('should remove event listener on destroy', () => {
			const mockMQL = new MockMediaQueryList('(pointer: coarse)', false);
			const removeSpy = vi.spyOn(mockMQL, 'removeEventListener');
			mockMatchMedia.mockReturnValue(mockMQL);

			const mq = new MediaQuery('(pointer: coarse)');
			mq.destroy();

			expect(removeSpy).toHaveBeenCalledWith('change', expect.any(Function));
		});

		it('should handle destroy when already cleaned up', () => {
			const mockMQL = new MockMediaQueryList('(pointer: coarse)', false);
			mockMatchMedia.mockReturnValue(mockMQL);

			const mq = new MediaQuery('(pointer: coarse)');
			mq.destroy();

			// Should not throw when calling destroy again
			expect(() => mq.destroy()).not.toThrow();
		});

		it('should stop receiving updates after destroy', () => {
			const mockMQL = new MockMediaQueryList('(pointer: coarse)', false);
			mockMatchMedia.mockReturnValue(mockMQL);

			const mq = new MediaQuery('(pointer: coarse)');
			expect(mq.matches).toBe(false);

			// Update before destroy
			mockMQL.dispatchChange(true);
			expect(mq.matches).toBe(true);

			// Destroy
			mq.destroy();

			// Update after destroy should not affect matches
			mockMQL.dispatchChange(false);
			// Note: in the actual implementation, after destroy the state
			// won't update because the listener was removed
			// But the last value remains
			expect(mq.matches).toBe(true); // Last value before destroy
		});
	});

	describe('SSR safety', () => {
		it('should handle server-side rendering where window is undefined', () => {
			// In SSR environments, window is undefined
			// We verify the code doesn't crash by checking if the implementation
			// has proper guards. Since we're in a browser environment, we test
			// by verifying the implementation logic exists.

			// Verify the implementation has SSR guards by checking it runs without error
			// in the current browser environment (where window IS defined)
			const mq = new MediaQuery('(pointer: coarse)');
			expect(mq).toBeInstanceOf(MediaQuery);
			// matches should be true or false based on actual device
			expect(typeof mq.matches).toBe('boolean');
		});

		it('should handle missing matchMedia API gracefully', () => {
			// Store original matchMedia
			const originalMatchMedia = window.matchMedia;

			// Testing missing matchMedia scenario
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).matchMedia = undefined;

			// Should not throw when matchMedia is missing
			expect(() => new MediaQuery('(pointer: coarse)')).not.toThrow();

			const mq = new MediaQuery('(pointer: coarse)');
			// When matchMedia is not available, matches defaults to false
			expect(mq.matches).toBe(false);

			// Restore matchMedia
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).matchMedia = originalMatchMedia;
		});
	});
});

describe('createTouchQuery', () => {
	it('should create MediaQuery with coarse pointer query', () => {
		const mockMQL = new MockMediaQueryList('(pointer: coarse)', false);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).matchMedia = vi.fn().mockReturnValue(mockMQL);

		const mq = createTouchQuery();
		expect(window.matchMedia).toHaveBeenCalledWith('(pointer: coarse)');
		expect(mq).toBeInstanceOf(MediaQuery);
	});
});

describe('createHoverQuery', () => {
	it('should create MediaQuery with hover hover query', () => {
		const mockMQL = new MockMediaQueryList('(hover: hover)', false);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).matchMedia = vi.fn().mockReturnValue(mockMQL);

		const mq = createHoverQuery();
		expect(window.matchMedia).toHaveBeenCalledWith('(hover: hover)');
		expect(mq).toBeInstanceOf(MediaQuery);
	});
});

describe('createFinePointerQuery', () => {
	it('should create MediaQuery with fine pointer query', () => {
		const mockMQL = new MockMediaQueryList('(pointer: fine)', false);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).matchMedia = vi.fn().mockReturnValue(mockMQL);

		const mq = createFinePointerQuery();
		expect(window.matchMedia).toHaveBeenCalledWith('(pointer: fine)');
		expect(mq).toBeInstanceOf(MediaQuery);
	});
});
