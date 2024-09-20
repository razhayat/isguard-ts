import { describe, expect, test } from "vitest";
import { describedGuardTests } from "./utils";
import { isEnum, getEnumValues } from "../src";

enum Example {
	one,
	two,
	three,
	apple = "apple",
	banana = 56,
	orange = "yami",
}

describe("is enum", () => {
	describedGuardTests({
		guard: isEnum(Example),
		testCases: [
			[Example.one, true, "Example.one"],
			[Example.two, true, "Example.two"],
			[Example.three, true, "Example.three"],
			[Example.apple, true, "Example.apple"],
			[Example.banana, true, "Example.banana"],
			[Example.orange, true, "Example.orange"],
			["yami", true],
			[56, true],
			["one", false],
			["oarange", false],
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			[new Date(), false],
		],
	});
});

describe("get enum values", () => {
	test("get enum values returns the values", () => {
		const result = getEnumValues(Example);
		const expected = [0, 1, 2, "apple", 56, "yami"];

		expect(result.sort()).toEqual(expected.sort());
	});
});
