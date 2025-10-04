import { describe, expect, it } from "vitest";
import { isNumber, isOptional, isString } from "../src";
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
		guard: isOptional(isString),
		equivalentGuards: [isString.optional()],
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
