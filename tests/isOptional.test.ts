import { describe, expect, it } from "vitest";
import {
	isNumber,
	isOptional,
	isString,
	isUndefined,
	isUnion,
	isArray,
	isDate,
	isNever,
	isUnknown,
} from "../src";
import { describedGuardTests } from "./utils";

describe("is optional", () => {
	it("should have .unbox that should return the unboxed guard", () => {
		const isValue = isNumber.array();
		const is = isOptional(isValue);

		expect(is.unbox()).toBe(isValue);
	});
});

describe("is optional string", () => {
	describedGuardTests({
		guards: [
			isOptional(isString),
			isString.optional(),
			isUnion(isString, isUndefined),
			isUndefined.or(isString),
		],
		testCases: [
			[null, false],
			[123, false],
			[true, false],
			[Symbol(), false],
			[[], false],
			[{}, false],
			[() => {}, false],
			[BigInt(123), false],

			["hello", true],
			["", true],

			[undefined, true],
			[void 0, true],
		],
	});
});

describe("is optional number", () => {
	describedGuardTests({
		guards: [
			isOptional(isNumber),
			isNumber.optional(),
			isUnion(isNumber, isUndefined),
			isNumber.or(isUndefined, isNever),
		],
		testCases: [
			[null, false],
			["0", false],
			[[], false],
			[{}, false],
			[() => {}, false],
			[new Date(), false],
			[Symbol(), false],
			[true, false],
			[false, false],

			[0, true],
			[NaN, true, { zod: "inverted" }],
			[Infinity, true, { zod: "inverted" }],

			[undefined, true],
		],
	});
});

describe("is optional date", () => {
	describedGuardTests({
		guards: [
			isOptional(isDate),
			isDate.optional(),
			isDate.or(isUndefined),
			isDate.and(isUnknown).or(isNever).or(isUndefined),
		],
		testCases: [
			[null, false],
			["2024-01-01", false],
			[[], false],
			[{}, false],
			[() => {}, false],
			[123, false],
			[true, false],
			[Symbol(), false],
			[new Map(), false],

			[undefined, true],
			[new Date(), true],
		],
	});
});

describe("is optional number array", () => {
	describedGuardTests({
		guards: [
			isOptional(isArray(isNumber)),
			isOptional(isNumber.array()),
			isNumber.array().optional(),
		],
		testCases: [
			[null, false],
			[[1, "2"], false],
			["[1, 2]", false],
			[{}, false],
			[() => {}, false],
			[new Date(), false],
			[123, false],
			[true, false],
			[Symbol(), false],
			[new Set(), false],

			[[], true],
			[[1, 2, 3], true],

			[undefined, true],
		],
	});
});
