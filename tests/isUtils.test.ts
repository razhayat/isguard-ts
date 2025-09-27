import { describe } from "vitest";
import { describedGuardTests } from "./utils";
import { isFalse, isMaybe, isNever, isNil, isNull, isNumber, isObject, isPropertyKey, isTrue, isUndefined, isUnknown } from "../src";

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
			[12n, true],
			[true, true],
			[new Map(), true],
			[[], true],
			[{}, true],
			["hello", true],
			[[new Date(), 12, "bye"], true],
			[{ bye: "no", ok: "yes" }, true],
			[() => { }, true],
			[function() {}, true],
			[async () => {}, true],
			[Symbol("symbol"), true],
			[/[a-z]/, true],
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
			[12n, false],
			[true, false],
			[new Map(), false],
			[[], false],
			[{}, false],
			["hello", false],
			[[new Date(), 12, "bye"], false],
			[{ bye: "no", ok: "yes" }, false],
			[() => { }, false],
			[async function* () {}, false],
			[Symbol(), false],
			[/[A-Z]/, false],
		],
	});
});

describe("isPropertyKey", () => {
	describedGuardTests({
		guard: isPropertyKey,
		testCases: [
			[null, false],
			[undefined, false],
			[true, false],
			[false, false],
			[[], false],
			[{}, false],
			[{ key: "123" }, false],
			[function() {}, false],
			[() => {}, false],
			[new Map(), false],
			[new Set(), false],
			[BigInt(123), false],
			[123n, false],
			[Symbol, false],
			[Number, false],
			[String, false],

			["key", true],
			["propertyKey", true],
			["123", true],
			["", true],
			["0", true],
			["true", true],

			[123, true],
			[0, true],
			[-42, true],
			[-42.5, true],
			[Infinity, true],
			[-Infinity, true],
			[NaN, true],

			[Symbol("symbolKey"), true],
			[Symbol(), true],
			[Symbol.for("me"), true],
			[Symbol.iterator, true],
		],
	});
});

describe("isMaybe", () => {
	describedGuardTests({
		guard: isMaybe(isNumber),
		testCases: [
			[undefined, false],
			[false, false],
			[Symbol(), false],
			["123", false],
			[[], false],
			[{}, false],
			[function() {}, false],
			[new Date(), false],
			[Date, false],
			[BigInt(123), false],

			[123, true],
			[0, true],
			[-42, true],
			[3.14, true],
			[Infinity, true],
			[NaN, true],

			[null, true],
		],
	});
});

describe("is null", () => {
	describedGuardTests({
		guard: isNull,
		testCases: [
			[null, true],
			[undefined, false],
			[NaN, false],
			[6, false],
			[6n, false],
			["6", false],
			[false, false],
			[Symbol(), false],
			[new Date(), false],
			[() => {}, false],
			[/[]/, false],
			[[], false],
			[{}, false],
		],
	});
});

describe("is undefined", () => {
	describedGuardTests({
		guard: isUndefined,
		testCases: [
			[null, false],
			[423n, false],
			[true, false],
			["hello", false],
			[new Map(), false],
			[Symbol("undefined"), false],
			[async function() {}, false],
			[[], false],
			[{}, false],
			[["Empire"], false],

			[undefined, true],
			[void 353.4, true],
			[void null, true],
			[void new Date(), true],
			[void (() => 12)(), true],
		],
	});
});

describe("is nil", () => {
	describedGuardTests({
		guard: isNil,
		testCases: [
			[56, false],
			[-34n, false],
			["null", false],
			["", false],
			[NaN, false],
			[true, false],
			[new Set(), false],
			[RegExp, false],
			[[], false],
			[{}, false],
			[{ maybe: 61 }, false],

			[null, true],
			[undefined, true],
			[void NaN, true],
			[void "", true],
			[void false, true],
			[void Symbol, true],
		],
	});
});

describe("is true", () => {
	describedGuardTests({
		guard: isTrue,
		testCases: [
			[null, false],
			[undefined, false],
			[56, false],
			[{ maybe: 61 }, false],
			[new Date(), false],
			["true", false],
			["True", false],
			[new Boolean(true), false],
			[false, false],
			[async () => {}, false],
			[Symbol.for("true"), false],
			[[], false],
			[{}, false],
			[true, true],
		],
	});
});

describe("is false", () => {
	describedGuardTests({
		guard: isFalse,
		testCases: [
			[null, false],
			[undefined, false],
			[NaN, false],
			[0, false],
			["false", false],
			["False", false],
			[new Boolean(false), false],
			[new Boolean(true), false],
			[[], false],
			[{}, false],
			[function() {}, false],
			[[false], false],
			[true, false],
			[false, true],
		],
	});
});
