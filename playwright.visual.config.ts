import { defineConfig } from "@playwright/test";

const isCI = process.env.CI === "true";

export default defineConfig({
	testDir: "./tests/visual",
	fullyParallel: false,
	forbidOnly: isCI,
	retries: 0,
	workers: 1,
	reporter: "list",
	expect: {
		toHaveScreenshot: {
			animations: "disabled",
			caret: "hide",
			scale: "css",
			maxDiffPixelRatio: 0.01,
		},
	},
	use: {
		baseURL: "http://127.0.0.1:4173",
		trace: "on-first-retry",
		viewport: { width: 1440, height: 900 },
		colorScheme: "light",
		locale: "en-US",
		timezoneId: "Europe/Stockholm",
	},
	webServer: {
		command: "npm run dev -- --host 127.0.0.1 --port 4173 --strictPort",
		url: "http://127.0.0.1:4173",
		reuseExistingServer: !isCI,
	},
});
