import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isIntersection, isNumber, isType, isString } from "../src";

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
			[[12, "a"], false],
			[["a", 12], false],
			[{ a: 12 }, false],
			[{ b: "asdf" }, false],
			[{ a: 12, b: "asdf" }, true],
			[{ b: "asdf", a: 12 }, true],
			[{ a: 56, b: "Empire!", c: true }, true],
			[{ a: 56, b: "Empire!", [Symbol()]: "no" }, true],
			[{ b: 62, a: "Empire!" }, false],
			[NaN, false],
			[(value: string) => value, false],
			[{ ab: 12, ba: "2324" }, false],
			[{}, false],
			[[], false],
			[true, false],
		],
	});
});
