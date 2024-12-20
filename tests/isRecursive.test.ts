import { describe } from "vitest";
import { isOptional, isRecursive, isType, isNumber } from "../src";
import { describedGuardTests } from "./utils";

describe("is recursive type", () => {
	type Node = {
		value: number;
		next?: Node;
	};

	describedGuardTests({
		guard: isRecursive<Node>(isNode => isType<Node>({
			value: isNumber,
			next: isOptional(isNode),
		})),
		testCases: [
			[null, false],
			[undefined, false],
			[0.534, false],
			[false, false],
			["string", false],
			[new Date(), false],
			[/[0-9]/, false],
			[[], false],
			[{}, false],
			[{ value: "" }, false],
			[{ value: 12, next: null }, false],
			[{ value: 12, next: { value: "0349" } }, false],
			[{ value: -32948, next: { value: 0.324, next: null } }, false],
			[{ value: 12, next: { value: 1323 } }, true],
			[{ value: 12, next: { value: 1323, next: { value: 313 } } }, true],
			[{ value: 12, next: { value: 1323, next: { value: 313, next: undefined } } }, true],
			[{ value: 12, next: { value: 1323, next: { value: 313, next: { value: 31231 } } } }, true],
		],
	});
});
