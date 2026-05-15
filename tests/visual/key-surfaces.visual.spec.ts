import { expect, type Page, test } from "@playwright/test";

const waitForStableRender = async (page: Page) => {
	await page.waitForLoadState("networkidle");
	await page.evaluate(async () => {
		await document.fonts.ready;
	});
};

test.describe("key surface visual regressions", () => {
	test("homepage keeps visual parity", async ({ page }) => {
		await page.goto("/");
		await waitForStableRender(page);

		await expect(page).toHaveScreenshot("homepage.png", {
			fullPage: true,
		});
	});

	test("styleguide keeps visual parity", async ({ page }) => {
		await page.goto("/styleguide");
		await waitForStableRender(page);
		await expect(
			page.getByRole("heading", { name: "Project Styleguide" }),
		).toBeVisible();

		await expect(page).toHaveScreenshot("styleguide.png", {
			fullPage: true,
		});
	});
});
