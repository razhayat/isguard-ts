import { describe, expect, it, vi } from "vitest";
import { isArray, isIndexRecord, isLazy, isLiteral, isNumber, isOptional, isTuple, isType, isUndefined, isUnion, TypeGuard } from "../src";
import { describedGuardTests } from "./utils";

describe("is lazy", () => {
	it("should not call the generator when called", () => {
		const generator = vi.fn();

		const guard = isLazy(generator);
		guard.optional();
		guard.maybe();
		guard.and();
		guard.or();
		guard.array();
		guard.set();
		guard.indexRecord();
		guard.refine(isNumber);
		guard.zod();

		expect(generator).not.toHaveBeenCalled();
	});

	it("should have .unbox that should return the unboxed guard", () => {
		const generator = () => isNumber;
		const isLazyNumber = isLazy(generator);

		expect(isLazyNumber.unbox()).toBe(isNumber);
	});

	it("should memo its inner guard", () => {
		const generator = vi.fn();

		const isHello = isLazy(() => {
			generator();
			return isLiteral("hello");
		});

		isHello(123);
		isHello(123);

		expect(generator).toHaveBeenCalledOnce();
	});
});

describe("is recursive type", () => {
	type Node = {
		value: number;
		next?: Node;
	};

	const isNode: TypeGuard<Node> = isType<Node>({
		value: isNumber,
		next: isLazy(() => isNode).optional(),
	});

	const isCompletelyLazyNode: TypeGuard<Node> = isLazy(() => isType<Node>({
		value: isNumber,
		next: isCompletelyLazyNode.optional(),
	}));

	describedGuardTests({
		guard: isNode,
		equivalentGuards: [
			isCompletelyLazyNode,
		],
		testCases: [
			[null, false],
			[undefined, false],
			[0.534, false],
			[false, false],
			["string", false],
			[new Date(), false],
			[/[0-9]/, false],
			[[], false],
			[{}, false],
			[{ value: "" }, false],
			[{ value: 12, next: null }, false],
			[{ value: 12, next: { value: "0349" } }, false],
			[{ value: -32948, next: { value: 0.324, next: null } }, false],
			[{ value: 12, next: { value: 1323 } }, true],
			[{ value: 12, next: { value: 1323, next: { value: 313 } } }, true],
			[{ value: 12, next: { value: 1323, next: { value: 313, next: undefined } } }, true],
			[{ value: 12, next: { value: 1323, next: { value: 313, next: { value: 31231 } } } }, true],
		],
	});
});

describe("is recursive tuple", () => {
	type Row = [number, Row?];

	const isRow: TypeGuard<Row> = isTuple<Row>([
		isNumber,
		isOptional(isLazy(() => isRow)),
	]);

	const isCompletelyLazyRow: TypeGuard<Row> = isLazy(() => isTuple<Row>([
		isNumber,
		isUnion(isCompletelyLazyRow, isUndefined),
	]));

	describedGuardTests({
		guard: isRow,
		equivalentGuards: [
			{ guard: isCompletelyLazyRow, skipZod: true },
		],
		testCases: [
			[null, false],
			[undefined, false],
			[5.5, false],
			[false, false],
			[Symbol(), false],
			["20/12/2024", false],
			[() => {}, false],
			[[], false],
			[{}, false],
			[{ 0: 12, 1: [] }, false],
			[[12, ["353"]], false],
			[[4n, []], false],
			[[{}, [1, 2, 3]], false],
			[[32, [1, 2]], false],
			[[42342, [423432, ["bla"]]], false],
			[[-32, [5n]], false],
			[[12], true],
			[[15.5, undefined], true],
			[[64, [424]], true],
			[[943.2, [23432, [5352]]], true],
			[[64, [424]], true],
		],
	});
});

describe("is recursive union", () => {
	type Numbers = number | Numbers[];

	const isNumbers: TypeGuard<Numbers> = isUnion(
		isNumber,
		isLazy(() => isArray(isNumbers))
	);

	const isCompletelyLazyNumbers: TypeGuard<Numbers> = isLazy(() => isUnion(
		isNumber,
		isCompletelyLazyNumbers.array(),
	));

	describedGuardTests({
		guard: isNumbers,
		equivalentGuards: [
			isCompletelyLazyNumbers,
		],
		testCases: [
			[null, false],
			[undefined, false],
			[new Set(), false],
			[Date, false],
			[function () {}, false],
			[() => {}, false],
			["number", false],
			[true, false],
			[/[0123456789]/, false],
			[Symbol(), false],
			[{}, false],
			[{ numbers: 12 }, false],
			[121, true],
			[["not a number"], false],
			[[], true],
			[[[]], true],
			[[[[]]], true],
			[[[[[]]]], true],
			[[[[[]]]], true],
			[[[6, [[]]], 53], true],
			[[[6, [[]]], 53, [[[[]], [[[46, []]]]]]], true],
			[[[6, [[]]], 53, [[3532, [[]], [[[46, []]]], 567]]], true],
			[[[6, [[]]], 53, [[3532, [[]], [[[46, [], new Date()]]], 567]]], false],
		],
	});
});

describe("is recursive index record", () => {
	type RecursiveIndexRecord = {
		[key: PropertyKey]: RecursiveIndexRecord;
	};

	const isRecursiveIndexRecord: TypeGuard<RecursiveIndexRecord> = isIndexRecord(
		isLazy(() => isRecursiveIndexRecord),
	);

	const isCompletelyLazyRecursiveIndexRecord: TypeGuard<RecursiveIndexRecord> = isLazy(() => {
		return isCompletelyLazyRecursiveIndexRecord.indexRecord();
	});

	describedGuardTests({
		guard: isRecursiveIndexRecord,
		equivalentGuards: [
			isCompletelyLazyRecursiveIndexRecord,
		],
		testCases: [
			[null, false],
			[undefined, false],
			[42, false],
			[76n, false],
			[true, false],
			[Symbol("yes"), false],
			[[], false],
			[new Date(), false],
			[() => console.log, false],
			[function() { return {} }, false],
			[function*() {}, false],
			[async function() {}, false],
			[{ 0: new Set() }, false],
			[{ str: [] }, false],
			[{ [Symbol()]: "boolean" }, false],
			[{ field1: {}, field2: "not {}" }, false],
			[{ field1: { blue: [] }, field2: {} }, false],
			[{ field1: { blue: {}, blah: {}, brute: { yes: { exactly: {} }, no: { hi: 12 } } }, field2: {} }, false],
			[{}, true],
			[{ 0: {} }, true],
			[{ str: {} }, true],
			[{ [Symbol()]: {} }, true],
			[{ field1: {}, field2: {}, field3: {} }, true],
			[{ field1: {}, [Symbol("hi")]: { 3: {} }, field3: { 8: {}, field5: {} } }, true],
			[{ field1: { blue: {}, blah: {}, brute: { yes: { exactly: {} }, no: {} } }, field2: {} }, true],
		],
	});
});

describe("non recursive type", () => {
	describedGuardTests({
		guard: isLazy<number>(() => isNumber),
		equivalentGuards: [isNumber],
		testCases: [
			[null, false],
			[undefined, false],
			["hello", false],
			[false, false],
			[Symbol(), false],
			[13n, false],
			[[], false],
			[{}, false],
			[0, true],
		],
	});
});
