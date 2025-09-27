import { describe } from "vitest";
import { isArray, isNumber, isString, isType } from "../src";
import { describedGuardTests } from "./utils";

describe("is number array", () => {
	describedGuardTests({
		guard: isArray(isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[{}, false],
			[1, false],
			[new Date(), false],
			[() => 12, false],
			[{ length: 13 }, false],
			[{ length: 2, 0: 1, 1: 2 }, false],
			[new Set<number>([1, 2, 3]), false],
			[new Set<number>(), false],
			[new Map([[1, 2], [2, 3]]), false],

			[["1", 2, 3], false],
			[["hello", "bye"], false],
			[[1, "2", 3], false],
			[["1", 2, 3], false],
			[["0", "1", "2"], false],
			[["6", 7, "8"], false],
			[[1, {}, 3], false],
			[[undefined, 2, 3], false],
			[[[1, 2], [3, 4]], false],

			[[1, "2", true], false],
			[[1, 2, { foo: "bar" }], false],
			[[1, 2, []], false],
			[[1, 2, undefined], false],
			[[1, 2, null], false],
			[[1, 2, /regex/], false],
			[[0, false, 0], false],
			[[false, ,], false],
			[[, "end"], false],

			[Array<number | string>(20, 50, "string"), false],
			[Array<string>("string"), false],
			[new Array<number | string>(20, 50, "string"), false],
			[new Array<string>("string"), false],

			[[], true],
			[[6, -6, 6.66], true],
			[[1, NaN, 3], true],
			[[-1, 0, 1], true],
			[[-0.1, 2.5, 7.9], true],
			[[-1000000, 5000000, 0], true],
			[[654, Number(234), -54], true],

			[new Array, true],
			[new Array(35), true],
			[new Array(20, 60), true],
			[Array(), true],
			[Array(90), true],
			[Array(20, 50), true],

			[Array.from([1, 2, 3]), true],
			[Array.of(1, 2, 3), true],
			[Array(5).fill(2), true],
			[Array(3).fill(Number(2)), true],

			[[,], true],
			[[, 73], true],
			[[56, ,], true],
			[[6, , , 324, 34], true],
		],
	});
});

describe("is object array", () => {
	type Obj = {
		name: string;
	};

	describedGuardTests({
		guard: isArray(isType<Obj>({
			name: isString,
		})),
		testCases: [
			[null, false],
			[undefined, false],
			[Infinity, false],
			[123, false],
			[1123n, false],
			["string", false],
			[true, false],
			[Symbol("test"), false],
			[() => {}, false],
			[{}, false],
			[Promise.resolve(), false],
			[Set, false],
			[WeakMap, false],

			[[1, 2, 3], false],
			[["hello", "world"], false],
			[[true, false], false],
			[[null, undefined], false],
			[[Symbol("foo"), Symbol("bar")], false],
			[[BigInt(123), BigInt(456)], false],
			[[[1, 2], [3, 4]], false],
			[[Promise.resolve(), Promise.resolve()], false],

			[[{ a: "Alice" }, { b: "Bob" }], false],
			[[{ name: "Alice" }, { notName: "Bob" }], false],
			[[{ name: "Alice" }, { age: 25 }], false],

			[[{ name: "Alice" }, 123], false],
			[[{ name: "Bob" }, "string"], false],
			[[{ name: "Charlie" }, null], false],
			[[{ name: "Dave" }, true], false],
			[[{ name: "Eve" }, Symbol("symbol")], false],

			[[{ name: "Alice" }, { name: 123 }], false],
			[[{ name: "Alice" }, { name: { innerName: "Bob" } }], false],
			[[{ name: "Alice" }, { name: [1, 2, 3] }], false],
			[[{ name: "Alice" }, { name: new Date() }], false],
			[[{ name: null }, { name: "Alice" }], false],
			[[{ name: "Alice" }, { name: "Bob" }, { name: 123 }], false],
			[[{ name: "Alice" }, { name: Date }, { name: "Charlie" }], false],

			[[], true],
			[[{ name: "Alice" }], true],
			[[{ name: "Alice" }, { name: "Bob" }], true],
			[[{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }], true],
			[[{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }, { name: "David" }], true],

			[[{ name: "Alice" }, { name: "Bob", age: 30 }], true],
			[[{ name: "Alice", extra: "prop" }, { name: "Bob" }], true],
			[[{ name: "Bob" }, { name: "Charlie", value: "extra" }], true],

			[[() => {}, { name: "function has a name" }], true],
			[[() => {}, function() {}], true],
		],
	});
});
