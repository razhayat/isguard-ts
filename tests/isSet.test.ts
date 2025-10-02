import { describe, expect, it } from "vitest";
import { describedGuardTests } from "./utils";
import { isNumber, isSet } from "../src";

describe("is set", () => {
	it("should have .isValue that is equal to the given guard", () => {
		const isNumberSet = isSet(isNumber);

		expect(isNumberSet.isValue).toBe(isNumber);
	});
});

describe("is number set", () => {
	describedGuardTests({
		guard: isSet(isNumber),
		equivalentGuards: [isNumber.set()],
		testCases: [
			[null, false],
			[undefined, false],
			["new Set()", false],
			[56, false],
			[65n, false],
			[[], false],
			[{}, false],
			[true, false],
			[/123/g, false],
			[new Date(), false],
			[() => new Set(), false],
			[new Map(), false],
			[new Set([null, undefined]), false],
			[new Set(["no", "hello"]), false],
			[new Set([12, "hello", 11, 12]), false],
			[new WeakSet(), false],
			[Set, false],
			[new Set, true],
			[new Set(), true],
			[new Set(null), true],
			[new Set(undefined), true],
			[new Set([1, 2, 3]), true],
			[new Set([56, 61]), true],
			[new Set([1, 2, 3, 2]), true],
		],
	});
});
