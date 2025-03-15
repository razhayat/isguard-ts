import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isEnum } from "../src";

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
			[null, false],
			[undefined, false],
			[NaN, false],
			[-1, false],
			[0n, false],
			[0.001, false],
			[true, false],
			[false, false],
			[[], false],
			[{}, false],
			[new Date(), false],
			["one", false],
			["orange", false],
			["grape", false],
			[[Example.one], false],
			[() => Example.two, false],
			[Symbol(Example.three), false],
			[Example, false],

			[Example.one, true, "Example.one"],
			[Example.two, true, "Example.two"],
			[Example.three, true, "Example.three"],
			[Example.apple, true, "Example.apple"],
			[Example.banana, true, "Example.banana"],
			[Example.orange, true, "Example.orange"],

			["yami", true],
			[0, true],
			[56, true],
			["apple", true],
		],
	});
});
