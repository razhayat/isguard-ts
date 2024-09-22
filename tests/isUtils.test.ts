import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isUnknown } from "../src";

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
