import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isMap, isNumber, isString } from "../src";

describe("is map", () => {
	describedGuardTests({
		guard: isMap(isNumber, isString),
		testCases: [
			[null, false],
			[undefined, false],
			["new Map()", false],
			[56, false],
			[56n, false],
			[[], false],
			[{}, false],
			[false, false],
			[Symbol.for("Map"), false],
			[new Date(), false],
			[() => new Map(), false],
			[new Set(), false],
			[new Map([[null, undefined]]), false],
			[new Map([["no", "hello"]]), false],
			[new Map<number, number | string>([[12, "hello"], [11, 12]]), false],
			[new WeakMap(), false],
			[Map, false],
			[new Map, true],
			[new Map(), true],
			[new Map(null), true],
			[new Map(undefined), true],
			[new Map([[12, "hello"]]), true],
			[new Map([[12, "hello"], [11, "bye"]]), true],
		],
	});
});
