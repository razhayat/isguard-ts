import { describe } from "vitest";
import { isDate, isInstanceof } from "../src";
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
			[-56, false]
		],
	});
});
