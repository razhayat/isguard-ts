import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isIndexRecord, isNumber } from "../src";

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
