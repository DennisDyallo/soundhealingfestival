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

const rootDir = process.cwd();
const sourceHtmlPath = path.join(rootDir, SOURCE_HTML_FILE);
const sourceAssetDir = path.join(rootDir, SOURCE_ASSET_DIR);
const contentDir = path.join(rootDir, "src", "lib", "content");
const outputHtmlPath = path.join(contentDir, "home.html");
const outputCssPath = path.join(contentDir, "wix.css");
const outputSeoPath = path.join(contentDir, "seo.ts");
const outputAssetDir = path.join(rootDir, "static", "assets");

const cleanInlineStyle = (styleValue) => {
	return styleValue
		.split(";")
		.map((rule) => rule.trim())
		.filter((rule) => rule.length > 0 && !rule.includes("darkreader"))
		.join("; ");
};

const rewriteAssetPath = (input) => {
	return input
		.replaceAll(`./${SOURCE_ASSET_DIR}/`, "/assets/")
		.replaceAll(`${SOURCE_ASSET_DIR}/`, "/assets/")
		.replaceAll(encodeURI(`./${SOURCE_ASSET_DIR}/`), "/assets/")
		.replaceAll(encodeURI(`${SOURCE_ASSET_DIR}/`), "/assets/");
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
	$("style").each((_, element) => {
		const styleTag = $(element);
		const className = styleTag.attr("class") ?? "";
		if (
			className.includes("darkreader") ||
			styleTag.html()?.includes("darkreader")
		) {
			styleTag.remove();
		}
	});

	$("*").each((_, element) => {
		const current = $(element);
		for (const [attrName, attrValue] of Object.entries(element.attribs ?? {})) {
			if (attrName.startsWith("data-darkreader")) {
				current.removeAttr(attrName);
				continue;
			}

			if (
				attrName === "class" &&
				typeof attrValue === "string" &&
				attrValue.includes("darkreader")
			) {
				const filteredClass = attrValue
					.split(/\s+/)
					.filter((token) => token.length > 0 && !token.includes("darkreader"))
					.join(" ");
				if (filteredClass.length === 0) {
					current.removeAttr("class");
				} else {
					current.attr("class", filteredClass);
				}
			}

			if (
				attrName === "style" &&
				typeof attrValue === "string" &&
				attrValue.includes("darkreader")
			) {
				const cleanedStyle = cleanInlineStyle(attrValue);
				if (cleanedStyle.length === 0) {
					current.removeAttr("style");
				} else {
					current.attr("style", cleanedStyle);
				}
			}
		}
	});

	$("protonpass-root-53e8").remove();
	$('[data-hook="consent-banner-root"]').remove();

	const cssBlocks = $("style")
		.toArray()
		.map((styleElement) => $(styleElement).html() ?? "")
		.filter((block) => block.trim().length > 0)
		.map((block) => rewriteAssetPath(block));
	const cssOutput = cssBlocks.join("\n\n").replaceAll("darkreader", "");

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

	let copiedCount = 0;
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
		copiedCount += 1;
	}

	console.log(
		`Wrote sanitized HTML to ${path.relative(rootDir, outputHtmlPath)}`,
	);
	console.log(
		`Wrote extracted CSS to ${path.relative(rootDir, outputCssPath)}`,
	);
	console.log(`Wrote SEO metadata to ${path.relative(rootDir, outputSeoPath)}`);
	console.log(
		`Copied ${copiedCount} static assets to ${path.relative(rootDir, outputAssetDir)}`,
	);
};

await main();
