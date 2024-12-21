import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isNever, isObject, isUnknown } from "../src";

describe("is object", () => {
	describedGuardTests({
		guard: isObject,
		testCases: [
			[null, false],
			[undefined, false],
			["07/09/2024", false],
			["23/07/2024🥹", false],
			["06/08/2024🤦", false],
			[Symbol(), false],
			[56, false],
			[42n, false],
			[false, false],
			[/[]/, true],
			[{ hello: 12 }, true],
			[[2, null, "bye"], true],
			[new Set(), true],
			[new Map(), true],
			[[new Date()], true],
			[Object.create({}), true],
		],
	});
});

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
