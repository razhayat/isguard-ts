import { describe, expect, it } from "vitest";
import { describedGuardTests } from "./utils";
import { isMap, isNumber, isString, isArray, isBoolean, isNever, isUnknown } from "../src";

describe("is map", () => {
	it("should have .isKey and .isValue that are equal to the given guards", () => {
		const isNumberStringMap = isMap(isNumber, isString);

		expect(isNumberStringMap.isKey).toBe(isNumber);
		expect(isNumberStringMap.isValue).toBe(isString);
	});
});

describe("is Map<number, string>", () => {
	describedGuardTests({
		guards: [
			isMap(isNumber, isString),
			isMap(isNumber.or(isNever), isString),
			isMap(isNumber, isString.and(isUnknown)),
		],
		testCases: [
			[null, false],
			[undefined, false],
			["new Map()", false],
			[56, false],
			[56n, false],
			[[], false],
			[{}, false],
			[false, false],
			[Symbol.for("Map"), false],
			[new Date(), false],
			[() => new Map(), false],
			[new Set(), false],
			[new Map([[null, undefined]]), false],
			[new Map([["no", "hello"]]), false],
			[
				new Map<number, number | string>([
					[12, "hello"],
					[11, 12],
				]),
				false,
			],
			[new WeakMap(), false],
			[Map, false],
			[new Map(), true],
			[new Map(), true],
			[new Map(null), true],
			[new Map(undefined), true],
			[new Map([[12, "hello"]]), true],
			[
				new Map([
					[12, "hello"],
					[11, "bye"],
				]),
				true,
			],
		],
	});
});

describe("is Map<string, number>", () => {
	describedGuardTests({
		guards: [isMap(isString, isNumber), isMap(isString.or(isNever), isNumber.and(isUnknown))],
		testCases: [
			[null, false],
			[undefined, false],
			["", false],
			[56.123, false],
			[-2452523525352356n, false],
			[[], false],
			[{}, false],
			[true, false],
			[Symbol(), false],
			[Map, false],
			[[new Map()], false],

			[new Map([[1, "not valid"]]), false],
			[new Map([["key", "value"]]), false],

			[new Map([["key", NaN]]), true, { zod: "inverted" }],
			[new Map([["key", Infinity]]), true, { zod: "inverted" }],

			[new Map(), true],
			[new Map([["key", 42]]), true],
			[new Map([["", 0]]), true],
			[
				new Map([
					["a", 1],
					["b", 2],
					["c", 3],
				]),
				true,
			],
		],
	});
});

describe("is Map<string, boolean>", () => {
	describedGuardTests({
		guards: [isMap(isString, isBoolean)],
		testCases: [
			[null, false],
			[undefined, false],
			[String(), false],
			[-56.123, false],
			[-2452523525352356n, false],
			[[], false],
			[{}, false],
			[true, false],
			[Symbol(), false],
			[Set, false],
			[{ map: new Map() }, false],

			[new Map([[true, false]]), false],
			[new Map([["flag", 1]]), false],
			[new Map([["flag", "true"]]), false],

			[new Map(), true],
			[new Map([["enabled", true]]), true],
			[new Map([["disabled", false]]), true],
			[
				new Map([
					["a", true],
					["b", false],
					["c", true],
				]),
				true,
			],
		],
	});
});

describe("is Map<number, number[]>", () => {
	describedGuardTests({
		guards: [isMap(isNumber, isArray(isNumber)), isMap(isNumber, isNumber.array())],
		testCases: [
			[null, false],
			[undefined, false],
			[function () {}, false],
			[3.141592653589793, false],
			[2424452523525352356n, false],
			[[], false],
			[{}, false],
			[false, false],
			[Symbol.for("me"), false],
			[Boolean, false],
			[{ map: [new Map()] }, false],

			[new Map([[1, [1, 2, "3"]]]), false],
			[new Map([["key", [1, 2, 3]]]), false],

			[new Map(), true],
			[new Map([[1, []]]), true],
			[
				new Map([
					[1, [1, 2, 3]],
					[2, [4, 5, 6]],
				]),
				true,
			],
			[new Map([[0, [NaN]]]), true, { zod: "inverted" }],
		],
	});
});
