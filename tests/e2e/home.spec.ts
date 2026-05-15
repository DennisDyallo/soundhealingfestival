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
