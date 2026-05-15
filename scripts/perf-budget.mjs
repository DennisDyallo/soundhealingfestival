import fs from "node:fs/promises";
import path from "node:path";

const OLD_BASELINE = Object.freeze({
	builtHtmlBytes: 652_193,
	referencedJsFileCount: 17,
	referencedJsTotalBytes: 1_591_552,
	largestStaticImageBytes: 518_561,
});

const BUDGETS = Object.freeze({
	builtHtmlBytes: 560_000,
	referencedJsFileCount: 8,
	referencedJsTotalBytes: 620_000,
	largestStaticImageBytes: 520_000,
});

const IMAGE_EXTENSIONS = new Set([
	".jpg",
	".jpeg",
	".png",
	".webp",
	".gif",
	".svg",
	".ico",
	".avif",
]);

const rootDir = process.cwd();
const newHtmlPath = path.join(rootDir, "build", "index.html");
const newImageDir = path.join(rootDir, "build", "assets");
const args = new Set(process.argv.slice(2));
const enforce = args.has("--enforce");

const formatBytes = (value) => `${value.toLocaleString("en-US")} B`;
const formatPercentDelta = (oldValue, newValue) =>
	`${(((newValue - oldValue) / oldValue) * 100).toFixed(1)}%`;

const collectFiles = async (directoryPath) => {
	const entries = await fs.readdir(directoryPath, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.join(directoryPath, entry.name);
			if (entry.isDirectory()) {
				return collectFiles(fullPath);
			}
			if (entry.isFile()) {
				return [fullPath];
			}
			return [];
		}),
	);
	return nested.flat();
};

const resolveJsReferences = async (htmlPath) => {
	const html = await fs.readFile(htmlPath, "utf8");
	const jsRefs = new Set();
	const regex = /(?:src|href)=["']([^"']+\.js(?:\?[^"']*)?)["']/gi;

	for (const match of html.matchAll(regex)) {
		const rawRef = match[1];
		if (/^(?:[a-z]+:)?\/\//i.test(rawRef)) {
			continue;
		}
		jsRefs.add(rawRef.split(/[?#]/)[0]);
	}

	let totalBytes = 0;
	for (const ref of jsRefs) {
		const normalizedRef = ref.replace(/^\.\//, "");
		const resolvedPath = path.resolve(path.dirname(htmlPath), normalizedRef);
		const stats = await fs.stat(resolvedPath);
		totalBytes += stats.size;
	}

	return {
		referencedJsFileCount: jsRefs.size,
		referencedJsTotalBytes: totalBytes,
	};
};

const getLargestImage = async (directoryPath) => {
	const files = await collectFiles(directoryPath);
	let largestImage = { name: "(none)", size: 0 };

	for (const filePath of files) {
		const extension = path.extname(filePath).toLowerCase();
		if (!IMAGE_EXTENSIONS.has(extension)) {
			continue;
		}

		const stats = await fs.stat(filePath);
		if (stats.size > largestImage.size) {
			largestImage = {
				name: path.relative(rootDir, filePath),
				size: stats.size,
			};
		}
	}

	return largestImage;
};

const ensureBuildArtifacts = async () => {
	try {
		await fs.access(newHtmlPath);
		await fs.access(newImageDir);
	} catch {
		console.error(
			"Missing build artifacts. Run `npm run build` before running perf budgets.",
		);
		process.exit(1);
	}
};

const main = async () => {
	await ensureBuildArtifacts();

	const htmlStats = await fs.stat(newHtmlPath);
	const jsStats = await resolveJsReferences(newHtmlPath);
	const largestImage = await getLargestImage(newImageDir);

	const newMetrics = {
		builtHtmlBytes: htmlStats.size,
		referencedJsFileCount: jsStats.referencedJsFileCount,
		referencedJsTotalBytes: jsStats.referencedJsTotalBytes,
		largestStaticImageBytes: largestImage.size,
	};

	console.log(
		"Performance budget report (old baseline: extension-clean values tracked in COMPARISON.md)",
	);
	console.log(
		`- built HTML bytes: ${formatBytes(OLD_BASELINE.builtHtmlBytes)} -> ${formatBytes(newMetrics.builtHtmlBytes)} (${formatPercentDelta(OLD_BASELINE.builtHtmlBytes, newMetrics.builtHtmlBytes)})`,
	);
	console.log(
		`- referenced JS file count: ${OLD_BASELINE.referencedJsFileCount.toLocaleString("en-US")} -> ${newMetrics.referencedJsFileCount.toLocaleString("en-US")} (${formatPercentDelta(OLD_BASELINE.referencedJsFileCount, newMetrics.referencedJsFileCount)})`,
	);
	console.log(
		`- referenced JS total bytes: ${formatBytes(OLD_BASELINE.referencedJsTotalBytes)} -> ${formatBytes(newMetrics.referencedJsTotalBytes)} (${formatPercentDelta(OLD_BASELINE.referencedJsTotalBytes, newMetrics.referencedJsTotalBytes)})`,
	);
	console.log(
		`- largest static image bytes: ${formatBytes(OLD_BASELINE.largestStaticImageBytes)} -> ${formatBytes(newMetrics.largestStaticImageBytes)} (${formatPercentDelta(OLD_BASELINE.largestStaticImageBytes, newMetrics.largestStaticImageBytes)})`,
	);
	console.log(`  largest current image: ${largestImage.name}`);

	console.log("\nBudget checks (new build):");
	const checks = [
		["builtHtmlBytes", "Built HTML bytes"],
		["referencedJsFileCount", "Referenced JS file count"],
		["referencedJsTotalBytes", "Referenced JS total bytes"],
		["largestStaticImageBytes", "Largest static image bytes"],
	].map(([key, label]) => {
		const value = newMetrics[key];
		const budget = BUDGETS[key];
		const passed = value <= budget;
		const formattedValue =
			key === "referencedJsFileCount"
				? value.toLocaleString("en-US")
				: formatBytes(value);
		const formattedBudget =
			key === "referencedJsFileCount"
				? budget.toLocaleString("en-US")
				: formatBytes(budget);
		console.log(
			`${passed ? "✅" : "❌"} ${label}: ${formattedValue} (budget: ${formattedBudget})`,
		);
		return { key, passed };
	});

	const failedChecks = checks.filter((check) => !check.passed);
	if (failedChecks.length > 0) {
		const failureMessage = `Budget exceeded for: ${failedChecks.map((check) => check.key).join(", ")}`;
		if (enforce) {
			console.error(`\n${failureMessage}`);
			process.exit(1);
		}
		console.warn(`\n${failureMessage}`);
		console.warn("Run with --enforce to fail with a non-zero exit code.");
	}
};

await main();
