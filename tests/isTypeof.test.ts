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
			[6.0, true],
			[6.25, true],
			[-6.25, true],
			[NaN, true],
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
			[Symbol(), false],
			[/[a-g]/u, false],
			[new String("Hello"), false],
			[async function() { return "string" }, false],
			[[], false],
			[["hi"], false],
			[{}, false],
			[{ name: "john" }, false],
			["", true],
			["56 Empire!", true],
			["6", true],
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
