import { describe, expect, it } from "vitest";
import { describedGuardTests } from "./utils";
import { isLiteral, isNever, isUnion } from "../src";

describe("is literal", () => {
	it("should have .values that is equal to the given values", () => {
		const values = [1, "f", false, null, undefined, 4n] as const;
		const is = isLiteral(...values);

		expect(is.values).toEqual(values);
	});
});

describe("is literal of nothing (never)", () => {
	describedGuardTests({
		guard: isLiteral(),
		equivalentGuards: [
			isNever,
			isLiteral("1234", 56, false).extract(),
			isLiteral("one", "two").exclude("one", "two"),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[12n, false],
			[true, false],
			[new Map(), false],
			[[], false],
			[{}, false],
			["hello", false],
			["one", false],
			["two", false],
			[[new Date(), 12, "bye"], false],
			[{ bye: "no", ok: "yes" }, false],
			[() => { }, false],
			[async function* () {}, false],
			[Symbol(), false],
			[/[A-Z]/, false],
		],
	});
});

describe("is literal (56)", () => {
	const guard = isLiteral(56);

	describedGuardTests({
		guard: guard,
		equivalentGuards: [
			guard.extract(56),
			guard.exclude(),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[57, false],
			[-56, false],
			[56n, false],
			[56.000001, false],
			[65, false],
			[new Number(56), false],
			["Empire", false],
			["56", false],
			[true, false],
			[Symbol(56), false],
			[/56/, false],
			[Symbol.for("56"), false],
			[[], false],
			[{}, false],
			[() => 56, false],
			[56, true],
			[56.0, true],
		],
	});
});

describe("is literal ('Empire!')", () => {
	const guard = isLiteral("Empire!");

	describedGuardTests({
		guard: guard,
		equivalentGuards: [
			isLiteral("Empire!", "Empire!"),
			guard.extract("Empire!", "Empire!"),
			isLiteral("Empire!", "to be excluded").extract("Empire!"),
			isLiteral("Empire!", "to be excluded").exclude("to be excluded", "to be excluded"),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[56, false],
			[57, false],
			[false, false],
			["to be excluded", false],
			["Empire", false],
			["empire!", false],
			["EMPIRE!", false],
			["EmPiRE!", false],
			["Empire!moreAfter", false],
			["Empire!Empire!", false],
			["Empire! Empire!", false],
			["!reipmE", false],
			[new String("Empire!"), false],
			[new Date(), false],
			[[], false],
			[{}, false],
			[{ "Empire!": "Empire!" }, false],
			["Empire!", true],
			["Empire" + "!", true],
			[`${"Empire"}!`, true],
		],
	});
});

describe("is 'apple' | 'orange' | 'banana' | 6", () => {
	const guard = isLiteral("apple", "orange", "banana", 6);

	describedGuardTests({
		guard: guard,
		equivalentGuards: [
			isLiteral("orange", "banana", "apple", 6),
			guard.extract("banana", 6, "orange", "apple"),
			isUnion(guard.extract("apple", "orange", "banana"), isLiteral(6)),
			isUnion(guard.exclude("banana"), isLiteral("banana")),
		],
		testCases: [
			[null, false],
			[undefined, false],
			[6.001, false],
			[5.999, false],
			["apple", true],
			["orange", true],
			["banana", true],
			["mango", false],
			["apple ", false],
			["BANANA", false],
			[6, true],
			["6", false],
			[new Map(), false],
			[new Date(), false],
			[new Set(), false],
		],
	});
});

describe("is 'apple' | 12 | 34n | true | null | undefined", () => {
	const guard = isLiteral("apple", 12, 34n, true, null, undefined);

	describedGuardTests({
		guard: guard,
		equivalentGuards: [
			guard.extract(true, void 0, 34n, "apple", null, 12),
			isLiteral("apple", 12, 34n, true, "not supposed to be here...", null, undefined).extract(true, void 0, 34n, "apple", null, 12),
			isLiteral(...guard.extract(true, void 0, null, 12).values, "apple", 34n),
			guard.exclude(),
			isLiteral("apple", 12, 34n, true, "please exclude me", null, undefined).exclude("please exclude me"),
			isLiteral(...guard.exclude(null).values, null),
		],
		testCases: [
			[6.001, false],
			[5.999, false],
			["apple ", false],
			["APPLE", false],
			["not supposed to be here...", false],
			["please exclude me", false],
			[false, false],
			[{}, false],
			[[], false],
			[function() {}, false],
			[["apple", 12, 34n, true, null, undefined], false],
			[[12], false],
			["6", false],
			[new Map(), false],
			[new Date(), false],
			[new Set(), false],
			["apple", true],
			[12, true],
			[34n, true],
			[true, true],
			[null, true],
			[undefined, true],
		],
	});
});
