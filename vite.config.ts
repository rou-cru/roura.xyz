import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],

	test: {
		expect: { requireAssertions: true },

		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'lcov'],
			include: ['src/lib/**/*.{js,ts,svelte}'],
			exclude: ['src/lib/data/**', 'src/lib/types/**', '**/*.d.ts', '**/*.test.ts']
		},

		projects:
			process.env.VITEST_BROWSER === 'true'
				? [
						{
							extends: './vite.config.js',

							test: {
								name: 'client',

								browser: {
									enabled: true,
									provider: playwright(),
									instances: [{ browser: 'chromium', headless: true }]
								},

								include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
								exclude: ['src/lib/server/**']
							}
						},

						{
							extends: './vite.config.js',

							test: {
								name: 'server',
								environment: 'node',
								include: ['src/**/*.{test,spec}.{js,ts}'],
								exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
							}
						}
					]
				: [
						{
							extends: './vite.config.js',

							test: {
								name: 'server',
								environment: 'node',
								include: ['src/**/*.{test,spec}.{js,ts}'],
								exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
							}
						}
					]
	}
});
