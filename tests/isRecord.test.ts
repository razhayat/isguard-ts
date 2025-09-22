import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBoolean, isIndexRecord, isLiteral, isNumber, isPartialRecord, isRecord, isString } from "../src";

describe("is record", () => {
	describedGuardTests({
		guard: isRecord(["num1", "num2", "num3"], isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[21n, false],
			[true, false],
			[Symbol(), false],
			[[1, 2, 3], false],
			[new Map(), false],
			[new Map([["num1", 1], ["num2", 2], ["num3", 3]]), false],
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

describe("is Record<'a' | 'b', 'c', 'd'> record", () => {
	describedGuardTests({
		guard: isRecord(["a", "b"], isLiteral("c", "d")),
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			[new Set(), false],
			[async () => await Promise.resolve("c"), false],
			[new Object, false],
			[{ a: "c" }, false],
			[{ a: "d", b: "invalid value" }, false],
			[{ a: "invalid", b: "another invalid" }, false],
			[{ a: "c", b: "d", another: "kvdkdm" }, true],
			[{ a: "c", b: "d" }, true],
			[{ a: "d", b: "c" }, true],
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
			[Symbol.for("special"), false],
			[{}, false],
			[{ array: [1, 2, 3] }, false],
			["bla bla", true],
			[[1, 2, 3], true],
			[[], true],
			[() => {}, true],
		],
	});
});

describe("is record with symbol keys", () => {
	const s1 = Symbol();
	const s2 = Symbol();

	describedGuardTests({
		guard: isRecord([s1, s2], isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[false, false],
			["true", false],
			[0, false],
			[56n, false],
			[new Map(), false],
			[function() {}, false],
			[[], false],
			[{}, false],
			[s1, false],
			[s2, false],
			[[s1, s2], false],
			[{ [s1]: 12 }, false],
			[{ [s2]: 13 }, false],
			[{ [s1]: "12", [s2]: 13 }, false],
			[{ [s1]: 12, [s2]: "13" }, false],
			[{ [s1]: 12, [s2]: 13 }, true],
			[{ [s1]: 358, [s2]: 5237, [Symbol()]: "not a number" }, true],
		],
	});
});

describe("is partial record", () => {
	describedGuardTests({
		guard: isPartialRecord(["firstName", "secondName"], isString),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, true],
			[true, true],
			[new Date(), true],
			["hello", true],
			[["firstName", "secondName"], true],
			[() => { }, true],
			[{ firstName: "hello" }, true],
			[{ secondName: 12 }, false],
			[{ firstName: "hello", secondName: 12 }, false],
			[{ firstName: "hello", secondName: "bye" }, true],
			[{ firstName: "hello", secondName: "bye", another: "one" }, true],
			[{ firstName: "hello", secondName: "bye", another: 45 }, true],
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
			[23n, false],
			["4", false],
			[new Date(), false],
			[{ hello: "bye" }, false],
			[{ hi: 12, bye: 6, blue: "kvdkdm" }, false],
			[[], false],
			[{ [Symbol()]: "45" }, false],
			[{}, true],
			[{ hi: 12 }, true],
			[{ hi: 12, bye: 6 }, true],
			[{ [Symbol()]: 45 }, true],
		],
	});
});
