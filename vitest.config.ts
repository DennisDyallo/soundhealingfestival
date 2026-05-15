import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
		exclude: ["tests/e2e/**", "build/**", ".svelte-kit/**", "node_modules/**"],
		testTimeout: 120_000,
		hookTimeout: 120_000,
	},
});
