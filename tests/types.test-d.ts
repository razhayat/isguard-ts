import { describe, it, expectTypeOf } from "vitest";
import { TypeGuard } from "../src";

describe("TypeGuard type", () => {
	it("should be exectly equal", () => {
		expectTypeOf<TypeGuard<number>>().toEqualTypeOf<TypeGuard<number>>();
	});

	it("should not equal derived types", () => {
		expectTypeOf<TypeGuard<number>>().not.toEqualTypeOf<TypeGuard<number | undefined>>();
	});

	it("should not equal base types", () => {
		expectTypeOf<TypeGuard<number | undefined>>().not.toEqualTypeOf<TypeGuard<number>>();
	});
});
