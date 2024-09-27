# isguard-ts
A powerful `typescript` library that helps you build your type guards.<br/>
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
+ [isRecord](#is-record)
+ [isInstanceof](#is-instanceof)
+ [isOptional](#is-optional)
+ [isMaybe](#is-maybe)

## Some of our utility type guards
+ isString
+ isStringArray
+ isNumber
+ isDate
+ isNull
+ isUndefined
+ isNil - `null` or `undefined`
+ isUnknown - always returns `true`
+ isNever - always returns `false`

## Code Examples

><span id="type-guard" ></span>
### `TypeGuard<T>`
The most basic type - represents a type guard of `T`
```typescript
type TypeGuard<T> = (value: unknown) => value is T;
```

><span id="guarded" ></span>
### `Guarded<T>`
Extracts `T` out of `TypeGuard<T>`
```typescript
type Test = Guarded<TypeGuard<number>>; // number
```

><span id="is-type" ></span>
### `isType<T>(template): TypeGuard<T>`
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

isPerson({ name: "Hello", age: 6 }) // true
```

`isType` also supports recursive types by passing a function as an argument
```typescript
type Tree = {
	value: number;
	left: Tree | null;
	right: Tree | null;
};

const isTree = isType<Tree>(() => ({
	value: isNumber,
	left: isMaybe(isTree), // isTree is the return type of isType
	right: isMaybe(isTree),
}));

// isTree can also be accessed via the passed function's parameter
const isTree2 = isType<Tree>(isTreeParam => ({
	value: isNumber,
	left: isMaybe(isTreeParam), // isTreeParam === isTree2
	right: isMaybe(isTreeParam),
}));
```

For generic types you would need to create your own type guard generator
```typescript
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
><span id="is-tuple" ></span>
### `isTuple<T>(template): TypeGuard<T>`
Helps you create type guards for tuples
```typescript
type Row = [number, string?];

const isRow = isTuple<Row>([isNumber, isOptionalString]);

isRow([6, "Hello"]) // true
isRow([6]) // true
isRow(["Hello", "Bye"]) // false
```

Just like `isType`, `isTuple` supports recursive tuples
```typescript
type Row = [number, Row | null];

const isRow = isTuple<Row>(() => [
	isNumber,
	isMaybe(isRow),
]);

// isRow can also be accessed via the function's parameter
const isRow = isTuple<Row>(isRowParam => [
	isNumber,
	isMaybe(isRowParam), // isRowParam === isRow2
]);
```

><span id="is-union" ></span>
### `isUnion<[T1, T2, ...]>(...guards): TypeGuard<T1 | T2 | ...>`
Helps you create type guards for unions
```typescript
const isNumberOrString: TypeGuard<number | string> = isUnion(isNumber, isString);

isNumberOrString(6) // true
isNumberOrString("Hello") // true
isNumberOrString(new Date()) // false
```

><span id="is-intersection" ></span>
### `isIntersection<[T1, T2, ...]>(...guards): TypeGuard<T1 & T2 & ...>`
Helps you create type guards for intersections
```typescript
type A = { a: number };
type B = { b: string };
type C = A & B;

const isA = isType<A>({ a: isNumber });
const isB = isType<B>({ b: isString });

const isC: TypeGuard<C> = isIntersection(isA, isB);
```

><span id="is-array" ></span>
### `isArray<T>(guard: TypeGuard<T>): TypeGuard<T[]>`
Helps you create type guards for arrays
```typescript
const isNumberArray = isArray(isNumber);

type Test = { a: number };
const isTest = isType<Test>({ a: isNumber });
const isTestArray: TypeGuard<Test[]> = isArray(isTest);
```

><span id="is-record" ></span>
### `isRecord<K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): TypeGuard<Record<K, V>>`
Helps you create type guards for records
```typescript
type TimeUnit = "second" | "minute" | "hour";
type TimeUnitToMillisecond = Record<TimeUnit, number>;

const isTimeUnit: TypeGuard<TimeUnit> = isValueUnion("second", "minute", "hour");
const isTimeUnitToMillisecond = isRecord(isTimeUnit, isNumber);
```

><span id="is-instanceof" ></span>
### `isInstanceof<T>(constructor): TypeGuard<T>`
Helps you create type guards for classes
```typescript
abstract class Animal { }
class Dog extends Animal { }

const isAnimal: TypeGuard<Animal> = isInstanceof(Animal);
const isDog: TypeGuard<Dog> = isInstanceof(Dog);
```

><span id="is-optional" ></span>
### `isOptional<T>(guard: TypeGuard<T>): TypeGuard<T | undefined>`
Helps you create type guards for optional types
```typescript
const isNumberOrUndefined: TypeGuard<number | undefined> = isOptional(isNumber);
```

><span id="is-maybe" ></span>
### `isMaybe<T>(guard: TypeGuard<T>): TypeGuard<T | null>`
Helps you create type guards for nullable types
```typescript
const isNumberOrNull: TypeGuard<number | null> = isMaybe(isNumber);
```
