import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const run = (command: string, args: string[]) =>
	spawnSync(command, args, {
		cwd: process.cwd(),
		encoding: "utf8",
		stdio: "pipe",
	});

describe("project script smoke tests", () => {
	it("runs migrate:source and produces generated outputs", () => {
		const result = run("node", ["./scripts/migrate-snapshot.mjs"]);
		expect(result.status).toBe(0);
		expect(
			existsSync(resolve(process.cwd(), "src/lib/content/home.html")),
		).toBe(true);
		expect(existsSync(resolve(process.cwd(), "src/lib/content/seo.ts"))).toBe(
			true,
		);
		expect(existsSync(resolve(process.cwd(), "static/wix.css"))).toBe(true);
	});

	it("runs perf budget script against fresh build artifacts", () => {
		const buildResult = run("npm", ["run", "build"]);
		expect(buildResult.status).toBe(0);

		const perfResult = run("node", ["./scripts/perf-budget.mjs"]);
		expect(perfResult.status).toBe(0);
		expect(perfResult.stdout).toContain("Budget checks");
	});
});
