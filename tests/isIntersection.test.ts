import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isIntersection, isNumber, isType, isString } from "../src";

describe("is empty intersection (unknown)", () => {
	describedGuardTests({
		guard: isIntersection(),
		testCases: [
			[null, true],
			[undefined, true],
			[34363, true],
			[412424n, true],
			[-253.5332, true],
			[true, true],
			[false, true],
			[() => {}, true],
			[function() {}, true],
			[new Date(), true],
			[Array, true],
			["hello", true],
			[[], true],
			[{}, true],
		],
	});
});

describe("is number & string", () => {
	describedGuardTests({
		guard: isIntersection(isNumber, isString),
		testCases: [
			[6, false],
			["Hello", false],
			[false, false],
			[(values: number[]) => values.forEach(console.log), false],
			[null, false],
			[undefined, false],
			[new Set(), false],
			[[6, "12"], false],
			["12", false],
			[Infinity, false],
		],
	});
});

describe("is { a: number } & { b: string }", () => {
	type A = { a: number; };
	const isA = isType<A>({ a: isNumber });

	type B = { b: string };
	const isB = isType<B>({ b: isString });

	describedGuardTests({
		guard: isIntersection(isA, isB),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[{}, false],
			[[], false],
			[true, false],
			[(value: string) => value, false],
			[[12, "a"], false],
			[["a", 12], false],
			[{ a: 12 }, false],
			[{ b: "asdf" }, false],
			[{ b: 62, a: "Empire!" }, false],
			[{ ab: 12, ba: "2324" }, false],
			[{ a: 12, b: "asdf" }, true],
			[{ b: "asdf", a: 12 }, true],
			[{ a: 56, b: "Empire!", c: true }, true],
			[{ a: 56, b: "Empire!", [Symbol()]: "no" }, true],
		],
	});
});
