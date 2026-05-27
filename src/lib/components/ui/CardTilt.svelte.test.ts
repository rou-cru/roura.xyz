import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, cleanup } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import CardTilt from './CardTilt.svelte';
import { createTextSnippet } from './test-utils';

/**
 * Helper to render CardTilt with common test setup.
 * Uses `target: document.body` for consistent DOM attachment.
 */
function renderCardTilt(extraProps: Record<string, unknown> = {}) {
	return render(CardTilt, {
		target: document.body,
		props: {
			children: createTextSnippet('Tilted Content'),
			...extraProps
		}
	});
}

/** Minimal valid MediaQueryList mock for touch environment */
function mockTouchDevice(): void {
	vi.stubGlobal(
		'matchMedia',
		vi.fn().mockImplementation((query: string) => ({
			matches: query === '(pointer: coarse)',
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(), // legacy
			removeListener: vi.fn(), // legacy
			dispatchEvent: vi.fn()
		}))
	);
}

/** Minimal valid MediaQueryList mock for pointer environment */
function mockPointerDevice(): void {
	vi.stubGlobal(
		'matchMedia',
		vi.fn().mockImplementation((_query: string) => ({
			matches: false,
			media: _query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(), // legacy
			removeListener: vi.fn(), // legacy
			dispatchEvent: vi.fn()
		}))
	);
}

describe('CardTilt', () => {
	beforeEach(async () => {
		document.body.innerHTML = '';
		vi.restoreAllMocks();
		await cleanup();
	});

	describe('rendering', () => {
		it('should render children content in pointer environment', async () => {
			mockPointerDevice();

			renderCardTilt({
				children: createTextSnippet('Visible in CardTilt'),
				'data-testid': 'tilt-card'
			});

			await expect.element(page.getByTestId('tilt-card')).toBeInTheDocument();
			await expect.element(page.getByText('Visible in CardTilt')).toBeInTheDocument();
		});

		it('should forward class and data-testid to the inner Card', async () => {
			mockPointerDevice();

			renderCardTilt({
				'data-testid': 'forwarded-card',
				class: 'custom-extra'
			});

			const card = page.getByTestId('forwarded-card');
			await expect.element(card).toBeInTheDocument();
			await expect.element(card).toHaveAttribute('class', expect.stringContaining('custom-extra'));
		});

		it('should preserve data-card attribute on the inner Card', async () => {
			mockPointerDevice();

			renderCardTilt({ 'data-testid': 'data-card-check' });

			await expect.element(page.getByTestId('data-card-check')).toHaveAttribute('data-card');
		});

		it('should forward ARIA attributes to the inner Card', async () => {
			mockPointerDevice();

			renderCardTilt({
				'data-testid': 'aria-card',
				'aria-labelledby': 'heading-1',
				role: 'article'
			});

			const card = page.getByTestId('aria-card');
			await expect.element(card).toHaveAttribute('aria-labelledby', 'heading-1');
			await expect.element(card).toHaveAttribute('role', 'article');
		});

		it('should forward sanitized id to the inner Card', async () => {
			mockPointerDevice();

			renderCardTilt({
				id: '#Tilt Card',
				'data-testid': 'id-card'
			});

			await expect.element(page.getByTestId('id-card')).toHaveAttribute('id', 'tilt-card');
		});
	});

	describe('touch detection', () => {
		it('should render Card statically on touch devices (no Tilt wrapper)', async () => {
			mockTouchDevice();

			renderCardTilt({ 'data-testid': 'touch-card' });

			// Card is still rendered
			await expect.element(page.getByTestId('touch-card')).toBeInTheDocument();
			// data-card attribute preserved
			await expect.element(page.getByTestId('touch-card')).toHaveAttribute('data-card');
		});

		it('should render children visible on touch devices', async () => {
			mockTouchDevice();

			renderCardTilt({
				children: createTextSnippet('Touch Content'),
				'data-testid': 'touch-child'
			});

			await expect.element(page.getByTestId('touch-child')).toBeInTheDocument();
			await expect.element(page.getByText('Touch Content')).toBeInTheDocument();
		});

		it('should wrap Card in touch-feedback container on touch devices', async () => {
			mockTouchDevice();

			renderCardTilt({ 'data-testid': 'touch-wrap' });

			const card = page.getByTestId('touch-wrap');
			await expect.element(card).toBeInTheDocument();
			// Verify the card is inside a wrapper with the touch feedback class
			const wrapper = card.element().parentElement;
			expect(wrapper).not.toBeNull();
			expect(wrapper?.classList.contains('touch-scale-active')).toBe(true);
		});
	});
});
