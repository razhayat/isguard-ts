import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isTuple, isNumber, isOptional, isOptionalNumber, isString } from "../src";

describe("is normal tuple", () => {
	type Tuple = [string, number];

	describedGuardTests({
		guard: isTuple<Tuple>([isString, isNumber]),
		testCases: [
			[null, false],
			[undefined, false],
			["hello", false],
			[{ 0: "hello", 1: 6 }, false],
			[["hello", 6], true],
			[["hello", 78, new Date()], false],
			[["bye"], false],
			[[12, "bye"], false],
		],
	});
});

describe("is tuple with optional", () => {
	type Tuple = [number, number?];

	describedGuardTests({
		guard: isTuple<Tuple>([isNumber, isOptionalNumber]),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[{ 0: 5, 1: 6 }, false],
			[[5, 6], true],
			[[6, 78, new Date()], false],
			[[6], true],
			[[12, "bye"], false],
		],
	});
});

describe("is recursive tuple", () => {
	type Tuple = [number, Tuple?];

	describedGuardTests({
		guard: isTuple<Tuple>(isTuple => [isNumber, isOptional(isTuple)]),
		testCases: [
			[null, false],
			[undefined, false],
			[new Date(), false],
			[{ 0: 5, 1: [1] }, false],
			[[1, [2]], true],
			[[6, 78, new Date()], false],
			[[6], true],
			[[12, [13, [14]]], true],
		],
	});
});
