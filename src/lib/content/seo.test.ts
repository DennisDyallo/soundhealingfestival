import { describe, expect, it } from "vitest";
import { seo } from "./seo";

describe("seo content", () => {
	it("keeps key metadata fields populated", () => {
		expect(seo.title.length).toBeGreaterThan(0);
		expect(seo.description.length).toBeGreaterThan(0);
		expect(seo.canonical).toMatch(/^https?:\/\//);
		expect(seo.ogTitle.length).toBeGreaterThan(0);
		expect(seo.ogDescription.length).toBeGreaterThan(0);
		expect(seo.ogUrl).toMatch(/^https?:\/\//);
	});

	it("keeps structured data parseable", () => {
		expect(Array.isArray(seo.structuredData)).toBe(true);
		for (const schema of seo.structuredData) {
			expect(schema).toBeTypeOf("object");
			expect(schema).not.toBeNull();
		}
	});
});
