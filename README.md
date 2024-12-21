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
+ [isRecursive](#is-recursive)
+ [isInstanceof](#is-instanceof)
+ [isValue](#is-value)
+ [isValueUnion](#is-value-union)
+ [isOptional](#is-optional)
+ [isMaybe](#is-maybe)

## Some of our utility type guards
+ isString, isNumber, isBoolean, isDate
+ isStringArray, isNumberArray, isBooleanArray, isDateArray
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

>Note that these code examples may contain **Best Practice** sections<br/>
You are advised to follow them closely when you write your code

*<span id="is-type" ></span>*
### `isType<T>(template): TypeGuard<T>`
Helps you create type guards for types and interfaces

>**Best Practice:** Pass the generic type argument into `isType`<br/>
Otherwise optional fields might have an unexpected behavior

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

`isType` also supports recursive types by passing a function as an argument
```typescript
import { isType, isNumber, isMaybe } from "isguard-ts";

type Tree = {
	value: number;
	left: Tree | null;
	right: Tree | null;
};

const isTree = isType<Tree>(isTreeParam => ({
	value: isNumber,
	left: isMaybe(isTreeParam), // isTreeParam === isTree
	right: isMaybe(isTreeParam),
}));
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

>**Best Practice:** Pass the generic type argument into `isTuple`<br/>
Otherwise optional fields might have an unexpected behavior

```typescript
import { isTuple, isNumber, isOptionalString } from "isguard-ts";

type Row = [number, string?];

const isRow = isTuple<Row>([isNumber, isOptionalString]);

isRow([6, "Hello"]); // true
isRow([6]); // true
isRow(["Hello", "Bye"]); // false
```

Just like `isType`, `isTuple` supports recursive tuples
```typescript
import { isTuple, isNumber, isMaybe } from "isguard-ts";

type Row = [number, Row | null];

const isRow = isTuple<Row>(isRowParam => [
	isNumber,
	isMaybe(isRowParam), // isRowParam === isRow
]);
```

*<span id="is-union" ></span>*
### `isUnion<[T1, T2, ...]>(...guards): TypeGuard<T1 | T2 | ...>`
Helps you create type guards for unions

>**Best Practice:** Add a type annotation to the result of `isUnion`<br/>
This ensures the result is of the expected type

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

>**Best Practice:** Add a type annotation to the result of `isIntersection`<br/>
This ensures the result is of the expected type

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

*<span id="is-recursive" ></span>*
### `isRecursive<T>(generator): TypeGuard<T>`
Helps you create type guards for recursive types

>**Best Practice:** Pass the generic type argument into `isRecursive`<br/>
To ensure the `TypeGuard` returned is of the desired type

```typescript
import { isRecursive, isType, isNumber, isOptional } from "isguard-ts";

type Node = {
	value: number;
	next?: Node;
};

const isNode = isRecursive<Node>(isNodeParam => isType<Node>({
	value: isNumber,
	next: isOptional(isNodeParam), // isNodeParam === isNode
}));
```

```typescript
import { isRecursive, isTuple, isNumber, isOptional } from "isguard-ts";

type Row = [number, Row?];

const isRow = isRecursive<Row>(isRowParam => isTuple<Row>([
	isNumber,
	isOptional(isRowParam), // isRowParam === isRow
]));
```

```typescript
import { isRecursive, isUnion, isNumber, isString, isBoolean, isNull, isArray, isIndexRecord } from "isguard-ts";

type Json =
	number |
	string |
	boolean |
	null |
	Json[] |
	{ [key: string]: Json; };

const isJson = isRecursive<Json>(isJsonParam => isUnion(
	isNumber,
	isString,
	isBoolean,
	isNull,
	isArray(isJsonParam), // isJsonParam === isJson
	isIndexRecord(isJsonParam),
));
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

*<span id="is-value" ></span>*
### `isValue<T>(value: T): TypeGuard<T>`
Helps you create type guards for value literals
```typescript
import { isValue } from "isguard-ts";

const isHello = isValue("Hello");
const is12 = isValue(12);
```

*<span id="is-value-union" ></span>*
### `isValueUnion<[T1, T2, ...]>(values): TypeGuard<T1 | T2 | ...>`
Helps you create type guards for union of value literals
```typescript
import { isValueUnion } from "isguard-ts";

const isHelloOrBye = isValueUnion("Hello", "Bye");
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

const isNumberArray: TypeGuard<number[]>;
const isStringArray: TypeGuard<string[]>;
const isBooleanArray: TypeGuard<boolean[]>;
const isDateArray: TypeGuard<Date[]>;

const isOptionalNumber: TypeGuard<number | undefined>;
const isOptionalString: TypeGuard<string | undefined>;
const isOptionalBoolean: TypeGuard<boolean | undefined>;
const isOptionalDate: TypeGuard<Date | undefined>;

const isMaybeNumber: TypeGuard<number | null>;
const isMaybeString: TypeGuard<string | null>;
const isMaybeBoolean: TypeGuard<boolean | null>;
const isMaybeDate: TypeGuard<Date | null>;

const isTrue: TypeGuard<true>;
const isFalse: TypeGuard<false>;

const isUnknown: TypeGuard<unknown>;
const isNever: TypeGuard<never>;
```
