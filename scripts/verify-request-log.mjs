import { execSync } from "node:child_process";
import process from "node:process";

const GUARDED_PATTERNS = Object.freeze({
	src: /^src\//,
	static: /^static\//,
	scripts: /^scripts\//,
	coreDocs: /^docs\/[^/]+\.md$/,
});

const REQUEST_LOG_PATTERNS = Object.freeze({
	requests: /^docs\/request-log\/requests\//,
	index: /^docs\/request-log\/index\.json$/,
});

const runCommand = (command) => {
	try {
		return execSync(command, { encoding: "utf8" }).trim();
	} catch (error) {
		console.error(`❌ request-log guardrail: failed to run "${command}"`);
		console.error(error?.message ?? String(error));
		process.exit(1);
	}
};

const parseLines = (text) =>
	text
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

const trackedChanges = parseLines(
	runCommand("git diff --name-only --relative HEAD"),
);
const untrackedChanges = parseLines(
	runCommand("git ls-files --others --exclude-standard"),
);
const changedFiles = [...new Set([...trackedChanges, ...untrackedChanges])];

const guardedChanges = changedFiles.filter(
	(filePath) =>
		GUARDED_PATTERNS.src.test(filePath) ||
		GUARDED_PATTERNS.static.test(filePath) ||
		GUARDED_PATTERNS.scripts.test(filePath) ||
		(GUARDED_PATTERNS.coreDocs.test(filePath) &&
			!filePath.startsWith("docs/request-log/")),
);

if (guardedChanges.length === 0) {
	console.log(
		"✅ request-log guardrail: no guarded changes detected (src/, static/, scripts/, docs/*.md).",
	);
	process.exit(0);
}

const requestLogChanges = changedFiles.filter(
	(filePath) =>
		REQUEST_LOG_PATTERNS.requests.test(filePath) ||
		REQUEST_LOG_PATTERNS.index.test(filePath),
);

if (requestLogChanges.length > 0) {
	console.log(
		"✅ request-log guardrail: guarded changes detected and request-log update found.",
	);
	console.log(`   guarded files: ${guardedChanges.length}`);
	console.log(
		`   request-log files: ${requestLogChanges.map((filePath) => `"${filePath}"`).join(", ")}`,
	);
	process.exit(0);
}

console.error(
	"❌ request-log guardrail: guarded changes detected but no request-log update found.",
);
console.error(
	"   add at least one change in docs/request-log/requests/ or docs/request-log/index.json.",
);
console.error(
	`   guarded files: ${guardedChanges.map((filePath) => `"${filePath}"`).join(", ")}`,
);
process.exit(1);
