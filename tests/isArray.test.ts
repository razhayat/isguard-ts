import { describe } from "vitest";
import { isNumberArray } from "../src";
import { describedGuardTests } from "./utils";

describe("is number array", () => {
	describedGuardTests({
		guard: isNumberArray,
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[{}, false],
			[[], true],
			[new Array(35), true],
			[[6, -6, 6.66], true],
			[["1", 2, 3], false],
			[1, false],
			[["hello", "bye"], false],
			[new Date(), false],
			[() => 12, false],
			[{ length: 13 }, false],
		],
	});
});
