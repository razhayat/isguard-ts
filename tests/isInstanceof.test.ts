import { describe, expect, it } from "vitest";
import { isDate, isError, isEvalError, isInstanceof, isRangeError, isReferenceError, isRegExp, isSyntaxError, isTypeError, isURIError } from "../src";
import { describedGuardTests } from "./utils";

class Animal { }
class Dog extends Animal { woof: string = "woof" }
class Cat extends Animal { meow: string = "meow" }

describe("is instanceof", () => {
	it("should have .class that is equal to the given constructor", () => {
		const isAnimal = isInstanceof(Animal);

		expect(isAnimal.class).toBe(Animal);
	});
});

describe("is animal", () => {
	describedGuardTests({
		guard: isInstanceof(Animal),
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			["just a normal string... nothing to see here...", false],
			[new Map(), false],

			[[new Animal()], false],
			[() => new Animal(), false],
			[Animal, false],
			["new Animal()", false],
			[{ __proto__: Animal }, false],

			[{ __proto__: new Animal() }, true],
			[{ __proto__: Animal.prototype }, true],
			[new Animal, true],
			[new Animal(), true],
			[Object.create(Animal.prototype), true],
			[Object.setPrototypeOf(new Animal(), Dog.prototype), true],
			[Object.setPrototypeOf(new Animal(), Cat.prototype), true],

			[{ __proto__: new Dog }, true],
			[new Dog, true],
			[new Dog(), true],
			[Object.create(Dog.prototype), true],
			[Object.setPrototypeOf(new Dog(), Animal.prototype), true],
			[Object.setPrototypeOf(new Dog(), Cat.prototype), true],


			[{ __proto__: { __proto__: new Cat() } }, true],
			[new Cat, true],
			[new Cat(), true],
			[Object.create(Cat.prototype), true],
			[Object.setPrototypeOf(new Cat(), Animal.prototype), true],
			[Object.setPrototypeOf(new Cat(), Dog.prototype), true],

		],
	});
});

describe("is dog", () => {
	describedGuardTests({
		guard: isInstanceof(Dog),
		testCases: [
			[null, false],
			[undefined, false],
			[true, false],
			[12, false],
			[[], false],
			[{}, false],
			[new Set(), false],

			[async function() { return new Dog() }, false],
			[[new Dog()], false],
			[{ dog: new Dog() }, false],

			[new Animal, false],
			[new Animal(), false],
			[{ __proto__: new Animal() }, false],
			[Object.create(Animal.prototype), false],

			[new Cat, false],
			[new Cat(), false],
			[{ constructor: Dog }, false],
			[{ constructor: new Dog() }, false],
			[Object.create(Cat.prototype), false],

			[{ __proto__: new Dog() }, true],
			[new Dog, true],
			[new Dog(), true],
			[Object.create(Dog.prototype), true],

			[Object.setPrototypeOf(new Animal(), Dog.prototype), true],
			[Object.setPrototypeOf(new Dog(), Dog.prototype), true],
			[Object.setPrototypeOf(new Cat(), Dog.prototype), true],
			[Object.setPrototypeOf(new Date(), Dog.prototype), true],
			[Object.setPrototypeOf({}, Dog.prototype), true],
		],
	});
});

describe("is cat", () => {
	describedGuardTests({
		guard: isInstanceof(Cat),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[false, false],
			[[], false],
			[{}, false],
			[new Date(666), false],
			[12n, false],
			[/rrrrrr/, false],
			[Symbol(), false],

			[async () => new Cat(), false],
			[[new Cat()], false],
			[{ cat: new Cat() }, false],

			[new Animal, false],
			[new Animal(), false],
			[{ __proto__: Animal.prototype }, false],
			[Object.create(Animal.prototype), false],

			[new Dog, false],
			[new Dog(), false],
			[{ prototype: Cat }, false],
			[{ prototype: new Cat() }, false],
			[Object.create(Dog.prototype), false],

			[{ __proto__: { __proto__: Cat.prototype } }, true],
			[new Cat, true],
			[new Cat(), true],
			[Object.create(Cat.prototype), true],

			[Object.setPrototypeOf(new Animal(), Cat.prototype), true],
			[Object.setPrototypeOf(new Dog(), Cat.prototype), true],
			[Object.setPrototypeOf(new Cat(), Cat.prototype), true],
			[Object.setPrototypeOf(new Date(), Cat.prototype), true],
			[Object.setPrototypeOf({}, Cat.prototype), true],
		],
	});
});

describe("is date", () => {
	describedGuardTests({
		guard: isDate,
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[Infinity, false],
			[Symbol("date"), false],
			[{}, false],
			[[], false],
			[true, false],
			[false, false],
			[function* () { yield new Date() }, false],
			[new Animal(), false],
			["06/07/2024", false],
			["25/12/2023🥹", false],
			[[new Date()], false],
			[-56, false],

			[new Date, true],
			[new Date(), true],
			[new Date("2021-01-01"), true],
			[new Date(2022, 0, 1), true],
			[new Date(666), true],

			[new Date("2025-05-01T10:20:30Z"), true],
			[new Date("invalid-date-string"), true],
			[new Date(Infinity), true],

			[Object.create(Date.prototype), true],
			[Object.setPrototypeOf({}, Date.prototype), true],
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
