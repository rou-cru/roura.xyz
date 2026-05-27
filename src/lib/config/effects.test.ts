// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { lockScroll, unlockScroll } from './effects';

beforeEach(() => {
	vi.restoreAllMocks();
});

describe('lockScroll', () => {
	it('returns the current window.scrollY so the caller can restore it later', () => {
		vi.stubGlobal('scrollY', 250);
		expect(lockScroll()).toBe(250);
	});

	it('returns 0 when the page is scrolled to the top', () => {
		vi.stubGlobal('scrollY', 0);
		expect(lockScroll()).toBe(0);
	});
});

describe('unlockScroll', () => {
	it('calls window.scrollTo with the given position and auto behavior', () => {
		const scrollTo = vi.fn();
		vi.stubGlobal('scrollTo', scrollTo);

		unlockScroll(350);

		expect(scrollTo).toHaveBeenCalledOnce();
		expect(scrollTo).toHaveBeenCalledWith({ top: 350, left: 0, behavior: 'auto' });
	});

	it('restores to the top when passed 0', () => {
		const scrollTo = vi.fn();
		vi.stubGlobal('scrollTo', scrollTo);

		unlockScroll(0);

		expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
	});

	it('clears the scrollBehavior override set by lockScroll', () => {
		vi.stubGlobal('scrollTo', vi.fn());
		lockScroll();
		expect(document.documentElement.style.scrollBehavior).toBe('auto');

		unlockScroll(0);
		expect(document.documentElement.style.scrollBehavior).toBe('');
	});
});

describe('lockScroll → unlockScroll roundtrip', () => {
	it('lock then unlock restores the scroll position that was locked', () => {
		const scrollTo = vi.fn();
		vi.stubGlobal('scrollY', 420);
		vi.stubGlobal('scrollTo', scrollTo);

		const savedPosition = lockScroll();
		unlockScroll(savedPosition);

		expect(savedPosition).toBe(420);
		expect(scrollTo).toHaveBeenCalledWith({ top: 420, left: 0, behavior: 'auto' });
	});

	it('handles multiple lock/unlock cycles independently', () => {
		const scrollTo = vi.fn();
		vi.stubGlobal('scrollTo', scrollTo);

		// Cycle 1
		vi.stubGlobal('scrollY', 150);
		const pos1 = lockScroll();
		unlockScroll(pos1);
		expect(scrollTo).toHaveBeenLastCalledWith({ top: 150, left: 0, behavior: 'auto' });

		// Cycle 2 — different scroll position
		vi.stubGlobal('scrollY', 900);
		const pos2 = lockScroll();
		unlockScroll(pos2);
		expect(scrollTo).toHaveBeenLastCalledWith({ top: 900, left: 0, behavior: 'auto' });

		// Cycle 3 — back to top
		vi.stubGlobal('scrollY', 0);
		const pos3 = lockScroll();
		unlockScroll(pos3);
		expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' });

		// Each cycle returned the right position
		expect(pos1).toBe(150);
		expect(pos2).toBe(900);
		expect(pos3).toBe(0);
	});
});
