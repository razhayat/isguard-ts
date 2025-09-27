import { describe } from "vitest";
import { isMaybe, isNumber } from "../src";
import { describedGuardTests } from "./utils";

describe("isMaybe", () => {
	describedGuardTests({
		guard: isMaybe(isNumber),
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
