import { describe } from "vitest";
import { isNumber, isRefine, isString } from "../src";
import { describedGuardTests } from "./utils";

describe("is `Hello${string}`", () => {
	const startWithHello = (value: string): value is `Hello${string}` => {
		return value.startsWith("Hello");
	};

	describedGuardTests({
		guard: isRefine(isString, startWithHello),
		equivalentGuards: [isString.refine(startWithHello)],
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[{}, false],
			[[], false],
			[1, false],
			[false, false],
			[new Date(), false],
			[() => 12, false],
			[{ length: 13 }, false],
			[{ length: 5, 0: "H", 1: "e", 2: "l", 3: "l", 4: "o" }, false],
			[new Set([1, 2, 3]), false],
			[new Map([[1, 2], [2, 3]]), false],

			[["H", "e", "l", "l", "o"], false],
			["hello", false],
			["hHello", false],
			["now the Hello is in the middle", false],
			["the word is at the end Hello", false],

			["Hello", true],
			["Hello123", true],
			["HelloHello", true],
			["Hello my name is Dave", true],
		],
	});
});

declare const TAG: unique symbol;
describe("is positive number", () => {
	type PositiveNumber = number & {
		[TAG]: Record<"PositiveNumber", void>;
	};

	const isPositiveNumber = isRefine(isNumber, (value): value is PositiveNumber => {
		return value > 0;
	});

	describedGuardTests({
		guard: isPositiveNumber,
		testCases: [
			[null, false],
			[undefined, false],
			[1123n, false],
			["string", false],
			["6", false],
			[true, false],
			[Symbol("test"), false],
			[() => {}, false],
			[{}, false],
			[[], false],
			[Promise.resolve(), false],
			[Set, false],
			[new WeakMap(), false],

			[0, false],
			[-5, false],
			[-34.6224, false],
			[-0.3434, false],

			[0.00001, true],
			[6, true],
			[23325235, true],
			[353.5252, true],
		],
	});
});
