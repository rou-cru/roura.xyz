/**
 * Interactive effects configuration.
 * Values mirror design-system/tokens/components/effects.json
 * Integrates with motion tokens from design-system/tokens/primitives/motion.json
 * TODO: Generate this file from Style Dictionary when JS output is configured
 */

export const tilt = {
	card: {
		/** Maximum rotation in degrees - mirrors tilt.card.max-rotation token */
		maxRotation: 10,
		/** Whether to adjust brightness on tilt - mirrors tilt.card.set-brightness token */
		setBrightness: true
	},
	carousel: {
		/** Maximum rotation in degrees for carousel items - mirrors tilt.carousel.max-rotation token */
		maxRotation: 10
	}
} as const;

export const shine = {
	carousel: {
		/** Light radius in pixels - mirrors shine.carousel.light.radius token */
		lightRadius: 280,
		/**
		 * Light color - uses semantic color reference
		 * In dkstudio.com this was {color.sage.neon}
		 * In roura.xyz we reference the accent color
		 */
		lightColor: 'var(--color-accent-main, oklch(0.68 0.15 145))'
	}
} as const;

export type TiltPreset = keyof typeof tilt;
export type ShinePreset = keyof typeof shine;

/**
 * Motion timing references from design-system/tokens/primitives/motion.json
 * Used for coordinating effect animations with design system motion
 */
export const motionTiming = {
	/** Duration for hover effects: 200ms */
	hover: '200ms',
	/** Duration for active/press effects: 100ms */
	active: '100ms',
	/** Duration for entrance animations: 400ms */
	entrance: '400ms',
	/** Duration for hero animations: 600ms */
	hero: '600ms',
	/** Standard easing curve */
	ease: 'cubic-bezier(0.4, 0, 0.2, 1)'
} as const;
