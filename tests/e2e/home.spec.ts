import { expect, test } from "@playwright/test";

test("homepage keeps core SEO metadata", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(/Sound Healing/i);
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		"content",
		/.+/,
	);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		"href",
		/soundhealingfestivalstockholm\.com/i,
	);
});

test("styleguide page is accessible", async ({ page }) => {
	await page.goto("/styleguide");

	await expect(
		page.getByRole("heading", { name: "Project Styleguide" }),
	).toBeVisible();
});

test("lineup text is revealed when scrolling", async ({ page }) => {
	await page.goto("/");

	const lineupList = page.locator("#comp-jkkuo5n0");
	await lineupList.scrollIntoViewIfNeeded();
	await expect(lineupList).toContainText("Daniel Reid/");
	await expect
		.poll(async () => lineupList.getAttribute("data-motion-enter"))
		.toBe("done");

	const opacity = await lineupList.evaluate((element) =>
		Number(getComputedStyle(element).opacity),
	);
	expect(opacity).toBeGreaterThan(0.6);
});
