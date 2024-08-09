import { describe, it, expectTypeOf } from "vitest";
import { Guarded, isArray, isInstanceof, isIntersection, isType, MapGuarded, MapTypeGuard, TypeGuard } from "../src";

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

describe("MapTypeGuard type", () => {
	it("should map to TypeGuard tuple", () => {
		type Actual = MapTypeGuard<[number, string, Date]>;
		type Expected = [TypeGuard<number>, TypeGuard<string>, TypeGuard<Date>];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should accept readonly tuple", () => {
		type Actual = MapTypeGuard<readonly [number, string, Date]>;
		type Expected = readonly [TypeGuard<number>, TypeGuard<string>, TypeGuard<Date>];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});

describe("MapGuarded type", () => {
	it("should map to Guarded tuple", () => {
		type Actual = MapGuarded<[TypeGuard<number>, TypeGuard<string>, TypeGuard<Date>]>;
		type Expected = [number, string, Date];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should accept readonly tuple", () => {
		type Actual = MapGuarded<readonly [TypeGuard<number>, TypeGuard<string>, TypeGuard<Date>]>;
		type Expected = readonly [number, string, Date];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});

describe("isArray return type", () => {
	it("should return TypeGuard<T[]>", () => {
		type Actual = ReturnType<typeof isArray<number>>;
		type Expected = TypeGuard<number[]>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});

describe("isInstanceof return type", () => {
	it("should return TypeGuard<T>", () => {
		class Example { }
		type Actual = ReturnType<typeof isInstanceof<Example>>;
		type Expected = TypeGuard<Example>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});

describe("isIntersection return type", () => {
	type A = { a: number };
	type B = { b: number };
	type C = { c: number };

	it("should return TypeGuard<A>", () => {
		type Actual = ReturnType<typeof isIntersection<[A]>>;
		type Expected = TypeGuard<A>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should return TypeGuard<A & B>", () => {
		type Actual = ReturnType<typeof isIntersection<[A, B]>>;
		type Expected = TypeGuard<A & B>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should return TypeGuard<A & B & C>", () => {
		type Actual = ReturnType<typeof isIntersection<[A, B, C]>>;
		type Expected = TypeGuard<A & B & C>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should return TypeGuard<A & (B | C)>", () => {
		type Actual = ReturnType<typeof isIntersection<[A, B | C]>>;
		type Expected = TypeGuard<A & (B | C)>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});

describe("isType return type", () => {
	type A = { a: number };

	it("should return TypeGuard<A>", () => {
		type Actual = ReturnType<typeof isType<A>>;
		type Expected = TypeGuard<A>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});
