import { describe, it, expect } from "vitest";
import { isBigint, isBoolean, isDate, isNumber, isString } from "../src";

describe("TypeGuard", () => {
	it("should extend Function", () => {
		expect(isNumber instanceof Function).toBe(true);
	});

	it("should work with Array.every", () => {
		const arr = ["hello", "hi", "bye"];

		expect(arr.every(isString)).toBe(true);
		expect(arr.every(isNumber)).toBe(false);
	});

	it("should work with Array.filter", () => {
		const arr = ["string", 12, true, null];

		expect(arr.filter(isNumber)).toEqual([12]);
	});

	it("should work with Array.find", () => {
		const arr = ["hello", new Date(), false, undefined];

		expect(arr.find(isBoolean)).toBe(false);
	});

	it("should work with Array.findIndex", () => {
		const arr = ["hello", new Date(), false, undefined];

		expect(arr.findIndex(isBoolean)).toBe(2);
	});

	it("should work with Array.findLast", () => {
		const arr = ["hello", new Date(), 12, "bye", undefined];

		expect(arr.findLast(isString)).toBe("bye");
	});

	it("should work with Array.findLastIndex", () => {
		const arr = ["hello", new Date(), 12, "bye", undefined];

		arr.keys

		expect(arr.findLastIndex(isString)).toBe(3);
	});

	it("should work with Array.map", () => {
		const arr = ["hello", new Date(), 12, "bye", undefined];

		expect(arr.map(isDate)).toEqual([false, true, false, false, false]);
	});

	it("should work with Array.some", () => {
		const arr = ["hello", new Date(), 12, "bye", undefined];

		expect(arr.some(isBigint)).toBe(false);
	});
});
