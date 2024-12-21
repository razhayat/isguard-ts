import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBoolean, isDate, isNumber, isString, isUnion } from "../src";

describe("is empty union (never)", () => {
	describedGuardTests({
		guard: isUnion(),
		testCases: [
			[null, false],
			[undefined, false],
			[34363, false],
			[412424n, false],
			[-253.5332, false],
			[true, false],
			[false, false],
			[() => {}, false],
			[function() {}, false],
			[new Date(), false],
			[Array, false],
			["hello", false],
			[[], false],
			[{}, false],
		],
	});
});

describe("is Date | number | string | boolean", () => {
	describedGuardTests({
		guard: isUnion(isDate, isNumber, isString, isBoolean),
		testCases: [
			[new Date(), true],
			[0, true],
			[348975034, true],
			[-6.66, true],
			[NaN, true],
			[Infinity, true],
			[-Infinity, true],
			["", true],
			["Empire?", true],
			[false, true],
			[true, true],
			[[new Date(), true, 0, ""], false],
			[null, false],
			[undefined, false],
			[(value: number) => value + 6, false],
		],
	});
});
