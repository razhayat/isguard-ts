import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isIndexRecord, isNumber, isRecord, isValueUnion } from "../src";

describe("is indexRecord", () => {
	describedGuardTests({
		guard: isIndexRecord(isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[21, false],
			["4", false],
			[new Date(), false],
			[{ hello: "bye" }, false],
			[{ hi: 12, bye: 6, blue: "kvdkdm" }, false],
			[[], false],
			[{}, true],
			[{ hi: 12 }, true],
			[{ hi: 12, bye: 6 }, true],
			[{ [Symbol()]: 45 }, true],
		],
	});
});

describe("is Record<'a' | 'b', 'c', 'd'> record", () => {
	describedGuardTests({
		guard: isRecord(["a", "b"], isValueUnion("c", "d")),
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			[new Set(), false],
			[{ a: "c" }, false],
			[{ a: "d", b: "invalid value" }, false],
			[{ a: "invalid", b: "another invalid" }, false],
			[{ a: "c", b: "d", another: "kvdkdm" }, true],
			[{ a: "c", b: "d" }, true],
			[{ a: "d", b: "c" }, true],
		],
	});
});