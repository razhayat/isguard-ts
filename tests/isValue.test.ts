import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isFalse, isNil, isNull, isTrue, isUndefined, isValue, isValueUnion } from "../src";

describe("is null", () => {
	describedGuardTests({
		guard: isNull,
		testCases: [
			[null, true],
			[undefined, false],
			[NaN, false],
			[6, false],
			[6n, false],
			["6", false],
			[false, false],
			[Symbol(), false],
			[new Date(), false],
			[() => {}, false],
			[/[]/, false],
			[[], false],
			[{}, false],
		],
	});
});

describe("is undefined", () => {
	describedGuardTests({
		guard: isUndefined,
		testCases: [
			[null, false],
			[undefined, true],
			[423n, false],
			[true, false],
			["hello", false],
			[new Map(), false],
			[Symbol("undefined"), false],
			[async function() {}, false],
			[[], false],
			[{}, false],
			[["Empire"], false],
		],
	});
});

describe("is nil", () => {
	describedGuardTests({
		guard: isNil,
		testCases: [
			[null, true],
			[undefined, true],
			[56, false],
			[-34n, false],
			["null", false],
			["", false],
			[NaN, false],
			[true, false],
			[new Set(), false],
			[RegExp, false],
			[[], false],
			[{}, false],
			[{ maybe: 61 }, false],
		],
	});
});

describe("is true", () => {
	describedGuardTests({
		guard: isTrue,
		testCases: [
			[null, false],
			[undefined, false],
			[56, false],
			[{ maybe: 61 }, false],
			[new Date(), false],
			["true", false],
			["True", false],
			[new Boolean(true), false],
			[false, false],
			[async () => {}, false],
			[Symbol.for("true"), false],
			[[], false],
			[{}, false],
			[true, true],
		],
	});
});

describe("is false", () => {
	describedGuardTests({
		guard: isFalse,
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[0, false],
			["false", false],
			["False", false],
			[new Boolean(false), false],
			[new Boolean(true), false],
			[[], false],
			[{}, false],
			[function() {}, false],
			[[false], false],
			[true, false],
			[false, true],
		],
	});
});

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
			["empire", false],
			["EMPIRE", false],
			["EmPiRE", false],
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
	const empty = [];
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
