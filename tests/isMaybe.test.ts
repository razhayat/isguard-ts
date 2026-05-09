import { describe, expect, it } from "vitest";
import { isBoolean, isMaybe, isNull, isNumber, isUnion, isString, isArray, isNever } from "../src";
import { describedGuardTests } from "./utils";

describe("is maybe", () => {
	it("should have .unbox that should return the unboxed guard", () => {
		const is = isMaybe(isBoolean);

		expect(is.unbox()).toBe(isBoolean);
	});
});

describe("is maybe number", () => {
	describedGuardTests({
		guards: [
			isMaybe(isNumber),
			isNumber.maybe(),
			isUnion(isNumber, isNull),
			isNull.or(isNumber),
		],
		testCases: [
			[undefined, false],
			[false, false],
			[Symbol(), false],
			["123", false],
			[[], false],
			[{}, false],
			[function () {}, false],
			[new Date(), false],
			[Date, false],
			[BigInt(123), false],

			[123, true],
			[0, true],
			[-42, true],
			[3.14, true],
			[Infinity, true, { zod: "inverted" }],
			[NaN, true, { zod: "inverted" }],

			[null, true],
		],
	});
});

describe("is maybe string", () => {
	describedGuardTests({
		guards: [
			isMaybe(isString),
			isString.maybe(),
			isUnion(isNull, isString),
			isString.or(isNull),
		],
		testCases: [
			[undefined, false],
			[0, false],
			[true, false],
			[[], false],
			[{}, false],
			[() => {}, false],
			[new Date(), false],
			[Symbol(), false],

			["hello", true],
			["", true],

			[null, true],
		],
	});
});

describe("is maybe string array", () => {
	describedGuardTests({
		guards: [
			isMaybe(isArray(isString)),
			isMaybe(isString.array()),
			isString.array().maybe(),
			isString.or(isNever).array().maybe(),
		],
		testCases: [
			[undefined, false],
			[[1, 2], false],
			["hello", false],
			[{}, false],
			[[[[[[""]]]]], false],
			[() => {}, false],
			[new Date(), false],
			[123, false],
			[true, false],
			[Symbol(), false],

			[[], true],
			[["hello"], true],

			[null, true],
		],
	});
});
