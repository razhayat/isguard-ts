import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isNumber, isSet } from "../src";

describe("is set", () => {
	describedGuardTests({
		guard: isSet(isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			["new Set()", false],
			[56, false],
			[[], false],
			[{}, false],
			[new Date(), false],
			[() => new Set(), false],
			[new Map(), false],
			[new Set([null, undefined]), false],
			[new Set(["no", "hello"]), false],
			[new Set([12, "hello", 11, 12]), false],
			[new Set(), true],
			[new Set([1, 2, 3]), true],
			[new Set([56, 61]), true],
			[new Set([1, 2, 3, 2]), true],
		],
	});
});
