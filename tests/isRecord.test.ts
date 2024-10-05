import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBoolean, isIndexRecord, isNumber, isRecord } from "../src";

describe("is record", () => {
	describedGuardTests({
		guard:isRecord(["num1", "num2", "num3"], isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[[1, 2, 3], false],
			[new Map(), false],
			[() => {}, false],
			[{}, false],
			["bla bla", false],
			[{ num2: 12, num3: 56 }, false],
			[{ num1: "123", num2: 12, num3: 56 }, false],
			[{ num1: "123", num2: true, num3: null }, false],
			[{ num1: 123, num2: 34, num3: 56 }, true],
			[{ num1: 123, num2: 34, num3: 56, num4: 56 }, true],
		],
	});
});

describe("tuple like is record", () => {
	describedGuardTests({
		guard: isRecord([0, 1, 2], isBoolean),
		testCases: [
			[null, false],
			[undefined, false],
			[754, false],
			[new Set(), false],
			[{}, false],
			[{ age: 56, name: "Hello" }, false],
			["bla blue bli", false],
			[() => {}, false],
			[[true, true], false],
			[[true, true, false], true],
			[[true, false, false, 23], true],
			[{ 0: false, 1: true, 2: false }, true],
		],
	});
});

describe("special is record", () => {
	describedGuardTests({
		guard: isRecord(["length"], isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[new Date(), false],
			[{}, false],
			[{ array: [1, 2, 3] }, false],
			["bla bla", true],
			[[1, 2, 3], true],
			[[], true],
			[() => {}, true],
		],
	});
});

describe("is indexRecord", () => {
	describedGuardTests({
		guard: isIndexRecord(isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[21, false],
			["4", false],
			[new Date(), false],
			[{ hello: "bye" }, false],
			[{ hi: 12, bye: 6, blue: "kvdkdm" }, false],
			[[], false],
			[{}, true],
			[{ hi: 12 }, true],
			[{ hi: 12, bye: 6 }, true],
			[{ [Symbol()]: 45 }, true],
		],
	});
});
