import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isNil, isNull, isTrue, isUndefined, isValue } from "../src";

describe("is null", () => {
	describedGuardTests({
		guard: isNull,
		testCases: [
			[null, true],
			[undefined, false],
			[6, false],
			["6", false],
		],
	});
});

describe("is undefined", () => {
	describedGuardTests({
		guard: isUndefined,
		testCases: [
			[null, false],
			[undefined, true],
			[true, false],
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
			[true, true],
		],
	});
});

describe("is value (56)", () => {
	describedGuardTests({
		guard: isValue(56),
		testCases: [
			[56, true],
			[57, false],
			["Empire", false],
			[[], false],
		],
	});
});

describe("is value ('Empire!')", () => {
	describedGuardTests({
		guard: isValue("Empire!"),
		testCases: [
			[56, false],
			[57, false],
			["Empire!", true],
			["Empire", false],
		],
	});
});
