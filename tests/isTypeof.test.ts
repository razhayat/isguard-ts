import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBigint, isBoolean, isFunction, isNumber, isString, isSymbol, isTypeof } from "../src";

describe("is number", () => {
	describedGuardTests({
		guard: isNumber,
		testCases: [
			[null, false],
			[undefined, false],
			["6", false],
			[123n, false],
			[true, false],
			[false, false],
			[Symbol(), false],
			[/[2-5]/, false],
			[new Number(12), false],
			[function() {}, false],
			[function* () {}, false],
			[async () => {}, false],
			[[], false],
			[[1], false],
			[{}, false],
			[{ 1: 2 }, false],
			[0, true],
			[-0, true],
			[6, true],
			[6.0, true],
			[6.00, true],
			[6.25, true],
			[-6, true],
			[-6.0, true],
			[-6.00, true],
			[-6.25, true],
			[NaN, true],
			[-NaN, true],
			[Infinity, true],
			[-Infinity, true],
			[Number('12'), true, "Number('12')"],
			[Number.MIN_VALUE, true],
			[Number.MAX_VALUE, true],
			[Number.MAX_SAFE_INTEGER, true],
			[Number.EPSILON, true],
		],
	});
});

describe("is bigint", () => {
	describedGuardTests({
		guard: isBigint,
		testCases: [
			[null, false],
			[undefined, false],
			[0, false],
			[2385035982, false],
			["6", false],
			[true, false],
			[false, false],
			[new Number(12), false],
			[Symbol(), false],
			[/123/g, false],
			[() => {}, false],
			[[], false],
			[[56n], false],
			[{}, false],
			[-0n, true],
			[0n, true],
			[-6n, true],
			[5n, true],
			[5354535142412132n, true],
			[-242341535453532n, true],
		],
	});
});

describe("is string", () => {
	describedGuardTests({
		guard: isString,
		testCases: [
			[null, false],
			[undefined, false],
			[0, false],
			[false, false],
			[true, false],
			[Symbol(), false],
			[/[a-g]/u, false],
			[new String("Hello"), false],
			[async function() { return "string" }, false],
			[[], false],
			[["hi"], false],
			[["h", "e", "l", "l", "o"], false],
			[{}, false],
			[{ name: "john" }, false],
			["", true],
			["56 Empire!", true],
			["6", true],
			['one', true],
			[`hello`, true],
			[`hi ${"me from the future"}`, true],
			[String("Hello"), true, "String('Hello')"],
		],
	});
});

describe("is boolean", () => {
	describedGuardTests({
		guard: isBoolean,
		testCases: [
			[null, false],
			[undefined, false],
			["56 Empire!", false],
			[234, false],
			[34n, false],
			[Symbol.for("boolean"), false],
			[/[+-235]?/, false],
			[Boolean, false],
			[[], false],
			[[true, false], false],
			[{}, false],
			[new Date(), false],
			[new Number(6), false],
			[new String("Hello"), false],
			[new Boolean(0), false],
			[true, true],
			[false, true],
			[Boolean("yes"), true, "Boolean('yes')"],
		],
	});
});

describe("is symbol", () => {
	describedGuardTests({
		guard: isSymbol,
		testCases: [
			[null, false],
			[undefined, false],
			[6, false],
			[0n, false],
			[false, false],
			["Bye", false],
			[new Date(), false],
			[Symbol, false],
			[[], false],
			[[Symbol()], false],
			[{}, false],
			[Symbol(), true],
			[Symbol(12), true],
			[Symbol("x"), true],
			[Symbol.for("me"), true],
		],
	});
});

describe("is typeof object", () => {
	describedGuardTests({
		guard: isTypeof("object"),
		testCases: [
			[null, true],
			[undefined, false],
			[Symbol(), false],
			[Symbol(12), false],
			[6, false],
			[false, false],
			["Bye", false],
			[() => {}, false],
			[function () {}, false],
			[new Date(), true],
			[/1267/, true],
			[[], true],
			[[1, null, 3], true],
			[{}, true],
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
			[472364234982364n, false],
			[true, false],
			[Symbol(), false],
			[/^[hello]{45,78}$/, false],
			[[], false],
			[{}, false],
			[(value: number) => value, true],
			[(...values: number[]) => values, true],
			[(a: number, b: number) => a + b, true],
			[(a: number, b?: number) => a + (b ?? 0), true],
			[() => () => false, true],
			[function () { return 6; }, true],
			[function* () { yield 6; }, true],
			[async function () {}, true],
			[async function* () {}, true],
			[async () => {}, true],
			[Array, true],
			[Array.prototype.find, true, "Array.prototype.find"],
		],
	});
});
