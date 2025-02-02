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
			[["1", 2, 3], false],
			[1, false],
			[["hello", "bye"], false],
			[new Date(), false],
			[() => 12, false],
			[{ length: 13 }, false],
			[{ length: 2, 0: 1, 1: 2 }, false],
			[new Set<number>([1, 2, 3]), false],
			[new Set<number>(), false],
			[new Map([[1, 2], [2, 3]]), false],
			[[[1, 2], [3, 4]], false],
			[[], true],
			[new Array(35), true],
			[new Array, true],
			[Array(90), true],
			[[6, -6, 6.66], true],
		],
	});
});
