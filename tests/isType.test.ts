import { describe } from "vitest";
import { isDate, isMaybe, isNumber, isType, isString, isValueUnion } from "../src";
import { describedGuardTests } from "./utils";

describe("is empty type", () => {
	describedGuardTests({
		guard: isType({}),
		testCases: [
			[null, false],
			[undefined, false],
			[12, true],
			["vsfbsdf", true],
			[{}, true],
			[[], true],
			[new Map(), true],
			[{ hello: "yes" }, true],
		],
	});
});

describe("is simple type", () => {
	type Simple = {
		name: string;
		age: number;
	};

	class SimpleClass implements Simple {
		public constructor(public name: string, public age: number) {

		}
	}

	describedGuardTests({
		guard: isType<Simple>({
			name: isString,
			age: isNumber,
		}),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			["6", false],
			[[], false],
			[{}, false],
			[new Set(), false],
			[NaN, false],
			[{ name2: "b", age: 14 }, false],
			[{ name: 12, age: 15 }, false],
			[{ name: new Date(), age: "3223" }, false],
			[{ name: "bla", age: 12 }, true],
			[{ name: "b", age: 13, name2: "fkmf" }, true],
			[new SimpleClass("blue", 16), true],
		],
	});
});

describe("is tree type", () => {
	type Tree = {
		value: number;
		left: Tree | null;
		right: Tree | null;
	};

	describedGuardTests({
		guard: isType<Tree>(isTree => ({
			value: isNumber,
			left: isMaybe(isTree),
			right: isMaybe(isTree),
		})),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			["6", false],
			[[], false],
			[{}, false],
			[0, false],
			[new Map(), false],
			[NaN, false],
			[{ value: 6, left: null, right: null }, true],
			[{ value: 6, right: null }, false],
			[{ value: "Hello, world!", left: null, right: null }, false],
			[{ value: 12, left: { value: 13, left: null, right: null }, right: null }, true],
			[{ value: 12, left: { value: 13, left: null, right: null }, right: { value: "Bye, world!", left: null, right: null } }, false],
			[{ value: 6, left: null, right: null, another: null }, true],
		],
	});
});

describe("is person interface", () => {
	interface Person {
		name: string;
		height: number;
		birthday: Date;
		deathday: Date | null;
		sex: "M" | "F";
	}

	describedGuardTests({
		guard: isType<Person>({
			name: isString,
			height: isNumber,
			birthday: isDate,
			deathday: isMaybe(isDate),
			sex: isValueUnion("M", "F"),
		}),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			["", false],
			[0, false],
			[new Date(), false],
			[{}, false],
			[[], false],
			[new Set(), false],
			[{ name: "", height: 6, birthday: new Date(), sex: "F" }, false],
			[{ name: "", height: 6, birthday: new Date(), deathday: null, sex: "F" }, true],
			[{ name: "", height: 6, birthday: new Date(), deathDay: null, sex: "F" }, false],
			[{ name: "", height: 6, birthday: new Date(), deathday: null, sex: "F", another: "no" }, true],
			[{ name: "", height: 6, birthday: new Date(), deathday: new Date(), sex: "O" }, false],
			[{ name: NaN, height: 6, birthday: new Date(), deathday: new Date(), sex: "M" }, false],
		],
	});
});

describe("is tuple like type", () => {
	type TupleLike = {
		0: string,
		1: number;
	};

	describedGuardTests({
		guard: isType<TupleLike>({
			"0": isString,
			"1": isNumber,
		}),
		testCases: [
			[{ 0: "Hello", 1: 6 }, true],
			[["Hello", 6], true],
			[["Bye", 7, new Date()], true],
			[{ 0: new Date(), 1: 6 }, false],
			[{ 0: "Hello", 1: 6, age: 56 }, true],
		],
	});
});

describe("is tuple type", () => {
	type Tuple = readonly [string, number];

	describedGuardTests({
		guard: isType<Tuple>([isString, isNumber]),
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{ 0: "Hello", 1: 6 }, true],
			[["Hello", 6], true],
			[["Bye", 7, new Date()], true],
			[{ 0: new Date(), 1: 6 }, false],
			[{ 0: "Hello", 1: 6, age: 56 }, true],
		],
	});
});

describe("is type with symbol", () => {
	const hello = Symbol("hello");

	type WithSymbol = {
		name: string;
		[hello]: number;
	};

	describedGuardTests({
		guard: isType<WithSymbol>({
			name: isString,
			[hello]: isNumber,
		}),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[true, false],
			["string", false],
			[new Set(), false],
			[() => "bye", false],
			[[], false],
			[[hello, "hi"], false],
			[[hello], false],
			[{}, false],
			[{ name: 14, [hello]: "not a number" }, false],
			[{ name: "name", [hello]: 12 }, true],
			[{ a: "G", name: "2", [hello]: 90 }, true],
		],
	});
});
