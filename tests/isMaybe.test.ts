import { describe, expect, it } from "vitest";
import { isBoolean, isMaybe, isNumber } from "../src";
import { describedGuardTests } from "./utils";

describe("is maybe", () => {
	it("should have .unbox that should return the unboxed guard", () => {
		const is = isMaybe(isBoolean);

		expect(is.unbox()).toBe(isBoolean);
	});
});

describe("is maybe number", () => {
	describedGuardTests({
		guard: isMaybe(isNumber),
		equivalentGuards: [isNumber.maybe()],
		testCases: [
			[undefined, false],
			[false, false],
			[Symbol(), false],
			["123", false],
			[[], false],
			[{}, false],
			[function() {}, false],
			[new Date(), false],
			[Date, false],
			[BigInt(123), false],

			[123, true],
			[0, true],
			[-42, true],
			[3.14, true],
			[Infinity, true],
			[NaN, true],

			[null, true],
		],
	});
});
