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

describe("is { obj: { a: string } } & { obj: { b: number } }", () => {
	type A = {
		obj: {
			a: string;
		};
	};

	const isA = isType<A>({
		obj: isType<A["obj"]>({
			a: isString,
		}),
	});

	type B = {
		obj: {
			b: number;
		};
	};

	const isB = isType<B>({
		obj: isType<B["obj"]>({
			b: isNumber,
		}),
	});

	describedGuardTests({
		guard: isIntersection(isA, isB),
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			["{}", false],
			[true, false],
			[12, false],
			[12n, false],
			[new Date(), false],
			[() => {}, false],
			[Symbol(123), false],

			[{ obj: { a: "foo" } }, false],
			[{ obj: { a: "bar" } }, false],

			[{ obj: { b: 3.14 } }, false],
			[{ obj: { b: -100 } }, false],

			[{ obj: null }, false],
			[{ obj: undefined }, false],
			[{ obj: { a: "hello", b: undefined } }, false],
			[{ obj: { a: null, b: 12 } }, false],
			[{ obj: { a: [], b: 100 } }, false],
			[{ obj: { a: "hello", b: new Map() } }, false],

			[{ objj: { a: "string", b: 0 } }, false],
			[{ ob: { a: "string", b: 0 } }, false],
			[{ obj: { a: "string", bb: 0 } }, false],
			[{ obj: { aa: "string", b: 0 } }, false],

			[{ obj: { a: "foo", b: 3.14 } }, true],
			[{ obj: { a: "bar", b: -100 } }, true],
			[{ obj: { a: "example", b: 0 } }, true],

			[{ obj: { a: "world", b: 99 }, extra: "value" }, true],
			[{ obj: { a: "world", b: 99 }, extra: null }, true],
			[{ obj: { a: "world", b: 99 }, extra: new Date() }, true],
		],
	});
});
