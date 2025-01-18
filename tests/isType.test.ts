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
			[12n, true],
			[true, true],
			[false, true],
			[Symbol(), true],
			["vsfbsdf", true],
			[{}, true],
			[[], true],
			[[12, () => {}, "string"], true],
			[new Map(), true],
			[new String(), true],
			[function() {}, true],
			[() => {}, true],
			[/[436rbf]/, true],
			[{ 56: "no" }, true],
			[{ hello: "yes" }, true],
			[{ [Symbol()]: "is symbol going to work?" }, true],
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
			[56n, false],
			[false, false],
			["6", false],
			[[], false],
			[{}, false],
			[() => false, false],
			[new Set(), false],
			[NaN, false],
			[{ [Symbol("name")]: "name", [Symbol("age")]: 12 }, false],
			[{ Name: "bla", age: 12 }, false],
			[{ NAME: "bla", AGE: 12 }, false],
			[{ namE: "bla", agE: 12 }, false],
			[{ name2: "b", age: 14 }, false],
			[{ name: 12, age: 15 }, false],
			[{ name: new Date(), age: "3223" }, false],
			[{ name: "bla", age: 12 }, true],
			[{ name: "b", age: 13, name2: "fkmf" }, true],
			[{ name: "bla", age: 12, [Symbol()]: true }, true],
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
			[12n, false],
			[true, false],
			[/[3-8]/, false],
			["6", false],
			[[], false],
			[{}, false],
			[0, false],
			[async function* () {}, false],
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
			[0n, false],
			[Symbol(), false],
			[new Date(), false],
			[async () => {}, false],
			[{}, false],
			[[], false],
			[new Set(), false],
			[Object, false],
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
			[null, false],
			[undefined, false],
			[7654, false],
			[53n, false],
			[true, false],
			["hello", false],
			[Symbol(), false],
			[/2342/g, false],
			[() => {}, false],
			[[], false],
			[{}, false],
			[new Set(), false],
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
			[-53, false],
			[43n, false],
			[true, false],
			["424", false],
			[function() {}, false],
			[new Map(), false],
			[Symbol(), false],
			[/[0-5]/, false],
			[[], false],
			[{}, false],
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
			[Symbol.for("blue"), false],
			[/[57]/, false],
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

describe("is type with all PropertyKey types", () => {
	const symbol = Symbol();

	type All = {
		str: number;
		61: number;
		[symbol]: number;
	};

	describedGuardTests({
		guard: isType<All>({
			str: isNumber,
			61: isNumber,
			[symbol]: isNumber,
		}),
		testCases: [
			[null, false],
			[undefined, false],
			[true, false],
			[false, false],
			["{ str: 12, 61: 12, [symbol]: 12 }", false],
			[-0, false],
			[new Function(), false],
			[() => {}, false],
			[[], false],
			[{}, false],
			[["str", 61, symbol], false],
			[Array, false],
			[Symbol("string"), false],
			[/[abcd]/, false],
			[32n, false],
			[async () => {}, false],

			[{ [symbol]: "this is not a number" }, false],
			[{ [symbol]: 12 }, false],

			[{ str: new Date() }, false],
			[{ str: 12 }, false],

			[{ 61: () => {} }, false],
			[{ 61: 12 }, false],

			[{ 61() {}, [symbol]: new Map() }, false],
			[{ [symbol]: [], 61: 2439 }, false],
			[{ [symbol]: 783, 61: {} }, false],
			[{ 61: 734, [symbol]: 18327 }, false],

			[{ [symbol]: true, 61: false }, false],
			[{ str: 0.35, [symbol]() {} }, false],
			[{ str: "bla", [symbol]: 783 }, false],
			[{ [symbol]: 18327, str: -7216 }, false],

			[{ str: "", 61: null }, false],
			[{ str: 0.35, 61: Array }, false],
			[{ 61: new Set, str: 783 }, false],
			[{ 61: 18327.4, str: -7216.3 }, false],

			[{ str: [], 61: () => {}, [symbol]: undefined }, false],
			[{ [symbol]: 6.6, str: null, 61: true }, false],
			[{ 61: NaN, [symbol]: Symbol(), str: false }, false],
			[{ str: Infinity, [symbol]: 534n, 61: "" }, false],
			[{  61: 53, str: {}, [symbol]: 12 }, false],
			[{ 61: () => {}, str: 3213, [symbol]: 5372 }, false],
			[{ str: 23948, [symbol]: null, 61: 2421 }, false],
			[{ str: 364634, 61: 24523, [symbol]: 2938523 }, true],

			[{ str: 364634, 61: 24523, [symbol]: 2938523, anotherStr: 311 }, true],
			[{ str: 364634, 61: 24523, [symbol]: 2938523, anotherStr: "not a number" }, true],
			[{ str: 364634, 61: 24523, [symbol]: 2938523, 46: 325832 }, true],
			[{ str: 364634, 61: 24523, [symbol]: 2938523, 46: new Date }, true],
			[{ str: 364634, 61: 24523, [symbol]: 2938523, [Symbol()]: 239483 }, true],
			[{ str: 364634, 61: 24523, [symbol]: 2938523, [Symbol()]: () => {} }, true],
		],
	});
});
