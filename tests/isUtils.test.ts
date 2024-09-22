import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isNever, isUnknown } from "../src";

describe("isUnknown", () => {
	describedGuardTests({
		guard: isUnknown,
		testCases: [
			[null, true],
			[undefined, true],
			[12, true],
			[true, true],
			[new Map(), true],
			[[], true],
			[{}, true],
			["hello", true],
			[[new Date(), 12, "bye"], true],
			[{ bye: "no", ok: "yes" }, true],
			[() => { }, true],
		],
	});
});

describe("isNever", () => {
	describedGuardTests({
		guard: isNever,
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			[true, false],
			[new Map(), false],
			[[], false],
			[{}, false],
			["hello", false],
			[[new Date(), 12, "bye"], false],
			[{ bye: "no", ok: "yes" }, false],
			[() => { }, false],
		],
	});
});
