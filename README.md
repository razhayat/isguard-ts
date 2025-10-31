# isguard-ts

A powerful typescript library that helps you build type guards quickly while maintaining type safety.

`isguard-ts` utilizes the typescript compiler to ensure that its type guards are aligned with the guarded type.<br/>
For example, when making a change to your type, `isguard-ts` will inform you to update your type guard as well.

## Installation
```
npm install isguard-ts
```

## Table of Contents
+ [TypeGuard](#type-guard)
*<p></p>*
+ [isType](#is-type)
+ [isOptional](#is-optional)
+ [isMaybe](#is-maybe)
+ [isArray](#is-array)
+ [isLiteral](#is-literal)
+ [isUnion](#is-union)
+ [isIntersection](#is-intersection)
+ [isRecord](#is-record)
+ [isPartialRecord](#is-partial-record)
+ [isIndexRecord](#is-index-record)
+ [isLazy](#is-lazy)
+ [isTuple](#is-tuple)
+ [isEnum](#is-enum)
+ [isSet](#is-set)
+ [isMap](#is-map)
+ [isInstanceof](#is-instanceof)
+ [isRefine](#is-refine)
*<p></p>*
+ [utility type guards](#all-utility)
+ [generic types](#generic-types)
+ [recursive types](#recursive-types)
*<p></p>*
+ [zod](#zod)

## Basic Usage

*<span id="type-guard" ></span>*
### `TypeGuard<T>`
The most basic type - represents a type guard of `T`
```typescript
type TypeGuard<T> = (value: unknown) => value is T;
```

*<span id="is-type" ></span>*
### `isType`
Helps you create type guards for types and interfaces

```typescript
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

> **<span style="font-size: 1.25em" >Best Practice</span>**
>
> Pass the generic type argument into `isType` <br/>
> Otherwise optional fields might have an unexpected behavior

*<span id="is-optional" ></span>*
### `isOptional`
Helps you create type guards for optional (potentially `undefined`) types
```typescript
isOptional(isNumber); // or isNumber.optional();
```

*<span id="is-maybe" ></span>*
### `isMaybe`
Helps you create type guards for nullable (potentially `null`) types
```typescript
isMaybe(isNumber); // or isNumber.maybe();
```

*<span id="is-array" ></span>*
### `isArray`
Helps you create type guards for arrays
```typescript
isArray(isBoolean); // or isBoolean.array();
```

*<span id="is-literal" ></span>*
### `isLiteral`
Helps you create type guards for literals
```typescript
const isHello = isLiteral("Hello");
const is12 = isLiteral(12);
```

`isLiteral` can receive multiple values

```typescript
const directions = ["up", "down", "left", "right"] as const;
type Direction = (typeof directions)[number];

const isDirection = isLiteral(...directions) satisfies TypeGuard<Direction>;
```

> **<span style="font-size: 1.25em" >Best Practice</span>**
>
> Use the `satisfies` keyword on the result of `isLiteral` when passing multiple values <br/>
> This ensures the result is of the expected type

*<span id="is-union" ></span>*
### `isUnion`
Helps you create type guards for unions

```typescript
type A = { a: number };
type B = { b: string };
type C = A | B;

const isA = isType<A>({ a: isNumber });
const isB = isType<B>({ b: isString });

isUnion(isA, isB) satisfies TypeGuard<C>; // or isA.or(isB);
```

> **<span style="font-size: 1.25em" >Best Practice</span>**
>
> Use the `satisfies` keyword on the result of `isUnion` <br/>
> This ensures the result is of the expected type

*<span id="is-intersection" ></span>*
### `isIntersection`
Helps you create type guards for intersections

```typescript
type A = { a: number };
type B = { b: string };
type C = A & B;

const isA = isType<A>({ a: isNumber });
const isB = isType<B>({ b: isString });

isIntersection(isA, isB) satisfies TypeGuard<C>; // or isA.and(isB);
```

> **<span style="font-size: 1.25em" >Best Practice</span>**
>
> Use the `satisfies` keyword on the result of `isIntersection` <br/>
> This ensures the result is of the expected type

*<span id="is-record" ></span>*
### `isRecord`
Helps you create type guards for records
```typescript
const timeUnits = ["second", "minute", "hour"] as const;
type TimeUnit = (typeof timeUnits)[number];

isRecord(timeUnits, isNumber);
// Record<TimeUnit, number>
```

*<span id="is-partial-record" ></span>*
### `isPartialRecord`
Works just like `isRecord` but allows for `undefined` values
```typescript
const timeUnits = ["second", "minute", "hour"] as const;
type TimeUnit = (typeof timeUnits)[number];

isPartialRecord(timeUnits, isNumber);
// Partial<Record<TimeUnit, number>>
```

*<span id="is-index-record" ></span>*
### `isIndexRecord`
Works just like `isRecord` but checks only the values and not the keys
```typescript
isIndexRecord(isNumber); // or isNumber.indexRecord();
// Record<PropertyKey, number>
```

*<span id="is-lazy" ></span>*
### `isLazy`
Helps you lazy load a type guard.
Useful for:
+ Resolving undefined errors due to circular imports
+ Creating type guards for [recursive types](#recursive-types)

```typescript
import { isPerson } from "./some-module";

const isPeople = isLazy(() => isPerson).array();
```

In the example above `isPerson`, imported from `./some-module`, might be undefined when `isPeople` is being created, due to circular imports. So `isPerson.array()` would throw an error. `isLazy` solves this issue by accessing `isPerson` only when needed.

*<span id="is-tuple" ></span>*
### `isTuple`
Helps you create type guards for tuples

```typescript
type Row = [number, string?];

const isRow = isTuple<Row>([isNumber, isString.optional()]);

isRow([6, "Hello"]); // true
isRow([6]); // true
isRow(["Hello", "Bye"]); // false
```

> **<span style="font-size: 1.25em" >Best Practice</span>**
>
> Pass the generic type argument into `isTuple` <br/>
> Otherwise optional fields might have an unexpected behavior

*<span id="is-enum" ></span>*
### `isEnum`
Helps you create type guards for enums
```typescript
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
### `isSet`
Helps you create type guards for sets
```typescript
isSet(isNumber); // or isNumber.set();
// Set<number>
```

*<span id="is-map" ></span>*
### `isMap`
Helps you create type guards for maps
```typescript
isMap(isString, isBoolean);
// Map<string, boolean>
```

*<span id="is-instanceof" ></span>*
### `isInstanceof`
Helps you create type guards for classes
```typescript
abstract class Animal { }
class Dog extends Animal { }

const isAnimal = isInstanceof(Animal);
const isDog = isInstanceof(Dog);
```

*<span id="is-refine" ></span>*
### `isRefine`
Helps you refine existing type guards. Can be used for:
+ Branded types (like Email, PositiveNumber and more)
+ Template literals (like \`Bye ${string}\`)

```typescript
type Farewell = `Bye ${string}`;

const isFarewell = isRefine(isString, (value: string): value is Farewell => {
	return value.startsWith("Bye ");
});
```

> **<span style="font-size: 1.25em" >Warning</span>**
>
> using `isRefine` can be unsafe because it let's you implement potentially false logic <br/>
> Use at your own risk.

*<span id="all-utility" ></span>*
### Built-in Utility Type Guards
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

## Advanced Usage

*<span id="generic-types" ></span>*
### Generic Types
When creating type guards for generic types, you need to create your own `TypeGuard` generator
```typescript
type ValueHolder<T> = {
	value: T;
};

const isValueHolder = <T>(isValue: TypeGuard<T>) => {
	return isType<ValueHolder<T>>({
		value: isValue,
	});
};

const isNumberHolder = isValueHolder(isNumber);
```

*<span id="recursive-types" ></span>*
### Recursive Types

One way to build recursive type guards is by using [`isLazy`](#is-lazy)

```typescript
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

```typescript
type Tree = {
	value: number;
	left?: Tree;
	right?: Tree;
};

const isTree: TypeGuard<Tree> = isType<Tree>({
	value: isNumber,
	left: isLazy(() => isTree).optional(),
	right: isLazy(() => isTree).optional(),
});
```

Another way (though less recommended) is by using a `getter`

```typescript
const isTree: TypeGuard<Tree> = isType<Tree>({
	value: isNumber,
	get left() {
		return isTree.optional();
	},
	get right() {
		return isTree.optional();
	},
});
```

> **<span style="font-size: 1.25em" >Important</span>**
>
> Annotate the recursive guard to avoid typescript errors

## Plugins

*<span id="zod" ></span>*
### Zod
Any `TypeGuard` has a `.zod()` method that returns a `zod` schema which represents the guarded type.
To use this feature you **must have zod installed** through npm. The supported versions of zod start with `zod@3.2.0` and end with `zod@5.0.0` (not included)

```typescript
const ZodNumber = isNumber.zod(); // same as z.number()

type Person = {
	name: string;
};

const isPerson = isType<Person>({
	name: isString,
});

const ZodPerson = isPerson.zod(); // same as z.object({ name: z.string() })
```

> **<span style="font-size: 1.25em" >Important</span>**
>
> The schema returned by `.zod()` might not exactly represent the guarded type in certain edge cases.<br/>
> For example: `isNumber(NaN)` returns `true` while `z.number()` marks `NaN` as invalid.</br>
>
> The differences vary between zod versions, but these are the most common
> + Non finite numbers (`NaN, Infinity, -Infinity`) are valid when using `isguard-ts` but not when using `zod`
> + `zod` ignores symbol property keys while `isguard-ts` doesn't<br/>
