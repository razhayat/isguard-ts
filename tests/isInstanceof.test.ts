import { describe } from "vitest";
import { isDate, isError, isEvalError, isInstanceof, isRangeError, isReferenceError, isRegExp, isSyntaxError, isTypeError, isURIError } from "../src";
import { describedGuardTests } from "./utils";

class Animal { }
class Dog extends Animal { }
class Cat extends Animal { }

describe("is animal", () => {
	describedGuardTests({
		guard: isInstanceof(Animal),
		testCases: [
			[new Animal(), true],
			[new Dog(), true],
			[new Cat(), true],
			[{}, false],
			[undefined, false],
		],
	});
});

describe("is dog", () => {
	describedGuardTests({
		guard: isInstanceof(Dog),
		testCases: [
			[new Animal(), false],
			[new Dog(), true],
			[new Cat(), false],
			[[], false],
			[null, false],
		],
	});
});

describe("is cat", () => {
	describedGuardTests({
		guard: isInstanceof(Cat),
		testCases: [
			[new Animal(), false],
			[new Dog(), false],
			[new Cat(), true],
			[new Date(666), false],
			[NaN, false],
		],
	});
});

describe("is date", () => {
	describedGuardTests({
		guard: isDate,
		testCases: [
			[new Animal(), false],
			["06/07/2024", false],
			["25/12/2023🥹", false],
			[[new Date()], false],
			[new Date(666), true],
			[-56, false],
		],
	});
});

describe("is regexp", () => {
	describedGuardTests({
		guard: isRegExp,
		testCases: [
			[null, false],
			[undefined, false],
			[new Map(), false],
			["hello", false],
			[12, false],
			[56n, false],
			[false, false],
			[Symbol(), false],
			[RegExp, false],
			[[], false],
			[[/0/], false],
			[{}, false],
			[function () {}, false],
			[function* () {}, false],
			[async () => {}, false],
			[/[0-9]/, true],
			[/[+-124]{2,67}/, true],
			[new RegExp("[0123456789]"), true],
			[new RegExp(/[0123456789]/), true],
			[RegExp("[a-zA-Z0-6]+", "g"), true],
			[RegExp(/[a-zA-Z0-6]+/g), true],
		],
	});
});

describe("is error", () => {
	describedGuardTests({
		guard: isError,
		testCases: [
			[null, false],
			[undefined, false],
			[new Animal(), false],
			["27/07/2024😃", false],
			[[new Date()], false],
			[-56, false],
			[new Error(), true],
			[new EvalError(), true],
			[new RangeError(), true],
			[new ReferenceError(), true],
			[new SyntaxError(), true],
			[new TypeError(), true],
			[new URIError(), true],
		],
	});
});

describe("is eval error", () => {
	describedGuardTests({
		guard: isEvalError,
		testCases: [
			[null, false],
			[undefined, false],
			[new Cat(), false],
			[[new EvalError()], false],
			[[new Set()], false],
			[{ error: new SyntaxError() }, false],
			[new Error(), false],
			[new RangeError(), false],
			[new ReferenceError(), false],
			[new SyntaxError(), false],
			[new TypeError(), false],
			[new URIError(), false],
			[new EvalError(), true],
		],
	});
});

describe("is range error", () => {
	describedGuardTests({
		guard: isRangeError,
		testCases: [
			[null, false],
			[undefined, false],
			[new Dog(), false],
			[NaN, false],
			[[new Map()], false],
			[{ message: "hello", options: {} }, false],
			[new Error(), false],
			[new ReferenceError(), false],
			[new SyntaxError(), false],
			[new TypeError(), false],
			[new URIError(), false],
			[new EvalError(), false],
			[new RangeError(), true],
		],
	});
});

describe("is reference error", () => {
	describedGuardTests({
		guard: isReferenceError,
		testCases: [
			[null, false],
			[undefined, false],
			[0, false],
			[[new String()], false],
			[{ message: "hello", options: {} }, false],
			[new Error(), false],
			[new SyntaxError(), false],
			[new TypeError(), false],
			[new URIError(), false],
			[new EvalError(), false],
			[new RangeError(), false],
			[new ReferenceError(), true],
		],
	});
});

describe("is syntax error", () => {
	describedGuardTests({
		guard: isSyntaxError,
		testCases: [
			[null, false],
			[undefined, false],
			[true, false],
			[Symbol(), false],
			[() => 12, false],
			[new Error(), false],
			[new TypeError(), false],
			[new URIError(), false],
			[new EvalError(), false],
			[new RangeError(), false],
			[new ReferenceError(), false],
			[new SyntaxError(), true],
		],
	});
});

describe("is type error", () => {
	describedGuardTests({
		guard: isTypeError,
		testCases: [
			[null, false],
			[undefined, false],
			[false, false],
			[new Number(), false],
			[() => new TypeError(), false],
			[new Error(), false],
			[new URIError(), false],
			[new EvalError(), false],
			[new RangeError(), false],
			[new ReferenceError(), false],
			[new SyntaxError(), false],
			[new TypeError(), true],
		],
	});
});

describe("is uri error", () => {
	describedGuardTests({
		guard: isURIError,
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[new WeakMap(), false],
			[() => () => new URIError(), false],
			[new Error(), false],
			[new EvalError(), false],
			[new RangeError(), false],
			[new ReferenceError(), false],
			[new SyntaxError(), false],
			[new TypeError(), false],
			[new URIError(), true],
		],
	});
});
