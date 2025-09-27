# isguard-ts
A powerful `typescript` library that helps you build type guards.<br/>
`isguard-ts` utilizes the `typescript` compiler to ensure the type guards are type safe and fast to create.

## Some of our built-in types
+ [TypeGuard](#type-guard)
+ [Guarded](#guarded)

## Some of our built-in helper functions
+ [isType](#is-type)
+ [isTuple](#is-tuple)
+ [isUnion](#is-union)
+ [isIntersection](#is-intersection)
+ [isArray](#is-array)
+ [isEnum](#is-enum)
+ [isSet](#is-set)
+ [isMap](#is-map)
+ [isRecord](#is-record)
+ [isPartialRecord](#is-partial-record)
+ [isIndexRecord](#is-index-record)
+ [isLazy](#is-lazy)
+ [isInstanceof](#is-instanceof)
+ [isLiteral](#is-literal)
+ [isOptional](#is-optional)
+ [isMaybe](#is-maybe)
+ [isRefine](#is-refine)

## Some of our utility type guards
+ isString, isNumber, isBoolean, isDate
+ isNull, isUndefined, isNil
+ isUnknown - always returns `true`
+ isNever - always returns `false`
+ [and more](#all-utility)

## Types

*<span id="type-guard" ></span>*
### `TypeGuard<T>`
The most basic type - represents a type guard of `T`
```typescript
type TypeGuard<T> = (value: unknown) => value is T;
```

*<span id="guarded" ></span>*
### `Guarded<T>`
Extracts `T` out of `TypeGuard<T>`
```typescript
import { Guarded, TypeGuard } from "isguard-ts";

type Extracted = Guarded<TypeGuard<number>>; // number
```

## Code Examples

*<span id="is-type" ></span>*
### `isType<T>(template): TypeGuard<T>`
Helps you create type guards for types and interfaces

> ***Best Practice:***
> Pass the generic type argument into `isType` <br/>
> Otherwise optional fields might have an unexpected behavior

```typescript
import { isType, isString, isNumber } from "isguard-ts";

type Person = {
	name: string;
	age: number;
};

const isPerson = isType<Person>({
	name: isString,
	age: isNumber,
});

isPerson({ name: "Hello", age: 6 }); // true
```

For generic types you would need to create your own `TypeGuard` generator
```typescript
import { TypeGuard, isType, isNumber } from "isguard-ts";

type ValueHolder<T> = {
	value: T;
};

const isValueHolder = <T>(isValue: TypeGuard<T>): TypeGuard<ValueHolder<T>> => {
	return isType<ValueHolder<T>>({
		value: isValue,
	});
};

const isNumberHolder: TypeGuard<ValueHolder<number>> = isValueHolder(isNumber);
```
*<span id="is-tuple" ></span>*
### `isTuple<T>(template): TypeGuard<T>`
Helps you create type guards for tuples

> ***Best Practice:***
> Pass the generic type argument into `isTuple` <br/>
> Otherwise optional fields might have an unexpected behavior

```typescript
import { isTuple, isNumber, isString } from "isguard-ts";

type Row = [number, string?];

const isRow = isTuple<Row>([isNumber, isString.optional()]);

isRow([6, "Hello"]); // true
isRow([6]); // true
isRow(["Hello", "Bye"]); // false
```

*<span id="is-union" ></span>*
### `isUnion<[T1, T2, ...]>(...guards): TypeGuard<T1 | T2 | ...>`
Helps you create type guards for unions

> ***Best Practice:***
> Add a type annotation to the result of `isUnion` <br/>
> This ensures the result is of the expected type

```typescript
import { isType, isNumber, isString, TypeGuard, isUnion } from "isguard-ts";

type A = { a: number };
type B = { b: string };
type C = A | B;

const isA = isType<A>({ a: isNumber });
const isB = isType<B>({ b: isString });

const isC: TypeGuard<C> = isUnion(isA, isB);

isC({ a: 6 }); // true
isC({ b: "Hello" }); // true
isC({ a: new Date() }); // false
```

*<span id="is-intersection" ></span>*
### `isIntersection<[T1, T2, ...]>(...guards): TypeGuard<T1 & T2 & ...>`
Helps you create type guards for intersections

> ***Best Practice:***
> Add a type annotation to the result of `isIntersection` <br/>
> This ensures the result is of the expected type

```typescript
import { isType, isNumber, isString, TypeGuard, isIntersection } from "isguard-ts";

type A = { a: number };
type B = { b: string };
type C = A & B;

const isA = isType<A>({ a: isNumber });
const isB = isType<B>({ b: isString });

const isC: TypeGuard<C> = isIntersection(isA, isB);
```

*<span id="is-array" ></span>*
### `isArray<T>(guard: TypeGuard<T>): TypeGuard<T[]>`
Helps you create type guards for arrays
```typescript
import { isType, isNumber, isArray } from "isguard-ts";

type Test = {
	a: number;
};

const isTest = isType<Test>({ a: isNumber });
const isTestArray = isArray(isTest);
```

*<span id="is-enum" ></span>*
### `isEnum<T>(enumObj: T): TypeGuard<T[keyof T]>`
Helps you create type guards for enums
```typescript
import { isEnum } from "isguard-ts";

enum Direction {
	up = 0,
	down = 1,
	left = 2,
	right = 3,
}

const isDirection = isEnum(Direction);

isDirection(Direction.up); // true
isDirection(2); // true
isDirection("hello"); // false
```

*<span id="is-set" ></span>*
### `isSet<T>(guard: TypeGuard<T>): TypeGuard<Set<T>>`
Helps you create type guards for sets
```typescript
import { isSet, isNumber } from "isguard-ts";

const isNumberSet = isSet(isNumber);
```

*<span id="is-map" ></span>*
### `isMap<K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): TypeGuard<Map<K, V>>`
Helps you create type guards for maps
```typescript
import { isMap, isString, isBoolean } from "isguard-ts";

const isStringBooleanMap = isMap(isString, isBoolean);
```

*<span id="is-record" ></span>*
### `isRecord<K, V>(keys: K, isValue: TypeGuard<V>): TypeGuard<Record<K[number], V>>`
Helps you create type guards for records
```typescript
import { isRecord, isNumber } from "isguard-ts";

const timeUnits = ["second", "minute", "hour"] as const;
type TimeUnit = (typeof timeUnits)[number];

type TimeUnitToMillisecond = Record<TimeUnit, number>;
const isTimeUnitToMillisecond = isRecord(timeUnits, isNumber);
```

*<span id="is-partial-record" ></span>*
### `isPartialRecord<K, V>(keys: K, isValue: TypeGuard<V>): TypeGuard<Partial<Record<K[number], V>>>`
Works just like `isRecord` but allows for `undefined` values
```typescript
import { isPartialRecord, isNumber } from "isguard-ts";

const timeUnits = ["second", "minute", "hour"] as const;
type TimeUnit = (typeof timeUnits)[number];

type PartialTimeUnitToMillisecond = Partial<Record<TimeUnit, number>>;
const isPartialTimeUnitToMillisecond = isPartialRecord(timeUnits, isNumber);
```

*<span id="is-index-record" ></span>*
### `isIndexRecord<V>(isValue: TypeGuard<V>): TypeGuard<Record<PropertyKey, V>>`
Works just like `isRecord` but checks only the `values` and not the `keys`
```typescript
import { isIndexRecord, isNumber } from "isguard-ts";

const isNumberRecord = isIndexRecord(isNumber);
```

*<span id="is-lazy" ></span>*
### `isLazy<T>(generator: () => TypeGuard<T>): TypeGuard<T>`
Helps you lazy load a type guard.
Useful for:
+ Creating type guards for recursive types
+ Resolving undefined errors due to circular imports

> ***Important:***
> Annotate the recursive guard to avoid typescript errors

```typescript
import { isType, isNumber, isLazy, isOptional } from "isguard-ts";

type Node = {
	value: number;
	next?: Node;
};

const isNode: TypeGuard<Node> = isType<Node>({
	value: isNumber,
	next: isLazy(() => isOptional(isNode)),
});
```

```typescript
import { isTuple, isNumber, isLazy, isOptional } from "isguard-ts";

type Row = [number, Row?];

const isRow: TypeGuard<Row> = isTuple<Row>([
	isNumber,
	isLazy(() => isOptional(isRow)),
]);
```

```typescript
import { isUnion, isNumber, isString, isBoolean, isNull, isLazy, isArray, isIndexRecord } from "isguard-ts";

type Json =
	number |
	string |
	boolean |
	null |
	Json[] |
	{ [key: string]: Json; };

const isJson: TypeGuard<Json> = isUnion(
	isNumber,
	isString,
	isBoolean,
	isNull,
	isLazy(() => isArray(isJson)),
	isLazy(() => isJson),
);
```

*<span id="is-instanceof" ></span>*
### `isInstanceof<T>(constructor): TypeGuard<T>`
Helps you create type guards for classes
```typescript
import { isInstanceof } from "isguard-ts";

abstract class Animal { }
class Dog extends Animal { }

const isAnimal = isInstanceof(Animal);
const isDog = isInstanceof(Dog);
```

*<span id="is-literal" ></span>*
### `isLiteral<T extends Literal[]>(...literals: T): TypeGuard<T[number]>`
Helps you create type guards for literals
```typescript
import { isLiteral } from "isguard-ts";

const isHello = isLiteral("Hello");
const is12 = isLiteral(12);
const isHelloOr12 = isLiteral("Hello", 12);
```

*<span id="is-optional" ></span>*
### `isOptional<T>(guard: TypeGuard<T>): TypeGuard<T | undefined>`
Helps you create type guards for optional types
```typescript
import { isOptional, isNumber } from "isguard-ts";

const isNumberOrUndefined = isOptional(isNumber);
```

*<span id="is-maybe" ></span>*
### `isMaybe<T>(guard: TypeGuard<T>): TypeGuard<T | null>`
Helps you create type guards for nullable types
```typescript
import { isMaybe, isNumber } from "isguard-ts";

const isNumberOrNul = isMaybe(isNumber);
```

*<span id="is-refine" ></span>*
### `isRefine<T, R>(guard: TypeGuard<T>, refinement: (value: T) => value is R): TypeGuard<R>`
Helps you refine existing type guards. Can be used for:
+ Branded types (like Email, PositiveNumber and more)
+ Template literals (like \`Bye ${string}\`)

> ***Warning:***
> using `isRefine` can be unsafe because it let's you implement potentially false logic <br/>
> Use at your own risk.

```typescript
import { isRefine, isString } from "isguard-ts";

type Farewell = `Bye ${string}`;

const isFarewell = isRefine(isString, (value: string): value is Farewell => {
	return value.startsWith("Bye ");
});
```

*<span id="all-utility" ></span>*
## All utility type guards
```typescript
const isNumber: TypeGuard<number>;
const isBigint: TypeGuard<bigint>;
const isString: TypeGuard<string>;
const isBoolean: TypeGuard<boolean>;
const isSymbol: TypeGuard<symbol>;
const isFunction: TypeGuard<Function>;
const isPropertyKey: TypeGuard<PropertyKey>;

const isDate: TypeGuard<Date>;
const isRegExp: TypeGuard<RegExp>;
const isObject: TypeGuard<object>;
const isError: TypeGuard<Error>;
const isEvalError: TypeGuard<EvalError>;
const isRangeError: TypeGuard<RangeError>;
const isReferenceError: TypeGuard<ReferenceError>;
const isSyntaxError: TypeGuard<SyntaxError>;
const isTypeError: TypeGuard<TypeError>;
const isURIError: TypeGuard<URIError>;

const isNull: TypeGuard<null>;
const isUndefined: TypeGuard<undefined>;
const isNil: TypeGuard<null | undefined>;

const isTrue: TypeGuard<true>;
const isFalse: TypeGuard<false>;

const isUnknown: TypeGuard<unknown>;
const isNever: TypeGuard<never>;
```
