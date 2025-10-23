import { describe, expect, it } from "vitest";
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
	it("should have .enum that is equal to the given enum", () => {
		const isExample = isEnum(Example);

		expect(isExample.enum).toBe(Example);
	});
});

describe("is native enum", () => {
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

			[Example.one, true, { stringify: "Example.one" }],
			[Example.two, true, { stringify: "Example.two" }],
			[Example.three, true, { stringify: "Example.three" }],
			[Example.apple, true, { stringify: "Example.apple" }],
			[Example.banana, true, { stringify: "Example.banana" }],
			[Example.orange, true, { stringify: "Example.orange" }],

			["yami", true],
			[0, true],
			[56, true],
			["apple", true],
		],
	});
});

describe("is enum like", () => {
	const enumLike = {
		hello: 12,
		hi: "hi",
		bye: 46,
		12: "if it was a regular enum it would be hello",
		45: "bye",
		no: 1,
		1: "no",
	} as const;

	describedGuardTests({
		guard: isEnum(enumLike),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[[], false],
			[{}, false],
			[new Date(), false],
			[() => {}, false],
			[true, false],
			["hello", false],
			["HELLO", false],
			["random", false],
			[45, false],
			["12", false],
			["no", false],

			[enumLike.hello, true, { stringify: "enumLike.hello" }],
			[12, true],

			[enumLike.hi, true, { stringify: "enumLike.hi" }],
			["hi", true],

			[enumLike.bye, true, { stringify: "enumLike.bye" }],
			[46, true],

			[enumLike[12], true, { stringify: "enumLike[12]" }],
			["if it was a regular enum it would be hello", true],

			[enumLike[45], true, { stringify: "enumLike[45]" }],
			["bye", true],

			[enumLike.no, true, { stringify: "enumLike.no" }],
			[1, true],
		],
	});
});
