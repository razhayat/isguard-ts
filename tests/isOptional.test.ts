import { describe } from "vitest";
import { isOptional, isString } from "../src";
import { describedGuardTests } from "./utils";

describe("isOptional", () => {
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
