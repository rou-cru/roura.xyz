import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: { command: 'npm run build && npm run preview', port: 4173 },
	testDir: 'e2e',
	projects: [
		{
			name: 'Desktop Chrome',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 13'] }
		}
	]
});
