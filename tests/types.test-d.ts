import { describe, it, expectTypeOf, test } from "vitest";
import { Guarded, isArray, isBoolean, isBooleanArray, isDate, isDateArray, isEnum, isFunction, isIndexRecord, isInstanceof, isIntersection, isMaybeBoolean, isMaybeDate, isMaybeNumber, isMaybeString, isNil, isNull, isNumber, isNumberArray, isObject, isOptionalDate, isOptionalBoolean, isOptionalNumber, isOptionalString, isString, isStringArray, isType, isUndefined, isUnion, TypeGuard, TypeGuardTemplate, isUnknown, isNever, isTrue, isFalse, isMap, isSet, isRecord, isPartialRecord, isTuple, isSymbol, isPropertyKey, isError, isEvalError, isRangeError, isReferenceError, isSyntaxError, isTypeError, isURIError, isRegExp, isLazy, isLiteral, isRefine, isOptional, isMaybe, ArrayTypeGuard, EnumTypeGuard, InstanceofTypeGuard, IntersectionTypeGuard, LazyTypeGuard, LiteralTypeGuard, MapTypeGuard, RefineTypeGuard, SetTypeGuard } from "../src";

describe("TypeGuard type", () => {
	it("should be exactly equal", () => {
		type Type1 = number;
		type Type2 = number;

		expectTypeOf<Type1>().toEqualTypeOf<Type2>();
		expectTypeOf<TypeGuard<Type1>>().toEqualTypeOf<TypeGuard<Type2>>();
		expectTypeOf<ArrayTypeGuard<Type1>>().toEqualTypeOf<ArrayTypeGuard<Type2>>();
		expectTypeOf<IntersectionTypeGuard<[Type1]>>().toEqualTypeOf<IntersectionTypeGuard<[Type2]>>();
		expectTypeOf<LazyTypeGuard<Type1>>().toEqualTypeOf<LazyTypeGuard<Type2>>();
		expectTypeOf<LiteralTypeGuard<[Type1]>>().toEqualTypeOf<LiteralTypeGuard<[Type2]>>();
		expectTypeOf<RefineTypeGuard<unknown, Type1>>().toEqualTypeOf<RefineTypeGuard<unknown, Type2>>();
		expectTypeOf<SetTypeGuard<Type1>>().toEqualTypeOf<SetTypeGuard<Type2>>();
	});

	it("should be based on structural typing", () => {
		type Type1 = { name: string; age: number; };
		type Type2 = { name: string; age: number; };

		expectTypeOf<Type1>().toEqualTypeOf<Type2>();
		expectTypeOf<TypeGuard<Type1>>().toEqualTypeOf<TypeGuard<Type2>>();
		expectTypeOf<ArrayTypeGuard<Type1>>().toEqualTypeOf<ArrayTypeGuard<Type2>>();
		expectTypeOf<IntersectionTypeGuard<[Type1]>>().toEqualTypeOf<IntersectionTypeGuard<[Type2]>>();
		expectTypeOf<LazyTypeGuard<Type1>>().toEqualTypeOf<LazyTypeGuard<Type2>>();
		expectTypeOf<RefineTypeGuard<unknown, Type1>>().toEqualTypeOf<RefineTypeGuard<unknown, Type2>>();
		expectTypeOf<SetTypeGuard<Type1>>().toEqualTypeOf<SetTypeGuard<Type2>>();
	});

	it("should not match base types", () => {
		type Base = number | undefined;
		type Derived = number;

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Derived>>().not.toExtend<TypeGuard<Base>>();
		expectTypeOf<ArrayTypeGuard<Derived>>().not.toExtend<ArrayTypeGuard<Base>>();
		expectTypeOf<IntersectionTypeGuard<[Derived]>>().not.toExtend<IntersectionTypeGuard<[Base]>>();
		expectTypeOf<LazyTypeGuard<Derived>>().not.toExtend<LazyTypeGuard<Base>>();
		expectTypeOf<LiteralTypeGuard<[Derived]>>().not.toExtend<LiteralTypeGuard<[Base]>>();
		expectTypeOf<RefineTypeGuard<unknown, Derived>>().not.toExtend<RefineTypeGuard<unknown, Base>>();
		expectTypeOf<SetTypeGuard<Derived>>().not.toExtend<SetTypeGuard<Base>>();
	});

	it("should not match base types", () => {
		type Base = { a: string; };
		type Derived = Base & { b: number; };

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Derived>>().not.toExtend<TypeGuard<Base>>();
		expectTypeOf<ArrayTypeGuard<Derived>>().not.toExtend<ArrayTypeGuard<Base>>();
		expectTypeOf<IntersectionTypeGuard<[Derived]>>().not.toExtend<IntersectionTypeGuard<[Base]>>();
		expectTypeOf<LazyTypeGuard<Derived>>().not.toExtend<LazyTypeGuard<Base>>();
		expectTypeOf<RefineTypeGuard<unknown, Derived>>().not.toExtend<RefineTypeGuard<unknown, Base>>();
		expectTypeOf<SetTypeGuard<Derived>>().not.toExtend<SetTypeGuard<Base>>();
	});

	it("should not match base types", () => {
		class Base { a: string = "a" }
		class Derived extends Base { b: number = 12 }

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Derived>>().not.toExtend<TypeGuard<Base>>();
		expectTypeOf<ArrayTypeGuard<Derived>>().not.toExtend<ArrayTypeGuard<Base>>();
		expectTypeOf<InstanceofTypeGuard<typeof Derived>>().not.toExtend<InstanceofTypeGuard<typeof Base>>();
		expectTypeOf<IntersectionTypeGuard<[Derived]>>().not.toExtend<IntersectionTypeGuard<[Base]>>();
		expectTypeOf<LazyTypeGuard<Derived>>().not.toExtend<LazyTypeGuard<Base>>();
		expectTypeOf<RefineTypeGuard<unknown, Derived>>().not.toExtend<RefineTypeGuard<unknown, Base>>();
		expectTypeOf<SetTypeGuard<Derived>>().not.toExtend<SetTypeGuard<Base>>();
	});

	it("should not match base types", () => {
		enum Derived { value }
		type Base = Derived | null;

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Derived>>().not.toExtend<TypeGuard<Base>>();
		expectTypeOf<ArrayTypeGuard<Derived>>().not.toExtend<ArrayTypeGuard<Base>>();
		expectTypeOf<IntersectionTypeGuard<[Derived]>>().not.toExtend<IntersectionTypeGuard<[Base]>>();
		expectTypeOf<LazyTypeGuard<Derived>>().not.toExtend<LazyTypeGuard<Base>>();
		expectTypeOf<RefineTypeGuard<unknown, Derived>>().not.toExtend<RefineTypeGuard<unknown, Base>>();
		expectTypeOf<SetTypeGuard<Derived>>().not.toExtend<SetTypeGuard<Base>>();
	});

	it("should not match derived types", () => {
		type Base = number | undefined;
		type Derived = number;

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Base>>().not.toExtend<TypeGuard<Derived>>();
		expectTypeOf<ArrayTypeGuard<Base>>().not.toExtend<ArrayTypeGuard<Derived>>();
		expectTypeOf<IntersectionTypeGuard<[Base]>>().not.toExtend<IntersectionTypeGuard<[Derived]>>();
		expectTypeOf<LazyTypeGuard<Base>>().not.toExtend<LazyTypeGuard<Derived>>();
		expectTypeOf<LiteralTypeGuard<[Base]>>().not.toExtend<LiteralTypeGuard<[Derived]>>();
		expectTypeOf<RefineTypeGuard<unknown, Base>>().not.toExtend<RefineTypeGuard<unknown, Derived>>();
		expectTypeOf<SetTypeGuard<Base>>().not.toExtend<SetTypeGuard<Derived>>();
	});

	it("should not match derived types", () => {
		type Base = { a: string; };
		type Derived = Base & { b: number; };

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Base>>().not.toExtend<TypeGuard<Derived>>();
		expectTypeOf<ArrayTypeGuard<Base>>().not.toExtend<ArrayTypeGuard<Derived>>();
		expectTypeOf<IntersectionTypeGuard<[Base]>>().not.toExtend<IntersectionTypeGuard<[Derived]>>();
		expectTypeOf<LazyTypeGuard<Base>>().not.toExtend<LazyTypeGuard<Derived>>();
		expectTypeOf<RefineTypeGuard<unknown, Base>>().not.toExtend<RefineTypeGuard<unknown, Derived>>();
		expectTypeOf<SetTypeGuard<Base>>().not.toExtend<SetTypeGuard<Derived>>();
	});

	it("should not match derived types", () => {
		class Base { a: string = "a" }
		class Derived extends Base { b: number = 12 }

		expectTypeOf<Derived>().toExtend<Base>();
		expectTypeOf<TypeGuard<Base>>().not.toExtend<TypeGuard<Derived>>();
		expectTypeOf<ArrayTypeGuard<Base>>().not.toExtend<ArrayTypeGuard<Derived>>();
		expectTypeOf<InstanceofTypeGuard<typeof Base>>().not.toExtend<InstanceofTypeGuard<typeof Derived>>();
		expectTypeOf<IntersectionTypeGuard<[Base]>>().not.toExtend<IntersectionTypeGuard<[Derived]>>();
		expectTypeOf<LazyTypeGuard<Base>>().not.toExtend<LazyTypeGuard<Derived>>();
		expectTypeOf<RefineTypeGuard<unknown, Base>>().not.toExtend<RefineTypeGuard<unknown, Derived>>();
		expectTypeOf<SetTypeGuard<Base>>().not.toExtend<SetTypeGuard<Derived>>();
	});

	it("should not match mutually assignable types", () => {
		type Type1 = { name: string };
		type Type2 = Type1 & { age?: number };

		expectTypeOf<Type1>().toExtend<Type2>();
		expectTypeOf<Type2>().toExtend<Type1>();

		expectTypeOf<TypeGuard<Type1>>().not.toExtend<TypeGuard<Type2>>();
		expectTypeOf<TypeGuard<Type2>>().not.toExtend<TypeGuard<Type1>>();

		expectTypeOf<ArrayTypeGuard<Type1>>().not.toExtend<ArrayTypeGuard<Type2>>();
		expectTypeOf<ArrayTypeGuard<Type2>>().not.toExtend<ArrayTypeGuard<Type1>>();

		expectTypeOf<IntersectionTypeGuard<[Type1]>>().not.toExtend<IntersectionTypeGuard<[Type2]>>();
		expectTypeOf<IntersectionTypeGuard<[Type2]>>().not.toExtend<IntersectionTypeGuard<[Type1]>>();

		expectTypeOf<LazyTypeGuard<Type1>>().not.toExtend<LazyTypeGuard<Type2>>();
		expectTypeOf<LazyTypeGuard<Type2>>().not.toExtend<LazyTypeGuard<Type1>>();

		expectTypeOf<RefineTypeGuard<unknown, Type1>>().not.toExtend<RefineTypeGuard<unknown, Type2>>();
		expectTypeOf<RefineTypeGuard<unknown, Type2>>().not.toExtend<RefineTypeGuard<unknown, Type1>>();

		expectTypeOf<SetTypeGuard<Type1>>().not.toExtend<SetTypeGuard<Type2>>();
		expectTypeOf<SetTypeGuard<Type2>>().not.toExtend<SetTypeGuard<Type1>>();
	});

	it("should not match mutually assignable types", () => {
		type Type1 = Record<never, unknown>;
		type Type2 = Partial<{ hello: string }>;

		expectTypeOf<Type1>().toExtend<Type2>();
		expectTypeOf<Type2>().toExtend<Type1>();

		expectTypeOf<TypeGuard<Type1>>().not.toExtend<TypeGuard<Type2>>();
		expectTypeOf<TypeGuard<Type2>>().not.toExtend<TypeGuard<Type1>>();

		expectTypeOf<ArrayTypeGuard<Type1>>().not.toExtend<ArrayTypeGuard<Type2>>();
		expectTypeOf<ArrayTypeGuard<Type2>>().not.toExtend<ArrayTypeGuard<Type1>>();

		expectTypeOf<IntersectionTypeGuard<[Type1]>>().not.toExtend<IntersectionTypeGuard<[Type2]>>();
		expectTypeOf<IntersectionTypeGuard<[Type2]>>().not.toExtend<IntersectionTypeGuard<[Type1]>>();

		expectTypeOf<LazyTypeGuard<Type1>>().not.toExtend<LazyTypeGuard<Type2>>();
		expectTypeOf<LazyTypeGuard<Type2>>().not.toExtend<LazyTypeGuard<Type1>>();

		expectTypeOf<RefineTypeGuard<unknown, Type1>>().not.toExtend<RefineTypeGuard<unknown, Type2>>();
		expectTypeOf<RefineTypeGuard<unknown, Type2>>().not.toExtend<RefineTypeGuard<unknown, Type1>>();

		expectTypeOf<SetTypeGuard<Type1>>().not.toExtend<SetTypeGuard<Type2>>();
		expectTypeOf<SetTypeGuard<Type2>>().not.toExtend<SetTypeGuard<Type1>>();
	});

	it("should not match mutually assignable types", () => {
		type Type1 = Record<never, unknown>;
		type Type2 = { hello?: string };

		expectTypeOf<Type1>().toExtend<Type2>();
		expectTypeOf<Type2>().toExtend<Type1>();

		expectTypeOf<TypeGuard<Type1>>().not.toExtend<TypeGuard<Type2>>();
		expectTypeOf<TypeGuard<Type2>>().not.toExtend<TypeGuard<Type1>>();

		expectTypeOf<ArrayTypeGuard<Type1>>().not.toExtend<ArrayTypeGuard<Type2>>();
		expectTypeOf<ArrayTypeGuard<Type2>>().not.toExtend<ArrayTypeGuard<Type1>>();

		expectTypeOf<IntersectionTypeGuard<[Type1]>>().not.toExtend<IntersectionTypeGuard<[Type2]>>();
		expectTypeOf<IntersectionTypeGuard<[Type2]>>().not.toExtend<IntersectionTypeGuard<[Type1]>>();

		expectTypeOf<LazyTypeGuard<Type1>>().not.toExtend<LazyTypeGuard<Type2>>();
		expectTypeOf<LazyTypeGuard<Type2>>().not.toExtend<LazyTypeGuard<Type1>>();

		expectTypeOf<RefineTypeGuard<unknown, Type1>>().not.toExtend<RefineTypeGuard<unknown, Type2>>();
		expectTypeOf<RefineTypeGuard<unknown, Type2>>().not.toExtend<RefineTypeGuard<unknown, Type1>>();

		expectTypeOf<SetTypeGuard<Type1>>().not.toExtend<SetTypeGuard<Type2>>();
		expectTypeOf<SetTypeGuard<Type2>>().not.toExtend<SetTypeGuard<Type1>>();
	});

	it("should not match mutually assignable types", () => {
		class Type1 { field1: Date = new Date() }
		class Type2 extends Type1 { field2?: string };

		expectTypeOf<Type1>().toExtend<Type2>();
		expectTypeOf<Type2>().toExtend<Type1>();

		expectTypeOf<TypeGuard<Type1>>().not.toExtend<TypeGuard<Type2>>();
		expectTypeOf<TypeGuard<Type2>>().not.toExtend<TypeGuard<Type1>>();

		expectTypeOf<ArrayTypeGuard<Type1>>().not.toExtend<ArrayTypeGuard<Type2>>();
		expectTypeOf<ArrayTypeGuard<Type2>>().not.toExtend<ArrayTypeGuard<Type1>>();

		expectTypeOf<InstanceofTypeGuard<typeof Type1>>().not.toExtend<ArrayTypeGuard<typeof Type2>>();
		expectTypeOf<InstanceofTypeGuard<typeof Type2>>().not.toExtend<ArrayTypeGuard<typeof Type1>>();

		expectTypeOf<IntersectionTypeGuard<[Type1]>>().not.toExtend<IntersectionTypeGuard<[Type2]>>();
		expectTypeOf<IntersectionTypeGuard<[Type2]>>().not.toExtend<IntersectionTypeGuard<[Type1]>>();

		expectTypeOf<LazyTypeGuard<Type1>>().not.toExtend<LazyTypeGuard<Type2>>();
		expectTypeOf<LazyTypeGuard<Type2>>().not.toExtend<LazyTypeGuard<Type1>>();

		expectTypeOf<RefineTypeGuard<unknown, Type1>>().not.toExtend<RefineTypeGuard<unknown, Type2>>();
		expectTypeOf<RefineTypeGuard<unknown, Type2>>().not.toExtend<RefineTypeGuard<unknown, Type1>>();

		expectTypeOf<SetTypeGuard<Type1>>().not.toExtend<SetTypeGuard<Type2>>();
		expectTypeOf<SetTypeGuard<Type2>>().not.toExtend<SetTypeGuard<Type1>>();
	});

	it("should have .optional() that receives no parameters and returns TypeGuard<T | undefined>", () => {
		type T = number;

		expectTypeOf<TypeGuard<T>>().toHaveProperty("optional").toEqualTypeOf<() => TypeGuard<T | undefined>>();
	});

	it("should have .maybe() that receives no parameters and returns TypeGuard<T | null>", () => {
		type T = { name: string; age: number; };

		expectTypeOf<TypeGuard<T>>().toHaveProperty("maybe").toEqualTypeOf<() => TypeGuard<T | null>>();
	});

	it("should have .array() that receives no parameters and returns ArrayTypeGuard<T>", () => {
		type T = [number, string];

		expectTypeOf<TypeGuard<T>>().toHaveProperty("array").toEqualTypeOf<() => ArrayTypeGuard<T>>();
	});

	it("should have .set() that receives no parameters and returns TypeGuard<Set<T>>", () => {
		type T = Date[];

		expectTypeOf<TypeGuard<T>>().toHaveProperty("set").toEqualTypeOf<() => SetTypeGuard<T>>();
	});

	it("should have .indexRecord() that receives no parameters and returns TypeGuard<Record<PropertyKey, T>>", () => {
		type T = number | string;

		expectTypeOf<TypeGuard<T>>().toHaveProperty("indexRecord").toEqualTypeOf<() => TypeGuard<Record<PropertyKey, T>>>();
	});

	it("should have .refine() that receives a refinement function and returns TypeGuard<R>", () => {
		type RefineResult = `I have ${number} apples`;
		const refine = isString.refine<RefineResult>;

		expectTypeOf(refine).toEqualTypeOf<(refinement: (value: string) => value is RefineResult) => RefineTypeGuard<string, RefineResult>>();
	});
});

describe("Guarded type", () => {
	it("should not allow non TypeGuard types", () => {
		type Result = Guarded<
			// @ts-expect-error
			number
		>;

		expectTypeOf<Result>().toBeNever();
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

	it("should not extract recursively", () => {
		type Actual = Guarded<TypeGuard<TypeGuard<Date>>>;
		type Expected = TypeGuard<Date>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should allow TypeGuard<never>", () => {
		type Actual = Guarded<TypeGuard<never>>;
		type Expected = never;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});
});

describe("TypeGuardTemplate type", () => {
	it("should map to TypeGuard", () => {
		type Actual = TypeGuardTemplate<{ a: number; b: string; }>;
		type Expected = { a: TypeGuard<number>; b: TypeGuard<string>; };

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should handle fields with union types", () => {
		type Actual = TypeGuardTemplate<{ a: number | null }>;
		type Expected = { a: TypeGuard<number | null>; };

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should handle fields with intersection types", () => {
		type A = { a: string };
		type B = { b: number };
		type Actual = TypeGuardTemplate<{ a: A & B; }>;
		type Expected = { a: TypeGuard<A & B>; };

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should handle fields with complex types", () => {
		type A = { a: string };
		type B = { b: number };
		type C = { c: Date };
		type Actual = TypeGuardTemplate<{ a: (A & B) | C; }>;
		type Expected = { a: TypeGuard<(A & B) | C>; };

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should make optional fields required", () => {
		type Actual = TypeGuardTemplate<{ a?: number; }>;
		type Expected = { a: TypeGuard<number | undefined>; };

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should remove readonly", () => {
		type Actual = TypeGuardTemplate<{ readonly a: number; }>;
		type Expected = { a: TypeGuard<number>; };

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should support tuples", () => {
		type Actual = TypeGuardTemplate<[number, string]>;
		type Expected = [TypeGuard<number>, TypeGuard<string>];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should remove readonly from tuple", () => {
		type Actual = TypeGuardTemplate<readonly [number, string]>;
		type Expected = [TypeGuard<number>, TypeGuard<string>];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should remove optional from tuple item", () => {
		type Actual = TypeGuardTemplate<[string?]>;
		type Expected = [TypeGuard<string | undefined>];

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should not match derived types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type BaseTemplate = TypeGuardTemplate<Base>;
		type DerivedTemplate = TypeGuardTemplate<Derived>;

		expectTypeOf<BaseTemplate>().not.toExtend<DerivedTemplate>();
	});

	it("should not match base types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type DerivedTemplate = TypeGuardTemplate<Derived>;
		type BaseTemplate = TypeGuardTemplate<Base>;

		expectTypeOf<DerivedTemplate>().not.toExtend<BaseTemplate>();
	});

	it("should not match mutually assignable types", () => {
		type Type1 = { name?: string };
		type Type2 = Type1 & { age?: number };

		expectTypeOf<Type1>().toExtend<Type2>();
		expectTypeOf<Type2>().toExtend<Type1>();
		expectTypeOf<TypeGuardTemplate<Type1>>().not.toExtend<TypeGuardTemplate<Type2>>();
		expectTypeOf<TypeGuardTemplate<Type2>>().not.toExtend<TypeGuardTemplate<Type1>>();
	});
});

describe("isArray return type", () => {
	describe("return type", () => {
		it("should return TypeGuard<number[]>", () => {
			const actual = isArray(isNumber);

			expectTypeOf(actual).toEqualTypeOf<ArrayTypeGuard<number>>();
			expectTypeOf(actual).toExtend<TypeGuard<number[]>>();
		});

		it("should return TypeGuard<string[][]>", () => {
			const actual = isArray(isArray(isString));

			expectTypeOf(actual).toEqualTypeOf<ArrayTypeGuard<string[]>>();
			expectTypeOf(actual).toExtend<TypeGuard<string[][]>>();
		});

		it("should handle unions", () => {
			const actual = isArray(isUnion(isNumber, isString));

			expectTypeOf(actual).toEqualTypeOf<ArrayTypeGuard<number | string>>();
			expectTypeOf(actual).toExtend<TypeGuard<(number | string)[]>>();
		});

		it("should have .isValue that is of type TypeGuard<T>", () => {
			type T = { hello: Date; };
			const actual = isArray(isType<T>({ hello: isDate }));

			expectTypeOf(actual.isValue).toEqualTypeOf<TypeGuard<T>>();
		});
	});
});

describe("isEnum", () => {
	enum Example {
		field,
	}

	describe("return type", () => {
		it("should return TypeGuard<T>", () => {
			const actual = isEnum(Example);

			expectTypeOf(actual).toEqualTypeOf<EnumTypeGuard<typeof Example>>();
			expectTypeOf(actual).toExtend<TypeGuard<Example>>();
		});

		it("should have .enum that is of type TypeGuard<typeof Example>", () => {
			const actual = isEnum(Example);

			expectTypeOf(actual.enum).toEqualTypeOf<typeof Example>();
		});
	});

	describe("parameters", () => {
		it("should accept regular enum", () => {
			isEnum(Example);
		});

		it("should not accept const enums", () => {
			const enum ConstEnum {}
			isEnum(
				// @ts-expect-error
				ConstEnum
			);
		});
	});
});

describe("isInstanceof", () => {
	describe("return type", () => {
		it("should return TypeGuard<T>", () => {
			class Example { }
			const actual = isInstanceof(Example);

			expectTypeOf(actual).toEqualTypeOf<InstanceofTypeGuard<typeof Example>>();
			expectTypeOf(actual).toExtend<TypeGuard<Example>>();
		});

		it("should have .constructor that is of type TypeGuard<typeof Example>", () => {
			class Example {}
			const actual = isInstanceof(Example);

			expectTypeOf(actual.constructor).toEqualTypeOf<typeof Example>();
		});
	});

	describe("parameters", () => {
		it("should accept abstract class", () => {
			abstract class Example { }
			const actual = isInstanceof(Example);

			expectTypeOf(actual).toEqualTypeOf<InstanceofTypeGuard<typeof Example>>();
			expectTypeOf(actual).toExtend<TypeGuard<Example>>();
		});

		it("should not accept function constructor", () => {
			function Example() { }
			isInstanceof(
				// @ts-expect-error
				Example
			);
		});
	});
});

describe("isIntersection", () => {
	type A = { a: number };
	type B = { b: number };
	type C = { c: number };

	const isA = isType<A>({ a: isNumber });
	const isB = isType<B>({ b: isNumber });
	const isC = isType<C>({ c: isNumber });

	describe("return type", () => {
		it("should return TypeGuard<unknown>", () => {
			const actual = isIntersection();

			expectTypeOf(actual).toEqualTypeOf<IntersectionTypeGuard<[]>>();
			expectTypeOf(actual).toExtend<TypeGuard<unknown>>();
		});

		it("should return TypeGuard<A>", () => {
			const actual = isIntersection(isA);

			expectTypeOf(actual).toEqualTypeOf<IntersectionTypeGuard<[A]>>();
			expectTypeOf(actual).toExtend<TypeGuard<A>>();
		});

		it("should return TypeGuard<A & B>", () => {
			const actual = isIntersection(isA, isB);

			expectTypeOf(actual).toEqualTypeOf<IntersectionTypeGuard<[A, B]>>();
			expectTypeOf(actual).not.toEqualTypeOf<IntersectionTypeGuard<[B, A]>>();
			expectTypeOf(actual).toExtend<TypeGuard<A & B>>();
		});

		it("should return TypeGuard<A & B & C>", () => {
			const actual = isIntersection(isA, isB, isC);

			expectTypeOf(actual).toEqualTypeOf<IntersectionTypeGuard<[A, B, C]>>();
			expectTypeOf(actual).toExtend<TypeGuard<A & B & C>>();
		});

		it("should return TypeGuard<A & (B | C)>", () => {
			const actual = isIntersection(isA, isUnion(isB, isC));

			expectTypeOf(actual).toEqualTypeOf<IntersectionTypeGuard<[A, B | C]>>();
			expectTypeOf(actual).toExtend<TypeGuard<A & (B | C)>>();
		});

		it("should return TypeGuard<A & B>", () => {
			const actual = isIntersection(isA, isB, isA);

			expectTypeOf(actual).toEqualTypeOf<IntersectionTypeGuard<[A, B, A]>>();
			expectTypeOf(actual).not.toEqualTypeOf<IntersectionTypeGuard<[A, B]>>();
			expectTypeOf(actual).toExtend<TypeGuard<A & B>>();
		});

		it("should handle optional items", () => {
			type Actual = ReturnType<typeof isIntersection<[A, B?]>>;

			expectTypeOf<Actual>().toEqualTypeOf<IntersectionTypeGuard<[A, B?]>>();
			expectTypeOf<Actual>().toExtend<TypeGuard<A & (B | undefined)>>();
		});

		it("should have .guards that is of type TypeGuard<[TypeGuard<A>, TypeGuard<B>]>", () => {
			const actual = isIntersection(isA, isB);

			expectTypeOf(actual.guards).toEqualTypeOf<[TypeGuard<A>, TypeGuard<B>]>();
		});
	});

	describe("parameters", () => {
		it("should make optional items required", () => {
			type Actual = Parameters<typeof isIntersection<[A?]>>;
			type Expected = [TypeGuard<A | undefined>];

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});
	});
});

describe("isLazy", () => {
	type A = { a: number };

	const isA = isType<A>({ a: isNumber });

	describe("return type", () => {
		it("should return TypeGuard<A>", () => {
			const actual = isLazy(() => isA);

			expectTypeOf(actual).toEqualTypeOf<LazyTypeGuard<A>>();
			expectTypeOf(actual).toExtend<TypeGuard<A>>();
		});

		it("should have .generator that is of type TypeGuard<() => TypeGuard<T>>", () => {
			const generator = () => isString;
			const actual = isLazy(generator);

			expectTypeOf(actual.generator).toEqualTypeOf<() => TypeGuard<string>>();
		});
	});

	describe("parameters", () => {
		it("should accept a generator function that returns TypeGuard<A>", () => {
			type Actual = Parameters<typeof isLazy<A>>;
			type Expected = [() => TypeGuard<A>];

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});
	});
});

describe("isLiteral", () => {
	describe("return type", () => {
		it("should return TypeGuard<12>", () => {
			const actual = isLiteral(12);

			expectTypeOf(actual).toEqualTypeOf<LiteralTypeGuard<readonly [12]>>();
			expectTypeOf(actual).toExtend<TypeGuard<12>>();
		});

		it("should return TypeGuard<12 | false>", () => {
			const actual = isLiteral(12, false);

			expectTypeOf(actual).toEqualTypeOf<LiteralTypeGuard<readonly [12, false]>>();
			expectTypeOf(actual).not.toEqualTypeOf<LiteralTypeGuard<readonly [false, 12]>>();
			expectTypeOf(actual).toExtend<TypeGuard<12 | false>>();
		});

		it("should have .values that is of type TypeGuard<readonly [12, true]>", () => {
			const actual = isLiteral(12, true);

			expectTypeOf(actual.values).toEqualTypeOf<readonly [12, true]>();
		});
	});

	describe("parameters", () => {
		it("should accept a string", () => {
			isLiteral("Accept me");
		});

		it("should accept a number", () => {
			isLiteral(12);
		});

		it("should accept a bigint", () => {
			isLiteral(235385793857938578395794n);
		});

		it("should accept a boolean", () => {
			isLiteral(true);
		});

		it("should accept null", () => {
			isLiteral(null);
		});

		it("should accept undefined", () => {
			isLiteral(undefined);
		});

		it("should accept multiple literals", () => {
			isLiteral(null, false);
		});

		it("should not accept some values being non literals", () => {
			isLiteral(
				null,
				false,
				// @ts-expect-error
				new Date(),
			);
		});

		it("should not accept a symbol", () => {
			isLiteral(
				// @ts-expect-error
				Symbol("I'm not accepted so I'm very sad🥲"),
			);
		});

		it("should not accept a Date", () => {
			isLiteral(
				// @ts-expect-error
				new Date(),
			);
		});

		it("should not accept a class", () => {
			class Example {}
			isLiteral(
				// @ts-expect-error
				Example,
			);
		});

		it("should not accept an array", () => {
			isLiteral(
				// @ts-expect-error
				[1, 4],
			);
		});

		it("should not accept a function", () => {
			isLiteral(
				// @ts-expect-error
				() => 45,
			);
		});
	});
});

describe("isMap", () => {
	describe("return type", () => {
		it("should return TypeGuard<Map<K, V>>", () => {
			const actual = isMap(isNumber, isBoolean);

			expectTypeOf(actual).toEqualTypeOf<MapTypeGuard<number, boolean>>();
			expectTypeOf(actual).toExtend<TypeGuard<Map<number, boolean>>>();
		});

		it("should have .isKey that is of type TypeGuard<K>", () => {
			const actual = isMap(isBoolean, isString);

			expectTypeOf(actual.isKey).toEqualTypeOf<TypeGuard<boolean>>();
		});

		it("should have .isValue that is of type TypeGuard<V>", () => {
			const actual = isMap(isBoolean, isString);

			expectTypeOf(actual.isValue).toEqualTypeOf<TypeGuard<string>>();
		});
	});
});

describe("isMaybe", () => {
	describe("return type", () => {
		it("should return TypeGuard<T | null>", () => {
			const actual = isMaybe(isDate);

			expectTypeOf(actual).toEqualTypeOf<TypeGuard<Date | null>>();
		});
	});
});

describe("isOptional", () => {
	describe("return type", () => {
		it("should return TypeGuard<T | undefined>", () => {
			const actual = isOptional(isString);

			expectTypeOf(actual).toEqualTypeOf<TypeGuard<string | undefined>>();
		});
	});
});

describe("isSet", () => {
	describe("return type", () => {
		it("should return TypeGuard<Set<T>>", () => {
			const actual = isSet(isString);

			expectTypeOf(actual).toEqualTypeOf<SetTypeGuard<string>>();
			expectTypeOf(actual).toExtend<TypeGuard<Set<string>>>();
		});

		it("should have .isValue that is of type TypeGuard<string>", () => {
			const actual = isSet(isDate);

			expectTypeOf(actual.isValue).toEqualTypeOf<TypeGuard<Date>>();
		});
	});
});

describe("isRecord", () => {
	describe("return type", () => {
		it("should return TypeGuard<Record<'a' | 'b', number>>", () => {
			const actual = isRecord(["a", "b"], isNumber);
			type Expected = TypeGuard<Record<"a" | "b", number>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should not match when there are missing keys", () => {
			const actual = isRecord(["a"], isNumber);
			type Expected = TypeGuard<Record<"a" | "b", number>>;

			expectTypeOf(actual).not.toExtend<Expected>();
		});

		it("should not match when there are too many keys", () => {
			const actual = isRecord(["a", "b", "c"], isNumber);
			type Expected = TypeGuard<Record<"a" | "b", number>>;

			expectTypeOf(actual).not.toExtend<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept readonly keys", () => {
			const keys = ["a", "b"] as const;
			const actual = isRecord(keys, isDate);
			type Expected = TypeGuard<Record<"a" | "b", Date>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept string, number or symbol as keys", () => {
			const symbol = Symbol();
			const actual = isRecord(["a", 56, symbol], isNull);
			type Expected = TypeGuard<Record<"a" | 56 | typeof symbol, null>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept empty array as keys", () => {
			const actual = isRecord([], isNumber);
			type Expected = TypeGuard<Record<never, number>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>;
		});

		it("should not accept Date as key", () => {
			isRecord(
				// @ts-expect-error
				[new Date()],
				isNull,
			);
		});
	});
});

describe("isPartialRecord", () => {
	describe("return type", () => {
		it("should return TypeGuard<Partial<Record<'a' | 'b', number>>>", () => {
			const actual = isPartialRecord(["a", "b"], isNumber);
			type Expected = TypeGuard<Partial<Record<"a" | "b", number>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should not match when there are missing keys", () => {
			const actual = isPartialRecord(["a"], isNumber);
			type Expected = TypeGuard<Partial<Record<"a" | "b", number>>>;

			expectTypeOf(actual).not.toExtend<Expected>();
		});

		it("should not match when there are too many keys", () => {
			const actual = isPartialRecord(["a", "b", "c"], isNumber);
			type Expected = TypeGuard<Partial<Record<"a" | "b", number>>>;

			expectTypeOf(actual).not.toExtend<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept readonly keys", () => {
			const keys = ["readonly", "keys"] as const;
			const actual = isPartialRecord(keys, isBoolean);
			type Expected = TypeGuard<Partial<Record<"readonly" | "keys", boolean>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept string, number or symbol as keys", () => {
			const symbol = Symbol();
			const actual = isPartialRecord(["a", 56, symbol], isUndefined);
			type Expected = TypeGuard<Partial<Record<"a" | 56 | typeof symbol, undefined>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept empty array as keys", () => {
			const actual = isPartialRecord([], isNumber);
			type Expected = TypeGuard<Partial<Record<never, number>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>;
		});

		it("should not accept Date as key", () => {
			isPartialRecord(
				// @ts-expect-error
				[new Date()],
				isNil,
			);
		});
	});
});

describe("isIndexRecord", () => {
	describe("return type", () => {
		it("should return Record<PropertyKey, number>", () => {
			const actual = isIndexRecord(isNumber);
			type Expected = TypeGuard<Record<PropertyKey, number>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept different key types", () => {
			const actual = isIndexRecord<string>(isString);
			type Expected = TypeGuard<Record<PropertyKey, string>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});
	});
});

describe("isRefine", () => {
	describe("return type", () => {
		it("should return TypeGuard<Farewell>", () => {
			type Farewell = `Bye ${string}`;
			const actual = isRefine(isString, (value): value is Farewell => true);

			expectTypeOf(actual).toEqualTypeOf<RefineTypeGuard<string, Farewell>>();
			expectTypeOf(actual).toExtend<TypeGuard<Farewell>>();
		});

		it("should have .isBase that is of type TypeGuard<string>", () => {
			type Farewell = `Bye ${string}`;
			const actual = isRefine(isString, (value): value is Farewell => true);

			expectTypeOf(actual.isBase).toEqualTypeOf<TypeGuard<string>>();
		});

		it("should have .refinement that is of type (value: string) => value is Farewell", () => {
			type Farewell = `Bye ${string}`;
			const actual = isRefine(isString, (value): value is Farewell => true);

			expectTypeOf(actual.refinement).toEqualTypeOf<(value: string) => value is Farewell>();
		});
	});

	describe("parameters", () => {
		it("should accept TypeGuard as a first parameter", () => {
			expectTypeOf(isRefine<string, `Hi ${string}`>).parameter(0).toEqualTypeOf<TypeGuard<string>>();
		});

		it("should accept a typescript type guard as a second argument", () => {
			expectTypeOf(isRefine<boolean, true>).parameter(1).toEqualTypeOf<(value: boolean) => value is true>;
		});
	});
});

describe("isTuple", () => {
	describe("return type", () => {
		it("should return TypeGuard<Row>", () => {
			type Row = [number, string];
			const actual = isTuple<Row>([isNumber, isString]);
			type Expected = TypeGuard<Row>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept readonly tuples", () => {
			type Tuple = readonly [number, undefined];
			const actual = isTuple<Tuple>([isNumber, isUndefined]);
			type Expected = TypeGuard<Tuple>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should not accept a number", () => {
			isTuple(
				// @ts-expect-error
				12,
			);
		});

		it("should not accept number as a generic argument", () => {
			isTuple<
				// @ts-expect-error
				number
			>;
		});

		it("should not accept a string", () => {
			isTuple(
				// @ts-expect-error
				"Don't accept me",
			);
		});

		it("should not accept string as a generic argument", () => {
			isTuple<
				// @ts-expect-error
				string
			>;
		});

		it("should not accept boolean", () => {
			isTuple(
				// @ts-expect-error
				false,
			);
		});

		it("should not accept boolean as a generic argument", () => {
			isTuple<
				// @ts-expect-error
				boolean
			>;
		});

		it("should not accept undefined", () => {
			isTuple(
				// @ts-expect-error
				undefined,
			);
		});

		it("should not accept undefined as a generic argument", () => {
			isTuple<
				// @ts-expect-error
				undefined
			>;
		});

		it("should not accept null", () => {
			isTuple(
				// @ts-expect-error
				null,
			);
		});

		it("should not accept null as a generic argument", () => {
			isTuple<
				// @ts-expect-error
				null
			>;
		});
	});
});

describe("isType", () => {
	type A = { a: number };

	describe("return type", () => {
		it("should return TypeGuard<A>", () => {
			const actual = isType<A>({ a: isNumber });
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should omit non index for tuples", () => {
			const actual = isType([isNumber, isString]);
			type Actual = Guarded<typeof actual>;
			type Expected = { 0: number; 1: string };

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept classes", () => {
			class Example {}
			isType<Example>;
		});

		it("should accept tuples", () => {
			isType([isNumber, isString]);
		});

		it("should not accept a number", () => {
			isType(
				// @ts-expect-error
				12,
			);
		});

		it("should not accept number as a generic argument", () => {
			isType<
				// @ts-expect-error
				number
			>;
		});

		it("should not accept a string", () => {
			isType(
				// @ts-expect-error
				"Don't accept me",
			);
		});

		it("should not accept string as a generic argument", () => {
			isType<
				// @ts-expect-error
				string
			>;
		});

		it("should not accept boolean", () => {
			isType(
				// @ts-expect-error
				false,
			);
		});

		it("should not accept boolean as a generic argument", () => {
			isType<
				// @ts-expect-error
				boolean
			>;
		});

		it("should not accept undefined", () => {
			isType(
				// @ts-expect-error
				undefined,
			);
		});

		it("should not accept undefined as a generic argument", () => {
			isType<
				// @ts-expect-error
				undefined
			>;
		});

		it("should not accept null", () => {
			isType(
				// @ts-expect-error
				null,
			);
		});

		it("should not accept null as a generic argument", () => {
			isType<
				// @ts-expect-error
				null
			>;
		});
	});
});

describe("isUnion", () => {
	type A = { a: number };
	type B = { b: number };
	type C = { c: number };

	const isA = isType<A>({ a: isNumber });
	const isB = isType<B>({ b: isNumber });
	const isC = isType<C>({ c: isNumber });

	describe("return type", () => {
		it("should return TypeGuard<never>", () => {
			const actual = isUnion();
			type Expected = TypeGuard<never>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A>", () => {
			const actual = isUnion(isA);
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | B>", () => {
			const actual = isUnion(isA, isB);
			type Expected = TypeGuard<A | B>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | B | C>", () => {
			const actual = isUnion(isA, isB, isC);
			type Expected = TypeGuard<A | B | C>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | (B & C)>", () => {
			const actual = isUnion(isA, isIntersection(isB, isC));
			type Expected = TypeGuard<A | (B & C)>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | B>", () => {
			const actual = isUnion(isA, isB, isA);
			type Expected = TypeGuard<A | B>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should handle optional items", () => {
			type Actual = ReturnType<typeof isUnion<[A, B?]>>;
			type Expected = TypeGuard<A | B | undefined>;

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});
	});

	describe("parameters", () => {
		it("should make optional items required", () => {
			type Actual = Parameters<typeof isUnion<[A?]>>;
			type Expected = [TypeGuard<A | undefined>];

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});
	});
});

describe("is util types", () => {
	test("isTrue should be TypeGuard<true>", () => {
		expectTypeOf(isTrue).toEqualTypeOf<TypeGuard<true>>();
	});

	test("isFalse should be TypeGuard<false>", () => {
		expectTypeOf(isFalse).toEqualTypeOf<TypeGuard<false>>();
	});

	test("isNull should be TypeGuard<null>", () => {
		expectTypeOf(isNull).toEqualTypeOf<TypeGuard<null>>();
	});

	test("isUndefined should be TypeGuard<undefined>", () => {
		expectTypeOf(isUndefined).toEqualTypeOf<TypeGuard<undefined>>();
	});

	test("isNil should be TypeGuard<null | undefined>", () => {
		expectTypeOf(isNil).toEqualTypeOf<TypeGuard<null | undefined>>();
	});

	test("isNumber should be TypeGuard<number>", () => {
		expectTypeOf(isNumber).toEqualTypeOf<TypeGuard<number>>();
	});

	test("isString should be TypeGuard<string>", () => {
		expectTypeOf(isString).toEqualTypeOf<TypeGuard<string>>();
	});

	test("isBoolean should be TypeGuard<boolean>", () => {
		expectTypeOf(isBoolean).toEqualTypeOf<TypeGuard<boolean>>();
	});

	test("isSymbol should be TypeGuard<symbol>", () => {
		expectTypeOf(isSymbol).toEqualTypeOf<TypeGuard<symbol>>();
	});

	test("isFunction should be TypeGuard<Function>", () => {
		expectTypeOf(isFunction).toEqualTypeOf<TypeGuard<Function>>();
	});

	test("isPropertyKey should be TypeGuard<PropertyKey>", () => {
		expectTypeOf(isPropertyKey).toEqualTypeOf<TypeGuard<PropertyKey>>();
	});

	test("isDate should be TypeGuard<Date>", () => {
		expectTypeOf(isDate).toEqualTypeOf<TypeGuard<Date>>();
	});

	test("isRegexp should be TypeGuard<RegExp>", () => {
		expectTypeOf(isRegExp).toEqualTypeOf<TypeGuard<RegExp>>();
	});

	test("isError should be TypeGuard<Error>", () => {
		expectTypeOf(isError).toEqualTypeOf<TypeGuard<Error>>();
	});

	test("isEvalError should be TypeGuard<EvalError>", () => {
		expectTypeOf(isEvalError).toEqualTypeOf<TypeGuard<EvalError>>();
	});

	test("isRangeError should be TypeGuard<RangeError>", () => {
		expectTypeOf(isRangeError).toEqualTypeOf<TypeGuard<RangeError>>();
	});

	test("isReferenceError should be TypeGuard<ReferenceError>", () => {
		expectTypeOf(isReferenceError).toEqualTypeOf<TypeGuard<ReferenceError>>();
	});

	test("isSyntaxError should be TypeGuard<SyntaxError>", () => {
		expectTypeOf(isSyntaxError).toEqualTypeOf<TypeGuard<SyntaxError>>();
	});

	test("isTypeError should be TypeGuard<TypeError>", () => {
		expectTypeOf(isTypeError).toEqualTypeOf<TypeGuard<TypeError>>();
	});

	test("isURIError should be TypeGuard<URIError>", () => {
		expectTypeOf(isURIError).toEqualTypeOf<TypeGuard<URIError>>();
	});

	test("isObject should be TypeGuard<object>", () => {
		expectTypeOf(isObject).toEqualTypeOf<TypeGuard<object>>();
	});

	test("isNumberArray should be TypeGuard<number[]>", () => {
		expectTypeOf(isNumberArray).toExtend<TypeGuard<number[]>>();
	});

	test("isStringArray should be TypeGuard<string[]>", () => {
		expectTypeOf(isStringArray).toExtend<TypeGuard<string[]>>();
	});

	test("isBooleanArray should be TypeGuard<boolean[]>", () => {
		expectTypeOf(isBooleanArray).toExtend<TypeGuard<boolean[]>>();
	});

	test("isDateArray should be TypeGuard<Date[]>", () => {
		expectTypeOf(isDateArray).toExtend<TypeGuard<Date[]>>();
	});

	test("isOptionalNumber should be TypeGuard<number | undefined>", () => {
		expectTypeOf(isOptionalNumber).toEqualTypeOf<TypeGuard<number | undefined>>();
	});

	test("isOptionalString should be TypeGuard<string | undefined>", () => {
		expectTypeOf(isOptionalString).toEqualTypeOf<TypeGuard<string | undefined>>();
	});

	test("isOptionalBoolean should be TypeGuard<boolean | undefined>", () => {
		expectTypeOf(isOptionalBoolean).toEqualTypeOf<TypeGuard<boolean | undefined>>();
	});

	test("isOptionalDate should be TypeGuard<Date | undefined>", () => {
		expectTypeOf(isOptionalDate).toEqualTypeOf<TypeGuard<Date | undefined>>();
	});

	test("isMaybeNumber should be TypeGuard<number | null>", () => {
		expectTypeOf(isMaybeNumber).toEqualTypeOf<TypeGuard<number | null>>();
	});

	test("isMaybeString should be TypeGuard<string | null>", () => {
		expectTypeOf(isMaybeString).toEqualTypeOf<TypeGuard<string | null>>();
	});

	test("isMaybeBoolean should be TypeGuard<boolean | null>", () => {
		expectTypeOf(isMaybeBoolean).toEqualTypeOf<TypeGuard<boolean | null>>();
	});

	test("isMaybeDate should be TypeGuard<Date | null>", () => {
		expectTypeOf(isMaybeDate).toEqualTypeOf<TypeGuard<Date | null>>();
	});

	test("isUnknown should be TypeGuard<unknown>", () => {
		expectTypeOf(isUnknown).toEqualTypeOf<TypeGuard<unknown>>();
	});

	test("isNever should be TypeGuard<never>", () => {
		expectTypeOf(isNever).toEqualTypeOf<TypeGuard<never>>();
	});
});
