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

describe("Guarded type", () => {
	it("should not allow non TypeGuard types", () => {
		type Actual = Guarded<
			// @ts-expect-error
			number
		>;
		type Expected = never;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should extract from TypeGuard", () => {
		type Actual = Guarded<TypeGuard<number>>;
		type Expected = number;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should extract from TypeGuard of union", () => {
		type Actual = Guarded<TypeGuard<string | number>>;
		type Expected = string | number;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should extract from union of TypeGuard", () => {
		type Actual = Guarded<TypeGuard<string> | TypeGuard<number>>;
		type Expected = string | number;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});
