import { describe } from "vitest";
import { isDate, isMaybe, isNumber, isObject, isString, isValueUnion } from "../src";
import { describedGuardTests } from "./utils";

describe("is tree type", () => {
	type Tree = {
		value: number;
		left: Tree | null;
		right: Tree | null;
	};

	describedGuardTests({
		guard: isObject<Tree>(isTree => ({
			value: isNumber,
			left: isMaybe(isTree),
			right: isMaybe(isTree),
		})),
		testCases: [
			[null, false],
			[undefined, false],
			[12, false],
			["6", false],
			[[], false],
			[{}, false],
			[0, false],
			[new Map(), false],
			[NaN, false],
			[{ value: 6, left: null, right: null }, true],
			[{ value: 6, right: null }, false],
			[{ value: "Hello, world!", left: null, right: null }, false],
			[{ value: 12, left: { value: 13, left: null, right: null }, right: null }, true],
			[{ value: 12, left: { value: 13, left: null, right: null }, right: { value: "Bye, world!", left: null, right: null } }, false],
			[{ value: 6, left: null, right: null, another: null }, true],
		],
	});
});

describe("is person interface", () => {
	interface Person {
		name: string;
		height: number;
		birthday: Date;
		deathday: Date | null;
		sex: "M" | "F";
	}

	describedGuardTests({
		guard: isObject<Person>({
			name: isString,
			height: isNumber,
			birthday: isDate,
			deathday: isMaybe(isDate),
			sex: isValueUnion("M", "F")
		}),
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			["", false],
			[0, false],
			[new Date(), false],
			[{}, false],
			[[], false],
			[new Set(), false],
			[{ name: "", height: 6, birthday: new Date(), sex: "F" }, false],
			[{ name: "", height: 6, birthday: new Date(), deathday: null, sex: "F" }, true],
			[{ name: "", height: 6, birthday: new Date(), deathDay: null, sex: "F" }, false],
			[{ name: "", height: 6, birthday: new Date(), deathday: null, sex: "F", another: "no" }, true],
			[{ name: "", height: 6, birthday: new Date(), deathday: new Date(), sex: "O" }, false],
			[{ name: NaN, height: 6, birthday: new Date(), deathday: new Date(), sex: "M" }, false],
		],
	});
});
