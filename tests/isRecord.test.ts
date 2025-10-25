import { describe, expect, it } from "vitest";
import { describedGuardTests } from "./utils";
import { isBoolean, isDate, isIndexRecord, isLiteral, isNumber, isPartialRecord, isRecord, isString, isType } from "../src";

describe("is record", () => {
	it("should have .keys that is equal to the given keys", () => {
		const keys = ["a", "b", "c"] as const;
		const is = isRecord(keys, isNumber);

		expect(is.keys).toBe(keys);
	});

	it("should have .isValue that is equal to the given guard", () => {
		const keys = ["a", "b", "c"] as const;
		const is = isRecord(keys, isNumber);

		expect(is.isValue).toBe(isNumber);
	});
});

describe("is number record", () => {
	type T = Record<"num1" | "num2" | "num3", number>;

	describedGuardTests<T>({
		guard: isRecord(["num1", "num2", "num3"], isNumber),
		equivalentGuards: [
			isType<T>({
				num1: isNumber,
				num2: isNumber,
				num3: isNumber,
			}),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[21n, false],
			[true, false],
			[Symbol(), false],
			[[1, 2, 3], false],
			[new Map(), false],
			[new Map([["num1", 1], ["num2", 2], ["num3", 3]]), false],
			[() => {}, false],
			[{}, false],
			["bla bla", false],
			[{ num2: 12, num3: 56 }, false],
			[{ num1: "123", num2: 12, num3: 56 }, false],
			[{ num1: "123", num2: true, num3: null }, false],
			[{ num1: 123, num2: 34, num3: 56 }, true],
			[{ num1: 123, num2: 34, num3: 56, num4: 56 }, true],
		],
	});
});

describe("is Record<'a' | 'b', 'c', 'd'> record", () => {

	const extraGuard = isRecord(["a", "b", "c"], isLiteral("c", "d"));
	const guard = isRecord(["a", "b"], isLiteral("c", "d"));

	describedGuardTests({
		guard: guard,
		equivalentGuards: [
			extraGuard.pick("a", "b", "a"),
			extraGuard.omit("c", "c"),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			[new Set(), false],
			[async () => await Promise.resolve("c"), false],
			[new Object, false],
			[{ a: "c" }, false],
			[{ a: "d", b: "invalid value" }, false],
			[{ a: "invalid", b: "another invalid" }, false],
			[{ a: "c", b: "d", another: "kvdkdm" }, true],
			[{ a: "c", b: "d" }, true],
			[{ a: "d", b: "c" }, true],
		],
	});
});

describe("tuple like is record", () => {
	describedGuardTests({
		guard: isRecord([0, 1, 2], isBoolean),
		testCases: [
			[null, false],
			[undefined, false],
			[754, false],
			[new Set(), false],
			[{}, false],
			[{ age: 56, name: "Hello" }, false],
			["bla blue bli", false],
			[() => {}, false],
			[[true, true], false],

			[[true, true, false], true, { invertZod: true }],
			[[true, false, false, 23], true, { invertZod: true }],

			[{ 0: false, 1: true, 2: false }, true],
		],
	});
});

describe("special is record", () => {
	describedGuardTests({
		guard: isRecord(["length"], isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[new Date(), false],
			[Symbol.for("special"), false],
			[{}, false],
			[{ array: [1, 2, 3] }, false],

			["bla bla", true, { invertZod: true }],
			[[1, 2, 3], true, { invertZod: true }],
			[[], true, { invertZod: true }],
			[() => {}, true, { invertZod: true }],

			[{ length: 0 }, true],
		],
	});
});

describe("is record with symbol keys", () => {
	const s1 = Symbol();
	const s2 = Symbol();

	describedGuardTests({
		guard: isRecord([s1, s2], isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[false, false],
			["true", false],
			[0, false],
			[56n, false],
			[new Map(), false, { invertZod: true }],
			[function() {}, false],
			[[], false],
			[{}, false, { invertZod: true }],
			[s1, false],
			[s2, false],
			[[s1, s2], false],
			[{ [s1]: 12 }, false, { invertZod: true }],
			[{ [s2]: 13 }, false, { invertZod: true }],
			[{ [s1]: "12", [s2]: 13 }, false, { invertZod: true }],
			[{ [s1]: 12, [s2]: "13" }, false, { invertZod: true }],
			[{ [s1]: 12, [s2]: 13 }, true],
			[{ [s1]: 358, [s2]: 5237, [Symbol()]: "not a number" }, true],
		],
	});
});

describe("is partial record", () => {
	it("should have .keys that is equal to the given keys", () => {
		const keys = ["a", "b", "c"] as const;
		const is = isPartialRecord(keys, isDate);

		expect(is.keys).toBe(keys);
	});

	it("should have .isValue that is equal to the given guard", () => {
		const keys = ["a", "b", "c"] as const;
		const is = isPartialRecord(keys, isDate);

		expect(is.isValue).toBe(isDate);
	});
});

describe("is partial string record", () => {
	type T = Partial<Record<"firstName" | "secondName", string>>;

	const extraGuard = isPartialRecord(["firstName", "secondName", "thirdName"], isString);
	const guard = isPartialRecord(["firstName", "secondName"], isString);

	describedGuardTests<T>({
		guard: guard,
		equivalentGuards: [
			extraGuard.pick("firstName", "secondName", "secondName"),
			extraGuard.omit("thirdName", "thirdName"),
			isType<T>({
				firstName: isString.optional(),
				secondName: isString.optional(),
			}),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[{ secondName: 12 }, false],
			[{ firstName: "hello", secondName: 12 }, false],

			[NaN, true, { invertZod: true }],
			[true, true, { invertZod: true }],
			[new Date(), true],
			["hello", true, { invertZod: true }],
			[["firstName", "secondName"], true, { invertZod: true }],
			[() => { }, true, { invertZod: true }],

			[{ firstName: "hello" }, true],
			[{ firstName: "hello", secondName: "bye" }, true],
			[{ firstName: "hello", secondName: "bye", another: "one" }, true],
			[{ firstName: "hello", secondName: "bye", another: 45 }, true],
		],
	});
});

describe("is partial record with symbol keys", () => {
	const symbol = Symbol();

	describedGuardTests({
		guard: isPartialRecord([symbol], isString),
		testCases: [
			[undefined, false],
			[null, false],

			[{ [symbol]: 123 }, false, { invertZod: true }],
			[{ [symbol]: true }, false, { invertZod: true }],
			[{ [symbol]: null }, false, { invertZod: true }],
			[{ [symbol]: {} }, false, { invertZod: true }],

			[{}, true],
			[[], true, { invertZod: true }],
			[new Date(), true],
			["just a normal string", true, { invertZod: true }],
			[3131, true, { invertZod: true }],
			[2343n, true, { invertZod: true }],
			[true, true, { invertZod: true }],
			[symbol, true, { invertZod: true }],
			[() => { }, true, { invertZod: true }],

			[{ [Symbol("another symbol")]: 2423 }, true],
			[{ [Symbol()]: 2423 }, true],
			[{ [symbol]: "323532" }, true],
			[{ [symbol]: "hello" }, true],
			[{ [symbol]: "" }, true],
			[{ [symbol]: String(42) }, true],
			[{ [symbol]: undefined }, true],
			[{ [symbol]: "test", extra: 123 }, true],
			[{ extra: 123 }, true],
			[Object.create({ [symbol]: "inherited" }), true],
		],
	});
});

describe("is index record", () => {
	it("should have .isValue that is equal to the given value", () => {
		const is = isIndexRecord(isDate);

		expect(is.isValue).toBe(isDate);
	});
});

describe("is number index record", () => {
	class AllIHaveIsNumberFields {
		public constructor(
			public num1: number,
			public num2: number,
			public num3: number,
		) {

		}

		public static evenAStaticNumberField: number = 12;
	}

	describedGuardTests({
		guard: isIndexRecord(isNumber),
		equivalentGuards: [isNumber.indexRecord()],
		testCases: [
			[null, false],
			[undefined, false],
			[21, false],
			[23n, false],
			["4", false],
			[true, false],
			[false, false],
			[new Date(), false],
			[new Set(), false],
			[new Map(), false],
			[new AllIHaveIsNumberFields(1, 2, 3), false],
			[/this is my regex! not yours/, false],
			[[], false],
			[[213], false],

			[Object.create(null), false, { stringify: "Object.create(null)", invertZod: true }],
			[Object.create(Date.prototype), false, { stringify: "Object.create(Date.prototype)" }],
			[Object.create(AllIHaveIsNumberFields.prototype), false, { stringify: "Object.create(AllIHaveIsNumberFields.prototype)" }],

			[{ hello: "bye" }, false],
			[{ 61: "not a number" }, false],
			[{ [Symbol()]: 89987987987987897897n }, false],
			[{ hi: 12, bye: 6, blue: "kvdkdm" }, false],
			[{ 64634: 12, [Symbol()]: 6, blue: "kvdkdm" }, false],

			[{}, true],
			[{ hi: 12 }, true],
			[{ 0: 5, length: 1 }, true],
			[{ hi: 12, bye: 6 }, true],
			[{ 12: 12 }, true],
			[{ 12: 12, 56: 6 }, true],
			[{ 12: 12, bye: 6 }, true],
			[{ [Symbol()]: 45 }, true],
			[{ [Symbol()]: 45, [Symbol()]: 45 }, true],
			[{ [Symbol()]: 45, 56: 12 }, true],
			[{ str: 78, 79: 80, [Symbol()]: 90 }, true],

			[Object.create(Object.prototype), true, { stringify: "Object.create(Object.prototype)" }],
			[Object.create({}), true, { stringify: "Object.create({})" }],
			[Object.create({ name: 12 }), true, { stringify: "Object.create({ name: 12 })" }],
		],
	});
});
