import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { PageServerLoad } from "./$types";

const homeHtmlPath = resolve(process.cwd(), "src/lib/content/home.html");
let homeHtmlPromise: Promise<string> | undefined;

const getHomeHtml = () => {
	homeHtmlPromise ??= readFile(homeHtmlPath, "utf-8");
	return homeHtmlPromise;
};

export const load: PageServerLoad = async () => ({
	pageHtml: await getHomeHtml(),
});
