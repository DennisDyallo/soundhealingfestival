import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const SOURCE_HTML_FILE =
	"Sound Healing Evening Stockholm Sweden, 15 Februar 2026.html";
const SOURCE_ASSET_DIR =
	"Sound Healing Evening Stockholm Sweden, 15 Februar 2026_files";

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
const JPEG_EXTENSIONS = new Set([".jpg", ".jpeg"]);

const rootDir = process.cwd();
const sourceHtmlPath = path.join(rootDir, SOURCE_HTML_FILE);
const sourceAssetDir = path.join(rootDir, SOURCE_ASSET_DIR);
const contentDir = path.join(rootDir, "src", "lib", "content");
const outputHtmlPath = path.join(contentDir, "home.html");
const outputCssPath = path.join(contentDir, "wix.css");
const outputStaticCssPath = path.join(rootDir, "static", "wix.css");
const outputSeoPath = path.join(contentDir, "seo.ts");
const outputAssetDir = path.join(rootDir, "static", "assets");

const rewriteAssetPath = (input) => {
	return input
		.replaceAll(`./${SOURCE_ASSET_DIR}/`, "/assets/")
		.replaceAll(`${SOURCE_ASSET_DIR}/`, "/assets/")
		.replaceAll(encodeURI(`./${SOURCE_ASSET_DIR}/`), "/assets/")
		.replaceAll(encodeURI(`${SOURCE_ASSET_DIR}/`), "/assets/");
};

const toPositiveInteger = (value) => {
	const parsed = Number.parseInt(String(value), 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const extractDimensionsFromSourceSet = (sourceSet = "") => {
	const sourceSetMatch = sourceSet.match(/w_(\d+),h_(\d+)/);
	if (!sourceSetMatch) {
		return null;
	}

	const width = toPositiveInteger(sourceSetMatch[1]);
	const height = toPositiveInteger(sourceSetMatch[2]);
	return width && height ? { width, height } : null;
};

const extractDimensionsFromStyle = (styleValue = "") => {
	const widthMatch = styleValue.match(/(?:^|;)\s*width:\s*(\d+)px\s*;?/i);
	const heightMatch = styleValue.match(/(?:^|;)\s*height:\s*(\d+)px\s*;?/i);
	if (!widthMatch || !heightMatch) {
		return null;
	}

	const width = toPositiveInteger(widthMatch[1]);
	const height = toPositiveInteger(heightMatch[1]);
	return width && height ? { width, height } : null;
};

const extractDimensionsFromWowImage = (wowImageData = "") => {
	try {
		const parsedData = JSON.parse(wowImageData);
		const width = toPositiveInteger(parsedData?.targetWidth);
		const height = toPositiveInteger(parsedData?.targetHeight);
		return width && height ? { width, height } : null;
	} catch {
		return null;
	}
};

const isJpegtranAvailable = () => {
	const result = spawnSync("jpegtran", ["-version"], { stdio: "ignore" });
	return result.status === 0;
};

const optimizeJpegLosslessly = async (assetPath) => {
	const optimizedAssetPath = `${assetPath}.optimized`;
	const optimizeResult = spawnSync(
		"jpegtran",
		[
			"-copy",
			"all",
			"-optimize",
			"-progressive",
			"-outfile",
			optimizedAssetPath,
			assetPath,
		],
		{ stdio: "ignore" },
	);

	if (optimizeResult.status !== 0) {
		await fs.rm(optimizedAssetPath, { force: true });
		return false;
	}

	await fs.rename(optimizedAssetPath, assetPath);
	return true;
};

const toObjectLiteral = (value) => JSON.stringify(value, null, 2);

const main = async () => {
	const html = await fs.readFile(sourceHtmlPath, "utf8");
	const $ = load(html, { decodeEntities: false });

	const title = $("title").first().text().trim();
	const description =
		$('meta[name="description"]').attr("content")?.trim() ?? "";
	const canonical = $('link[rel="canonical"]').attr("href")?.trim() ?? "";
	const ogImage = $('meta[property="og:image"]').attr("content")?.trim() ?? "";
	const ogTitle =
		$('meta[property="og:title"]').attr("content")?.trim() ?? title;
	const ogDescription =
		$('meta[property="og:description"]').attr("content")?.trim() ?? description;
	const ogUrl =
		$('meta[property="og:url"]').attr("content")?.trim() ?? canonical;
	const ogSiteName =
		$('meta[property="og:site_name"]').attr("content")?.trim() ?? "";
	const ogType = $('meta[property="og:type"]').attr("content")?.trim() ?? "";
	const ogImageWidth =
		$('meta[property="og:image:width"]').attr("content")?.trim() ?? "";
	const ogImageHeight =
		$('meta[property="og:image:height"]').attr("content")?.trim() ?? "";
	const twitterCard =
		$('meta[name="twitter:card"]').attr("content")?.trim() ?? "";
	const twitterTitle =
		$('meta[name="twitter:title"]').attr("content")?.trim() ?? ogTitle;
	const twitterDescription =
		$('meta[name="twitter:description"]').attr("content")?.trim() ??
		ogDescription;
	const twitterImage =
		$('meta[name="twitter:image"]').attr("content")?.trim() ?? ogImage;
	const favicon = $('link[rel="icon"]').first().attr("href")?.trim() ?? "";
	const appleTouchIcon =
		$('link[rel="apple-touch-icon"]').first().attr("href")?.trim() ?? "";
	const structuredData = $('script[type="application/ld+json"]')
		.toArray()
		.map((element) => $(element).html()?.trim() ?? "")
		.filter((value) => value.length > 0)
		.map((value) => JSON.parse(value));

	$("script, noscript").remove();
	$('[data-hook="consent-banner-root"]').remove();

	const images = $("img").toArray();
	let highestPriorityImageAssigned = false;
	for (const imageElement of images) {
		const image = $(imageElement);
		const parent = image.parent();
		const parentTagName = parent.prop("tagName")?.toLowerCase() ?? "";

		if (!image.attr("decoding")) {
			image.attr("decoding", "async");
		}

		const needsWidth = !toPositiveInteger(image.attr("width"));
		const needsHeight = !toPositiveInteger(image.attr("height"));
		if (needsWidth || needsHeight) {
			const dimensions =
				extractDimensionsFromSourceSet(
					parent.find("source").first().attr("srcset"),
				) ??
				extractDimensionsFromWowImage(parent.attr("data-image-info")) ??
				extractDimensionsFromStyle(image.attr("style"));

			if (dimensions) {
				image.attr("width", String(dimensions.width));
				image.attr("height", String(dimensions.height));
			}
		}

		const fetchPriority = image.attr("fetchpriority");
		if (fetchPriority === "high") {
			image.attr("loading", "eager");
			if (highestPriorityImageAssigned) {
				image.removeAttr("fetchpriority");
			} else {
				highestPriorityImageAssigned = true;
			}
		}

		if (parentTagName === "picture") {
			image.attr("loading", "lazy");
			image.attr("fetchpriority", "low");
			continue;
		}

		if (!image.attr("loading")) {
			image.attr("loading", "lazy");
		}

		if (
			image.attr("loading") === "lazy" &&
			image.attr("fetchpriority") !== "high"
		) {
			image.attr("fetchpriority", "low");
		}
	}

	const cssBlocks = $("style")
		.toArray()
		.map((styleElement) => $(styleElement).html() ?? "")
		.filter((block) => block.trim().length > 0)
		.map((block) => rewriteAssetPath(block));
	const cssOutput = cssBlocks.join("\n\n");

	const siteContainer = $("#SITE_CONTAINER").first();
	const bodyContent =
		siteContainer.length > 0
			? siteContainer.prop("outerHTML")
			: ($("body").html() ?? "");
	const htmlOutput = rewriteAssetPath(bodyContent)
		.replaceAll("<!--$-->", "")
		.replaceAll("<!--/$-->", "")
		.trim();

	await fs.mkdir(contentDir, { recursive: true });
	await fs.writeFile(outputCssPath, `${cssOutput}\n`, "utf8");
	await fs.mkdir(path.dirname(outputStaticCssPath), { recursive: true });
	await fs.writeFile(outputStaticCssPath, `${cssOutput}\n`, "utf8");
	await fs.writeFile(outputHtmlPath, `${htmlOutput}\n`, "utf8");

	const seo = {
		title,
		description,
		canonical,
		ogImage,
		ogTitle,
		ogDescription,
		ogUrl,
		ogSiteName,
		ogType,
		ogImageWidth,
		ogImageHeight,
		twitterCard,
		twitterTitle,
		twitterDescription,
		twitterImage,
		favicon,
		appleTouchIcon,
		structuredData,
	};
	await fs.writeFile(
		outputSeoPath,
		`export const seo = ${toObjectLiteral(seo)} as const;\n`,
		"utf8",
	);

	await fs.mkdir(outputAssetDir, { recursive: true });
	const sourceAssetEntries = await fs.readdir(sourceAssetDir, {
		withFileTypes: true,
	});
	const canUseJpegtran = isJpegtranAvailable();

	let copiedCount = 0;
	let optimizedCount = 0;
	for (const entry of sourceAssetEntries) {
		if (!entry.isFile()) {
			continue;
		}

		const ext = path.extname(entry.name).toLowerCase();
		if (!IMAGE_EXTENSIONS.has(ext)) {
			continue;
		}

		const sourcePath = path.join(sourceAssetDir, entry.name);
		const targetPath = path.join(outputAssetDir, entry.name);
		await fs.copyFile(sourcePath, targetPath);

		if (canUseJpegtran && JPEG_EXTENSIONS.has(ext)) {
			const optimized = await optimizeJpegLosslessly(targetPath);
			if (optimized) {
				optimizedCount += 1;
			}
		}

		copiedCount += 1;
	}

	console.log(
		`Wrote sanitized HTML to ${path.relative(rootDir, outputHtmlPath)}`,
	);
	console.log(
		`Wrote extracted CSS to ${path.relative(rootDir, outputCssPath)}`,
	);
	console.log(
		`Wrote static CSS to ${path.relative(rootDir, outputStaticCssPath)}`,
	);
	console.log(`Wrote SEO metadata to ${path.relative(rootDir, outputSeoPath)}`);
	console.log(
		`Copied ${copiedCount} static assets to ${path.relative(rootDir, outputAssetDir)}`,
	);
	if (canUseJpegtran) {
		console.log(
			`Losslessly optimized ${optimizedCount} JPEG assets with jpegtran`,
		);
	} else {
		console.log("jpegtran unavailable; skipped lossless JPEG optimization.");
	}
};

await main();
