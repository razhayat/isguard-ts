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
			[new Array(2), false],
			[56, false],
			[56n, false],
			[true, false],
			[Symbol(), false],
			["hello", false],
			["c2", false],
			[{}, false],
			[[], false],
			[function() { ["", 0] }, false],
			[{ 0: "hello", 1: 6 }, false],
			[["hello", 78, new Date()], false],
			[["bye"], false],
			[[12, "bye"], false],
			[["hello", 6], true],
			[["bye", 5], true],
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
			[false, false],
			[[], false],
			[{}, false],
			[/[0-9]/, false],
			[() => [12, 23], false],
			[{ 0: 5, 1: 6 }, false],
			[[6, 78, new Date()], false],
			[[12, "bye"], false],
			[[5, 6, 7], false],
			[[5, 6], true],
			[[-235, 345.34], true],
			[[6], true],
			[[NaN], true],
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
			["[123]", false],
			[false, false],
			[12, false],
			[[], false],
			[{}, false],
			[async function() {}, false],
			[{ 0: 5, 1: [1] }, false],
			[[6, 78, new Date()], false],
			[[1, 2], false],
			[[2, "not valid"], false],
			[[1, undefined, undefined], false],
			[[11, [12, [13, [14, ""]]]], false],
			[[1, undefined], true],
			[[1, [2]], true],
			[[6], true],
			[[12, [13, [14]]], true],
			[[11, [12, [13, [14]]]], true],
			[[11, [12, [13, [14, undefined]]]], true],
		],
	});
});
