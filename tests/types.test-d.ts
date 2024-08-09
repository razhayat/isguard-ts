import { describe, it, expectTypeOf } from "vitest";
import { TypeGuard } from "../src";

describe("TypeGuard type", () => {
	it("should be exectly equal", () => {
		type Actual = TypeGuard<number>;
		type Expected = TypeGuard<number>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should not equal derived types", () => {
		type Actual = TypeGuard<number>;
		type Expected = TypeGuard<number | undefined>;

		expectTypeOf<Actual>().not.toEqualTypeOf<Expected>();
	});

	it("should not equal base types", () => {
		type Actual = TypeGuard<number | undefined>;
		type Expected = TypeGuard<number>;

		expectTypeOf<Actual>().not.toEqualTypeOf<Expected>();
	});
});
