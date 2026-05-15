import { spawnSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
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

	it("requires request-log updates for codex operating changes", () => {
		const tempRepo = mkdtempSync(resolve(tmpdir(), "request-log-guard-"));
		try {
			expect(spawnSync("git", ["init"], { cwd: tempRepo }).status).toBe(0);
			expect(
				spawnSync("git", ["config", "user.email", "test@example.com"], {
					cwd: tempRepo,
				}).status,
			).toBe(0);
			expect(
				spawnSync("git", ["config", "user.name", "Test User"], {
					cwd: tempRepo,
				}).status,
			).toBe(0);
			writeFileSync(resolve(tempRepo, "README.md"), "baseline\n");
			expect(
				spawnSync("git", ["add", "README.md"], { cwd: tempRepo }).status,
			).toBe(0);
			expect(
				spawnSync("git", ["commit", "-m", "baseline"], { cwd: tempRepo })
					.status,
			).toBe(0);

			mkdirSync(resolve(tempRepo, ".codex", "agents"), { recursive: true });
			writeFileSync(
				resolve(tempRepo, ".codex", "agents", "owner.md"),
				"changed\n",
			);

			const result = spawnSync(
				"node",
				[resolve(process.cwd(), "scripts/verify-request-log.mjs")],
				{ cwd: tempRepo, encoding: "utf8", stdio: "pipe" },
			);

			expect(result.status).toBe(1);
			expect(result.stderr).toContain(".codex/agents/owner.md");
		} finally {
			rmSync(tempRepo, { recursive: true, force: true });
		}
	});
});
