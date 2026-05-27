import effectsTokens from '../../../design-system/tokens/components/effects.json';
import motionTokens from '../../../design-system/tokens/primitives/motion.json';

interface TiltConfig {
	readonly card: {
		readonly maxRotation: number;
		readonly setBrightness: boolean;
	};
	readonly carousel: {
		readonly maxRotation: number;
	};
}

export const tilt = {
	card: {
		maxRotation: effectsTokens.tilt.card['max-rotation'].value,
		setBrightness: effectsTokens.tilt.card['set-brightness'].value
	},
	carousel: {
		maxRotation: effectsTokens.tilt.carousel['max-rotation'].value
	}
} satisfies TiltConfig;

interface ShineConfig {
	readonly carousel: {
		readonly lightRadius: number;
		readonly lightColor: string;
	};
}

export const shine = {
	carousel: {
		/** Light radius in pixels - mirrors shine.carousel.light.radius token */
		lightRadius: effectsTokens.shine.carousel['light-radius'].value,
		/** Light color for the Shine carousel effect — sourced from design tokens */
		lightColor: 'var(--shine-carousel-light-color)'
	}
} satisfies ShineConfig;

/**
 * Lock page scroll by fixing body position and hiding overflow.
 * Saves the current scroll position so it can be restored later.
 * @returns The current window.scrollY value before locking.
 */
export function lockScroll(): number {
	const scrollY = window.scrollY;
	const body = document.body;
	const root = document.documentElement;

	body.style.position = 'fixed';
	body.style.top = `-${scrollY}px`;
	body.style.left = '0';
	body.style.right = '0';
	body.style.overflow = 'hidden';
	root.style.scrollBehavior = 'auto';

	return scrollY;
}

/**
 * Unlock page scroll by restoring body styles and scroll position.
 * @param scrollY - The scrollY value returned by a previous lockScroll() call.
 */
export function unlockScroll(scrollY: number): void {
	const body = document.body;
	const root = document.documentElement;

	body.style.position = '';
	body.style.top = '';
	body.style.left = '';
	body.style.right = '';
	body.style.overflow = '';
	root.style.scrollBehavior = '';
	window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
}

export type TiltPreset = keyof typeof tilt;
export type ShinePreset = keyof typeof shine;

interface MotionTimingConfig {
	readonly hover: string;
	readonly active: string;
	readonly entrance: string;
	readonly hero: string;
	readonly ease: string;
}

export const motionTiming = {
	hover: motionTokens.motion.duration.hover.value,
	active: motionTokens.motion.duration.active.value,
	entrance: motionTokens.motion.duration.entrance.value,
	hero: motionTokens.motion.duration.hero.value,
	ease: motionTokens.motion.ease.standard.value
} satisfies MotionTimingConfig;
