import { describe, it, expectTypeOf, test } from "vitest";
import { Guarded, isArray, isBoolean, isBooleanArray, isDate, isDateArray, isEnum, isFunction, isIndexRecord, isInstanceof, isIntersection, isMaybeBoolean, isMaybeDate, isMaybeNumber, isMaybeString, isNil, isNull, isNumber, isNumberArray, isObject, isOptionalDate, isOptionalBoolean, isOptionalNumber, isOptionalString, isRecord, isString, isStringArray, isType, isUndefined, isUnion, isValue, isValueUnion, TypeGuard, TypeGuardTemplate, TypeGuardTemplateFunction, isUnknown, isNever, isTrue, isFalse, isMap, isSet } from "../src";

describe("TypeGuard type", () => {
	it("should be exactly equal", () => {
		type Actual = TypeGuard<number>;
		type Expected = TypeGuard<number>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should not match derived types", () => {
		type Actual = TypeGuard<number>;
		type Expected = TypeGuard<number | undefined>;

		expectTypeOf<Actual>().not.toMatchTypeOf<Expected>();
	});

	it("should not match base types", () => {
		type Actual = TypeGuard<number | undefined>;
		type Expected = TypeGuard<number>;

		expectTypeOf<Actual>().not.toMatchTypeOf<Expected>();
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
		type A = { a: string };
		type B = A & { b: number };
		type Actual = TypeGuardTemplate<A>;
		type Expected = TypeGuardTemplate<B>;

		expectTypeOf<Actual>().not.toMatchTypeOf<Expected>();
	});

	it("should not match base types", () => {
		type A = { a: string };
		type B = A & { b: number };
		type Actual = TypeGuardTemplate<B>;
		type Expected = TypeGuardTemplate<A>;

		expectTypeOf<Actual>().not.toMatchTypeOf<Expected>();
	});
});

describe("TypeGuardTemplateFunction type", () => {
	it("should not match derived types", () => {
		type A = { a: string };
		type B = A & { b: number };
		type Actual = TypeGuardTemplateFunction<A>;
		type Expected = TypeGuardTemplateFunction<B>;

		expectTypeOf<Actual>().not.toMatchTypeOf<Expected>();
	});

	it("should not match base types", () => {
		type A = { a: string };
		type B = A & { b: number };
		type Actual = TypeGuardTemplateFunction<B>;
		type Expected = TypeGuardTemplateFunction<A>;

		expectTypeOf<Actual>().not.toMatchTypeOf<Expected>();
	});
});

describe("isArray return type", () => {
	it("should return TypeGuard<T[]>", () => {
		const actual = isArray(isNumber);
		type Expected = TypeGuard<number[]>;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});
});

describe("isEnum", () => {
	enum Example {
		field,
	}

	describe("return type", () => {
		it("should return TypeGuard<T>", () => {
			const actual = isEnum(Example);
			type Expected = TypeGuard<typeof Example>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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

describe("isInstanceof return type", () => {
	it("should return TypeGuard<T>", () => {
		class Example { }
		const actual = isInstanceof(Example);
		type Expected = TypeGuard<Example>;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});

	it("should accept abstract class", () => {
		abstract class Example { }
		const actual = isInstanceof(Example);
		type Expected = TypeGuard<Example>;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});
});

describe("isIntersection", () => {
	type A = { a: number };
	type B = { b: number };
	type C = { c: number };

	describe("return type", () => {
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

	describe("parameters", () => {
		it("should make optional items required", () => {
			type Actual = Parameters<typeof isIntersection<[A?]>>;
			type Expected = [TypeGuard<A | undefined>];

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});
	});
});

describe("isMap", () => {
	describe("return type", () => {
		it("should return TypeGuard<Map<K, V>>", () => {
			const actual = isMap(isNumber, isBoolean);
			type Expected = TypeGuard<Map<number, boolean>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});
	});
});

describe("isSet", () => {
	describe("return type", () => {
		it("should return TypeGuard<Set<T>>", () => {
			const actual = isSet(isString);
			type Expected = TypeGuard<Set<string>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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
	});

	describe("parameters", () => {
		it("should accept readonly keys", () => {
			const keys = ["a", "b"] as const;
			const actual = isRecord(keys, isDate);
			type Expected = TypeGuard<Record<"a" | "b", Date>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept string or number as keys", () => {
			const actual = isRecord(["a", 56], isNull);
			type Expected = TypeGuard<Record<"a" | 56, null>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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
			const actual = isIndexRecord<number, string>(isString);
			type Expected = TypeGuard<Record<number, string>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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
	});

	describe("parameters", () => {
		it("should not accept arrays", () => {
			isType(
				// @ts-expect-error
				[isNumber, isString],
			);
		});
	});
});

describe("isUnion", () => {
	type A = { a: number };
	type B = { b: number };
	type C = { c: number };

	describe("return type", () => {
		it("should return TypeGuard<A>", () => {
			type Actual = ReturnType<typeof isUnion<[A]>>;
			type Expected = TypeGuard<A>;

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | B>", () => {
			type Actual = ReturnType<typeof isUnion<[A, B]>>;
			type Expected = TypeGuard<A | B>;

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | B | C>", () => {
			type Actual = ReturnType<typeof isUnion<[A, B, C]>>;
			type Expected = TypeGuard<A | B | C>;

			expectTypeOf<Actual>().toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A | (B & C)>", () => {
			type Actual = ReturnType<typeof isUnion<[A, B & C]>>;
			type Expected = TypeGuard<A | (B & C)>;

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

describe("isValue return type", () => {
	it("should narrow generic type", () => {
		const actual = isValue("hello");
		type Expected = TypeGuard<"hello">;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});
});

describe("isValueUnion return type", () => {
	it("should return TypeGuard<1 | 2>", () => {
		const actual = isValueUnion(1, 2);
		type Expected = TypeGuard<1 | 2>;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});

	it("should return TypeGuard<1 | 'Hello'>", () => {
		const actual = isValueUnion(1, 'Hello');
		type Expected = TypeGuard<1 | 'Hello'>;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});
});

describe("util types", () => {
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

	test("isFunction should be TypeGuard<Function>", () => {
		expectTypeOf(isFunction).toEqualTypeOf<TypeGuard<Function>>();
	});

	test("isDate should be TypeGuard<Date>", () => {
		expectTypeOf(isDate).toEqualTypeOf<TypeGuard<Date>>();
	});

	test("isObject should be TypeGuard<Object>", () => {
		expectTypeOf(isObject).toEqualTypeOf<TypeGuard<Object>>();
	});

	test("isNumberArray should be TypeGuard<number[]>", () => {
		expectTypeOf(isNumberArray).toEqualTypeOf<TypeGuard<number[]>>();
	});

	test("isStringArray should be TypeGuard<string[]>", () => {
		expectTypeOf(isStringArray).toEqualTypeOf<TypeGuard<string[]>>();
	});

	test("isBooleanArray should be TypeGuard<boolean[]>", () => {
		expectTypeOf(isBooleanArray).toEqualTypeOf<TypeGuard<boolean[]>>();
	});

	test("isDateArray should be TypeGuard<Date[]>", () => {
		expectTypeOf(isDateArray).toEqualTypeOf<TypeGuard<Date[]>>();
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
