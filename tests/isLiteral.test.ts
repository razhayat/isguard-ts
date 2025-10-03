import { describe, expect, it } from "vitest";
import { describedGuardTests } from "./utils";
import { isLiteral, isNever } from "../src";

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
		equivalentGuards: [isNever],
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
	describedGuardTests({
		guard: isLiteral(56),
		testCases: [
			[null, false],
			[undefined, false],
			[57, false],
			[-56, false],
			[56n, false],
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
	describedGuardTests({
		guard: isLiteral("Empire!"),
		testCases: [
			[null, false],
			[undefined, false],
			[56, false],
			[57, false],
			[false, false],
			["Empire", false],
			["empire!", false],
			["EMPIRE!", false],
			["EmPiRE!", false],
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
	describedGuardTests({
		guard: isLiteral("apple", "orange", "banana", 6),
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
	describedGuardTests({
		guard: isLiteral("apple", 12, 34n, true, null, undefined),
		testCases: [
			[6.001, false],
			[5.999, false],
			["apple ", false],
			["APPLE", false],
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
