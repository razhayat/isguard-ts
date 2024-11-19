import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBigint, isBoolean, isFunction, isNumber, isString, isSymbol, isTypeof } from "../src";

describe("is number", () => {
	describedGuardTests({
		guard: isNumber,
		testCases: [
			[null, false],
			[undefined, false],
			[0, true],
			[{}, false],
			[6, true],
			[true, false],
			["6", false],
			[new Number(12), false],
			[Number('12'), true, "Number('12')"],
		],
	});
});

describe("is bigint", () => {
	describedGuardTests({
		guard: isBigint,
		testCases: [
			[null, false],
			[undefined, false],
			[0n, true, "Bigint(0)"],
			[0, false],
			[{}, false],
			[-6n, true, "Bigint(-6)"],
			[2385035982, false],
			[true, false],
			["6", false],
			[new Number(12), false],
		],
	});
});

describe("is string", () => {
	describedGuardTests({
		guard: isString,
		testCases: [
			[0, false],
			[{}, false],
			[false, false],
			["56 Empire!", true],
			["6", true],
			[new String("Hello"), false],
			[String("Hello"), true, "String('Hello')"],
		],
	});
});

describe("is boolean", () => {
	describedGuardTests({
		guard: isBoolean,
		testCases: [
			[true, true],
			[false, true],
			["56 Empire!", false],
			[new Date(), false],
			[new Number(6), false],
			[new String("Hello"), false],
			[new Boolean(0), false],
			[Boolean("yes"), true, "Boolean('yes')"],
		],
	});
});

describe("is symbol", () => {
	describedGuardTests({
		guard: isSymbol,
		testCases: [
			[Symbol(), true],
			[Symbol(12), true],
			[Symbol("x"), true],
			[[Symbol()], false],
			[null, false],
			[undefined, false],
			[6, false],
			[false, false],
			["Bye", false],
			[new Date(), false],
		],
	});
});

describe("is typeof object", () => {
	describedGuardTests({
		guard: isTypeof("object"),
		testCases: [
			[Symbol(), false],
			[Symbol(12), false],
			[6, false],
			[false, false],
			["Bye", false],
			[() => {}, false],
			[function () {}, false],
			[undefined, false],
			[new Date(), true],
			[[1, null, 3], true],
			[{}, true],
			[null, true],
		],
	});
});

describe("is function", () => {
	describedGuardTests({
		guard: isFunction,
		testCases: [
			[null, false],
			[undefined, false],
			["() => { }", false],
			[6, false],
			[(value: number) => value, true],
			[(...values: number[]) => values, true],
			[(a: number, b: number) => a + b, true],
			[(a: number, b?: number) => a + (b ?? 0), true],
			[function () { return 6; }, true],
			[Array, true, "Array"],
			[Array.prototype.find, true, "Array.prototype.find"],
			[Array.prototype.length, false, "Array.prototype.length"],
		],
	});
});
