import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBoolean, isFunction, isNumber, isString, isSymbol } from "../src";

describe("is number", () => {
	describedGuardTests({
		guard: isNumber,
		testCases: [
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
