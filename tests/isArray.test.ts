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
			[1, false],
			[new Date(), false],
			[() => 12, false],
			[{ length: 13 }, false],
			[{ length: 2, 0: 1, 1: 2 }, false],
			[new Set<number>([1, 2, 3]), false],
			[new Set<number>(), false],
			[new Map([[1, 2], [2, 3]]), false],

			[["1", 2, 3], false],
			[["hello", "bye"], false],
			[[1, "2", 3], false],
			[["1", 2, 3], false],
			[["0", "1", "2"], false],
			[["6", 7, "8"], false],
			[[1, {}, 3], false],
			[[undefined, 2, 3], false],
			[[[1, 2], [3, 4]], false],

			[[1, "2", true], false],
			[[1, 2, { foo: "bar" }], false],
			[[1, 2, []], false],
			[[1, 2, undefined], false],
			[[1, 2, null], false],
			[[1, 2, /regex/], false],
			[[0, false, 0], false],

			[Array<number | string>(20, 50, "string"), false],
			[Array<string>("string"), false],
			[new Array<number | string>(20, 50, "string"), false],
			[new Array<string>("string"), false],

			[[], true],
			[[6, -6, 6.66], true],
			[[1, NaN, 3], true],
			[[-1, 0, 1], true],
			[[-0.1, 2.5, 7.9], true],
			[[-1000000, 5000000, 0], true],
			[[654, Number(234), -54], true],

			[new Array, true],
			[new Array(35), true],
			[new Array(20, 60), true],
			[Array(), true],
			[Array(90), true],
			[Array(20, 50), true],

			[Array.from([1, 2, 3]), true],
			[Array.of(1, 2, 3), true],
			[Array(5).fill(2), true],
			[Array(3).fill(Number(2)), true],
		],
	});
});
