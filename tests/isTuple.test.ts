import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isTuple, isNumber, isOptionalNumber, isString, isType } from "../src";

describe("is empty tuple", () => {
	describedGuardTests({
		guard: isTuple<[]>([]),
		testCases: [
			[null, false],
			[undefined, false],
			[new Array(2), false],
			[56, false],
			[56n, false],
			[true, false],
			[Symbol(), false],
			["hello", false],
			[{}, false],
			[function() { return [] }, false],
			[[undefined], false],
			[[, undefined], false],
			[[,], false],

			[[], true],
			[new Array(), true],
			[Array(0), true],
			[Array.from({ length: 0 }), true],
		],
	});
});

describe("is normal tuple", () => {
	type Tuple = [string, number];

	describedGuardTests({
		guard: isTuple<Tuple>([isString, isNumber]),
		testCases: [
			[null, false],
			[undefined, false],
			[new Array(2), false],
			[56, false],
			[56n, false],
			[true, false],
			[Symbol(), false],
			["hello", false],
			["c2", false],
			[{}, false],
			[[], false],
			[function() { ["", 0] }, false],
			[{ 0: "hello", 1: 6 }, false],
			[["hello", 78, new Date()], false],
			[["bye"], false],
			[[12, "bye"], false],
			[["hello", 6], true],
			[["bye", 5], true],
		],
	});
});

describe("is tuple with optional", () => {
	type Tuple = [number, number?];

	describedGuardTests({
		guard: isTuple<Tuple>([isNumber, isOptionalNumber]),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[false, false],
			[[], false],
			[{}, false],
			[/[0-9]/, false],
			[() => [12, 23], false],
			[{ 0: 5, 1: 6 }, false],
			[[6, 78, new Date()], false],
			[[12, "bye"], false],
			[[5, 6, 7], false],
			[[5, 6], true],
			[[-235, 345.34], true],
			[[6], true],
			[[NaN], true],
			[[6, undefined], true],
			[[1, ,], true],
		],
	});
});

describe("is tuple of objects", () => {
	type Tuple = [{ a: string; }, { b: number; }];

	describedGuardTests({
		guard: isTuple<Tuple>([
			isType({ a: isString }),
			isType({ b: isNumber }),
		]),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[123, false],
			[1.23, false],
			[123n, false],
			["string", false],
			[true, false],
			[{}, false],
			[[], false],
			[Symbol(), false],
			[() => {}, false],
			[async () => {}, false],
			[Promise.resolve(), false],

			[["hello", 42], false],
			[[42, "world"], false],
			[["good", "bad"], false],
			[[true, 100], false],

			[[null, { b: 42 }], false],
			[[undefined, { b: 42 }], false],
			[[123, { b: 42 }], false],
			[[true, { b: 42 }], false],

			[[{ a: "❤️" }, Symbol()], false],
			[[{ a: "ok" }, BigInt(123)], false],
			[[{ a: "bye" }, () => {}], false],
			[[{ a: "nice" }, Promise.resolve()], false],

			[[{ b: "valid" }, { a: 4754 }], false],
			[[{ b: 123 }, { a: "string" }], false],
			[[{ c: "not acceptable" }, { a: "nicely done" }, { b: 438 }], false],
			[[{ c: "not acceptable" }, { b: 754 }, { a: "welcome" }], false],

			[[{ a: NaN }, { b: null }], false],
			[[{ a: "valid" }, { notB: 123 }], false],
			[[{ notA: "valid" }, { b: 123 }], false],
			[[{ notB: "valid" }, { notA: 123 }], false],

			[[{ a: "string" }, { b: NaN }, null], false],
			[[{ a: "" }, { b: 1000 }, undefined], false],
			[[{ a: "" }, { b: Infinity }, { c: new Date() }], false],

			[[{ a: "test" }, { b: -1000 }], true],
			[[{ a: "empty" }, { b: 0 }], true],
			[[{ a: "valid" }, { b: Number.MAX_SAFE_INTEGER }], true],
		],
	});
});
