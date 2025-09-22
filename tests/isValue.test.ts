import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isValue, isValueUnion } from "../src";

describe("is value (56)", () => {
	describedGuardTests({
		guard: isValue(56),
		testCases: [
			[null, false],
			[undefined, false],
			[57, false],
			[-56, false],
			[56n, false],
			["Empire", false],
			["56", false],
			[true, false],
			[Symbol(56), false],
			[/56/, false],
			[Symbol.for("56"), false],
			[[], false],
			[{}, false],
			[() => 56, false],
			[56, true],
			[56.0, true],
		],
	});
});

describe("is value ('Empire!')", () => {
	describedGuardTests({
		guard: isValue("Empire!"),
		testCases: [
			[null, false],
			[undefined, false],
			[56, false],
			[57, false],
			[false, false],
			["Empire", false],
			["empire!", false],
			["EMPIRE!", false],
			["EmPiRE!", false],
			[new Date(), false],
			[[], false],
			[{}, false],
			[{ "Empire!": "Empire!" }, false],
			["Empire!", true],
			["Empire" + "!", true],
			[`${"Empire"}!`, true],
		],
	});
});

describe("is []", () => {
	const empty = [] as const;
	describedGuardTests({
		guard: isValue(empty),
		testCases: [
			[null, false],
			[undefined, false],
			[545, false],
			[43n, false],
			[true, false],
			["[]", false],
			[Symbol(), false],
			[/[]/, false],
			[() => empty, false],
			[[], false],
			[[empty], false],
			[{}, false],
			[empty, true],
		],
	});
});

describe("is 'apple' | 'orange' | 'banana' | 6", () => {
	describedGuardTests({
		guard: isValueUnion("apple", "orange", "banana", 6),
		testCases: [
			[null, false],
			[undefined, false],
			[6.001, false],
			[5.999, false],
			["apple", true],
			["orange", true],
			["banana", true],
			["mango", false],
			["apple ", false],
			["BANANA", false],
			[6, true],
			["6", false],
			[new Map(), false],
			[new Date(), false],
			[new Set(), false],
		],
	});
});
