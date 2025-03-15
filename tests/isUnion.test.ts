import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isBoolean, isDate, isNumber, isString, isType, isUnion } from "../src";

describe("is empty union (never)", () => {
	describedGuardTests({
		guard: isUnion(),
		testCases: [
			[null, false],
			[undefined, false],
			[34363, false],
			[412424n, false],
			[-253.5332, false],
			[true, false],
			[false, false],
			[() => {}, false],
			[function() {}, false],
			[new Date(), false],
			[Array, false],
			["hello", false],
			[[], false],
			[{}, false],
		],
	});
});

describe("is Date | number | string | boolean", () => {
	describedGuardTests({
		guard: isUnion(isDate, isNumber, isString, isBoolean),
		testCases: [
			[new Date(), true],
			[0, true],
			[348975034, true],
			[-6.66, true],
			[NaN, true],
			[Infinity, true],
			[-Infinity, true],
			["", true],
			["Empire?", true],
			[false, true],
			[true, true],
			[[new Date(), true, 0, ""], false],
			[Symbol(), false],
			[/[123]/, false],
			[null, false],
			[undefined, false],
			[(value: number) => value + 6, false],
		],
	});
});

describe("is { a: number; } | { b: string; }", () => {
	type A = { a: number; };
	const isA = isType<A>({ a: isNumber });

	type B = { b: string; };
	const isB = isType<B>({ b: isString });

	describedGuardTests({
		guard: isUnion(isA, isB),
		testCases: [
			[null, false],
			[undefined, false],
			[-1, false],
			[0n, false],
			[0.001, false],
			["string", false],
			[true, false],
			[false, false],
			[[], false],
			[{}, false],
			[new Date(), false],
			[() => {}, false],
			[Symbol(), false],
			[{ c: "extra" }, false],

			[{ a: true }, false],
			[{ a: undefined, b: [] }, false],
			[{ b() {} }, false],
			[{ b: null, a: "not a number" }, false],

			[{ a: NaN }, true],
			[{ a: 3.14 }, true],
			[{ b: "" }, true],
			[{ b: "foo" }, true],

			[{ a: 0, b: "hello" }, true],
			[{ b: "goodbye", a: 100 }, true],
			[{ a: 0, b: () => {} }, true],
			[{ b: "goodbye", a: [] }, true],

			[{ a: 12, extra: "property" }, true],
			[{ b: "hello", extra: Symbol() }, true],
			[{ a: 12, b: "hello", extra: false }, true],
			[{ a: 0, b: new Date(), extra: {} }, true],
			[{ b: "goodbye", a: new Error(), extra() {} }, true],
		],
	});
});
