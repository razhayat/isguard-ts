import { describe, expect, it, vi } from "vitest";
import { isLazy, isNumber } from "../src";
import { describedGuardTests } from "./utils";

describe("is lazy", () => {
	it("should not call the generator when called", () => {
		const generator = vi.fn();

		isLazy(generator);

		expect(generator).not.toHaveBeenCalled();
	});

	describedGuardTests({
		guard: isLazy(() => isNumber),
		testCases: [
			[null, false],
			[undefined, false],
			[[], false],
			[{}, false],
			["hello", false],
			[5, true],
		],
	});
});
