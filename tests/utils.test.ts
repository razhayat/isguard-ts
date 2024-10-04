import { describe, expect, it } from "vitest";
import { extractTemplate, isString, isType } from "../src";

describe("extractTemplate", () => {
	it("should return given template", () => {
		const template = { name: isString };
		const result = extractTemplate(template, isType({ name: isString }));

		expect(result).toBe(template);
	});

	it("should return nested template", () => {
		const template = () => ({ name: isString });
		const result = extractTemplate(template, isType({ name: isString }));

		expect(result).toEqual({ name: isString });
	});

	it("should return deeply nested template", () => {
		const template = () => () => ({ name: isString });
		const result = extractTemplate(template, isType({ name: isString }));

		expect(result).toEqual({ name: isString });
	});

	it("should return very deeply nested template", () => {
		const template = () => () => () => ({ name: isString });
		const result = extractTemplate(template, isType({ name: isString }));

		expect(result).toEqual({ name: isString });
	});
});
