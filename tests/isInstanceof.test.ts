import { describe } from "vitest";
import { isDate, isError, isEvalError, isInstanceof, isRangeError } from "../src";
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
