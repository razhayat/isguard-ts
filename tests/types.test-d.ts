import { describe, it, expectTypeOf, test } from "vitest";
import { Guarded, isArray, isBoolean, isBooleanArray, isDate, isDateArray, isEnum, isFunction, isIndexRecord, isInstanceof, isIntersection, isMaybeBoolean, isMaybeDate, isMaybeNumber, isMaybeString, isNil, isNull, isNumber, isNumberArray, isObject, isOptionalDate, isOptionalBoolean, isOptionalNumber, isOptionalString, isString, isStringArray, isType, isUndefined, isUnion, isValue, isValueUnion, TypeGuard, TypeGuardTemplate, TypeGuardTemplateFunction, isUnknown, isNever, isTrue, isFalse, isMap, isSet, isRecord, isPartialRecord, isTuple, isSymbol, isPropertyKey, isError, isEvalError, isRangeError, isReferenceError, isSyntaxError, isTypeError, isURIError, TypeGuardTemplateParameter, isRecursive, isRegExp, isLazy, isLiteral } from "../src";

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

	it("should not match mutually assignable types", () => {
		type Type1 = { name: string };
		type Type2 = Type1 & { age?: number };

		expectTypeOf<Type1>().toMatchTypeOf<Type2>();
		expectTypeOf<Type2>().toMatchTypeOf<Type1>();
		expectTypeOf<TypeGuard<Type1>>().not.toMatchTypeOf<TypeGuard<Type2>>();
		expectTypeOf<TypeGuard<Type2>>().not.toMatchTypeOf<TypeGuard<Type1>>();
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

	it("should not match mutually assignable types", () => {
		type Type1 = { name?: string };
		type Type2 = Type1 & { age?: number };

		expectTypeOf<Type1>().toMatchTypeOf<Type2>();
		expectTypeOf<Type2>().toMatchTypeOf<Type1>();
		expectTypeOf<TypeGuardTemplate<Type1>>().not.toMatchTypeOf<TypeGuardTemplate<Type2>>();
		expectTypeOf<TypeGuardTemplate<Type2>>().not.toMatchTypeOf<TypeGuardTemplate<Type1>>();
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

	it("should not match mutually assignable types", () => {
		type Type1 = { name?: string; birth: Date };
		type Type2 = Type1 & { age?: number; };

		expectTypeOf<Type1>().toMatchTypeOf<Type2>();
		expectTypeOf<Type2>().toMatchTypeOf<Type1>();
		expectTypeOf<TypeGuardTemplateFunction<Type1>>().not.toMatchTypeOf<TypeGuardTemplateFunction<Type2>>();
		expectTypeOf<TypeGuardTemplateFunction<Type2>>().not.toMatchTypeOf<TypeGuardTemplateFunction<Type1>>();
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

	it("should not match mutually assignable types", () => {
		type Type1 = {};
		type Type2 = { age?: number };

		expectTypeOf<Type1>().toMatchTypeOf<Type2>();
		expectTypeOf<Type2>().toMatchTypeOf<Type1>();
		expectTypeOf<TypeGuardTemplateParameter<Type1>>().not.toMatchTypeOf<TypeGuardTemplateParameter<Type2>>();
		expectTypeOf<TypeGuardTemplateParameter<Type2>>().not.toMatchTypeOf<TypeGuardTemplateParameter<Type1>>();
	});
});

describe("isArray return type", () => {
	it("should return TypeGuard<number[]>", () => {
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

	const isA = isType<A>({ a: isNumber });
	const isB = isType<B>({ b: isNumber });
	const isC = isType<C>({ c: isNumber });

	describe("return type", () => {
		it("should return TypeGuard<unknown>", () => {
			const actual = isIntersection();
			type Expected = TypeGuard<unknown>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A>", () => {
			const actual = isIntersection(isA);
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A & B>", () => {
			const actual = isIntersection(isA, isB);
			type Expected = TypeGuard<A & B>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A & B & C>", () => {
			const actual = isIntersection(isA, isB, isC);
			type Expected = TypeGuard<A & B & C>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A & (B | C)>", () => {
			const actual = isIntersection(isA, isUnion(isB, isC));
			type Expected = TypeGuard<A & (B | C)>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<A & B>", () => {
			const actual = isIntersection(isA, isB, isA);
			type Expected = TypeGuard<A & B>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should handle optional items", () => {
			type Actual = ReturnType<typeof isIntersection<[A, B?]>>;
			type Expected = TypeGuard<A & (B | undefined)>;

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

describe("isLazy", () => {
	type A = { a: number };

	const isA = isType<A>({ a: isNumber });

	describe("return type", () => {
		it("should return TypeGuard<A>", () => {
			const actual = isLazy(() => isA);
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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
			type Expected = TypeGuard<12>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should return TypeGuard<12 | false>", () => {
			const actual = isLiteral(12, false);
			type Expected = TypeGuard<12 | false>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
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

		it("should not match when there are missing keys", () => {
			const actual = isRecord(["a"], isNumber);
			type Expected = TypeGuard<Record<"a" | "b", number>>;

			expectTypeOf(actual).not.toMatchTypeOf<Expected>();
		});

		it("should not match when there are too many keys", () => {
			const actual = isRecord(["a", "b", "c"], isNumber);
			type Expected = TypeGuard<Record<"a" | "b", number>>;

			expectTypeOf(actual).not.toMatchTypeOf<Expected>();
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

		it("should not accept empty array as keys", () => {
			isRecord(
				// @ts-expect-error
				[],
				isNumber,
			);
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

			expectTypeOf(actual).not.toMatchTypeOf<Expected>();
		});

		it("should not match when there are too many keys", () => {
			const actual = isPartialRecord(["a", "b", "c"], isNumber);
			type Expected = TypeGuard<Partial<Record<"a" | "b", number>>>;

			expectTypeOf(actual).not.toMatchTypeOf<Expected>();
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

		it("should not accept empty array as keys", () => {
			isPartialRecord(
				// @ts-expect-error
				[],
				isNumber,
			);
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

describe("isRecursive", () => {
	describe("return type", () => {
		it("should return TypeGuard<T>", () => {
			type T = number | string | boolean | T[];

			const actual = isRecursive<T>(isT => isUnion(
				isNumber,
				isString,
				isBoolean,
				isArray(isT),
			));
			type Expected = TypeGuard<T>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});
	});

	describe("parameters", () => {
		it("should accept a function that has a parameter of type TypeGuard<T>", () => {
			type T = { a?: T };
			type Parameter = Parameters<Parameters<typeof isRecursive<T>>[0]>[0];

			expectTypeOf<Parameter>().toEqualTypeOf<TypeGuard<T>>();
		});

		it("should accept a function that returns TypeGuard<T>", () => {
			type T = [number, T?];
			type Return = ReturnType<Parameters<typeof isRecursive<T>>[0]>;

			expectTypeOf<Return>().toEqualTypeOf<TypeGuard<T>>();
		});

		it("should accept a type that is not recursive", () => {
			type NotRecursive = { a: string };
			const actual = isRecursive<NotRecursive>(() => isType({ a: isString }));
			type Expected = TypeGuard<NotRecursive>;

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
			const actual = isTuple<[string]>((_) => [isString]);
			type Expected = TypeGuard<[string]>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a nested function", () => {
			const actual = isTuple<[number]>((_) => () => [isNumber]);
			type Expected = TypeGuard<[number]>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a deeply nested function", () => {
			const actual = isTuple<[number | undefined]>((_) => () => () => [isOptionalNumber]);
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
	type A = { a: number };

	describe("return type", () => {
		it("should return TypeGuard<A>", () => {
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
			const actual = isType<A>(() => ({ a: isNumber }));
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a nested function", () => {
			const actual = isType<A>(() => () => ({ a: isNumber }));
			type Expected = TypeGuard<A>;

			expectTypeOf(actual).toEqualTypeOf<Expected>();
		});

		it("should accept a deeply nested function", () => {
			const actual = isType<A>(() => () => () => ({ a: isNumber }));
			type Expected = TypeGuard<A>;

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
