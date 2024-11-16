import { describe, it, expectTypeOf, test } from "vitest";
import { Guarded, isArray, isBoolean, isBooleanArray, isDate, isDateArray, isEnum, isFunction, isIndexRecord, isInstanceof, isIntersection, isMaybeBoolean, isMaybeDate, isMaybeNumber, isMaybeString, isNil, isNull, isNumber, isNumberArray, isObject, isOptionalDate, isOptionalBoolean, isOptionalNumber, isOptionalString, isString, isStringArray, isType, isUndefined, isUnion, isValue, isValueUnion, TypeGuard, TypeGuardTemplate, TypeGuardTemplateFunction, isUnknown, isNever, isTrue, isFalse, isMap, isSet, isRecord, isPartialRecord, isTuple, isSymbol } from "../src";

describe("TypeGuard type", () => {
	it("should be exactly equal", () => {
		type Actual = TypeGuard<number>;
		type Expected = TypeGuard<number>;

		expectTypeOf<Actual>().toEqualTypeOf<Expected>();
	});

	it("should not match derived types", () => {
		type Base = TypeGuard<number>;
		type Derived = TypeGuard<number | undefined>;

		expectTypeOf<Base>().not.toMatchTypeOf<Derived>();
	});

	it("should not match base types", () => {
		type Derived = TypeGuard<number | undefined>;
		type Base = TypeGuard<number>;

		expectTypeOf<Derived>().not.toMatchTypeOf<Base>();
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
		type Base = { a: string };
		type Derived = Base & { b: number };
		type BaseTemplate = TypeGuardTemplate<Base>;
		type DerivedTemplate = TypeGuardTemplate<Derived>;

		expectTypeOf<BaseTemplate>().not.toMatchTypeOf<DerivedTemplate>();
	});

	it("should not match base types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type DerivedTemplate = TypeGuardTemplate<Derived>;
		type BaseTemplate = TypeGuardTemplate<Base>;

		expectTypeOf<DerivedTemplate>().not.toMatchTypeOf<BaseTemplate>();
	});
});

describe("TypeGuardTemplateFunction type", () => {
	it("should not match derived types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type TemplateBase = TypeGuardTemplateFunction<Base>;
		type TemplateDerived = TypeGuardTemplateFunction<Derived>;

		expectTypeOf<TemplateBase>().not.toMatchTypeOf<TemplateDerived>();
	});

	it("should not match base types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type TemplateDerived = TypeGuardTemplateFunction<Derived>;
		type TemplateBase = TypeGuardTemplateFunction<Base>;

		expectTypeOf<TemplateDerived>().not.toMatchTypeOf<TemplateBase>();
	});
});

describe("TypeGuardTemplateParameter type", () => {
	it("should not match derived types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type TemplateBase = TypeGuardTemplateParameter<Base>;
		type TemplateDerived = TypeGuardTemplateParameter<Derived>;

		expectTypeOf<TemplateBase>().not.toMatchTypeOf<TemplateDerived>();
	});

	it("should not match base types", () => {
		type Base = { a: string };
		type Derived = Base & { b: number };
		type TemplateDerived = TypeGuardTemplateParameter<Derived>;
		type TemplateBase = TypeGuardTemplateParameter<Base>;

		expectTypeOf<TemplateDerived>().not.toMatchTypeOf<TemplateBase>();
	});
});

describe("isArray return type", () => {
	it("should return TypeGuard<T[]>", () => {
		const actual = isArray(isNumber);
		type Expected = TypeGuard<number[]>;

		expectTypeOf(actual).toEqualTypeOf<Expected>();
	});

	it("should return TypeGuard<string[][]>", () => {
		const actual = isArray(isArray(isString));
		type Expected = TypeGuard<string[][]>;

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
			type Expected = TypeGuard<Example>;

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

describe("isInstanceof", () => {
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

	it("should not accept function constructor", () => {
		function Example() { }
		isInstanceof(
			// @ts-expect-error
			Example
		);
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

describe("isPartialRecord", () => {
	describe("return type", () => {
		it("should return TypeGuard<Record<'a' | 'b', number>>", () => {
			const actual = isPartialRecord(["a", "b"], isNumber);
			type Expected = TypeGuard<Partial<Record<"a" | "b", number>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept readonly keys", () => {
			const keys = ["readonly", "keys"] as const;
			const actual = isPartialRecord(keys, isBoolean);
			type Expected = TypeGuard<Partial<Record<"readonly" | "keys", boolean>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept string or number as keys", () => {
			const actual = isPartialRecord(["a", 56], isUndefined);
			type Expected = TypeGuard<Partial<Record<"a" | 56, undefined>>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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
			const actual = isIndexRecord<number, string>(isString);
			type Expected = TypeGuard<Record<number, string>>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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

		it("should accept a function", () => {
			const actual = isTuple(() => [isString]);
			type Expected = TypeGuard<[string]>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a nested function", () => {
			const actual = isTuple(() => () => [isNumber]);
			type Expected = TypeGuard<[number]>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a deeply nested function", () => {
			const actual = isTuple(() => () => () => [isOptionalNumber]);
			type Expected = TypeGuard<[number | undefined]>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a function whose parameter has the same type as its return type", () => {
			type Func = typeof isTuple<["yes"]>;
			type Return = ReturnType<Func>;
			type FunctionParam = Extract<Parameters<Func>[0], Function>;
			type Actual = Parameters<FunctionParam>[0];

			expectTypeOf<Actual>().toEqualTypeOf<Return>();
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
	describe("return type", () => {
		it("should return TypeGuard<A>", () => {
			type A = { a: number };
			const actual = isType<A>({ a: isNumber });
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should omit non index for tuples", () => {
			const actual = isType([isNumber, isString]);
			type Expected = TypeGuard<{ 0: number; 1: string }>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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

		it("should accept a function", () => {
			const actual = isType(() => ({ name: isString }));
			type Expected = TypeGuard<{ name: string }>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a nested function", () => {
			const actual = isType(() => () => ({ age: isNumber }));
			type Expected = TypeGuard<{ age: number }>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a deeply nested function", () => {
			const actual = isType(() => () => () => ({ optional: isOptionalNumber }));
			type Expected = TypeGuard<{ optional: number | undefined }>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a function whose parameter has the same type as its return type", () => {
			type Func = typeof isType<{ hot: "yes" }>;
			type Return = ReturnType<Func>;
			type FunctionParam = Extract<Parameters<Func>[0], Function>;
			type Actual = Parameters<FunctionParam>[0];

			expectTypeOf<Actual>().toEqualTypeOf<Return>();
		});

		it("should accept a function whose parameter has the same type as its return type for tuples", () => {
			type Func = typeof isType<[number, string]>;
			type Return = ReturnType<Func>;
			type FunctionParam = Extract<Parameters<Func>[0], Function>;
			type Actual = Parameters<FunctionParam>[0];

			expectTypeOf<Actual>().toEqualTypeOf<Return>();
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
