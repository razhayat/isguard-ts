# isguard-ts
A powerful `typescript` library that helps you build your type guards.<br/>
The library utilizes the `typescript` compiler to ensure the type guards are type safe and fast to create.

## Some of our built-in types
+ TypeGuard
+ Guarded

## Some of our built-in helper functions
+ isType
+ isTuple
+ isUnion
+ isIntersection
+ isArray
+ isInstanceof
+ isOptional
+ isMaybe

## Some of our utility type guards
+ isString
+ isStringArray
+ isNumber
+ isDate
+ isNull
+ isUndefined
+ isNil - Utility type for checking for null or undefined

## Code Examples
### `TypeGuard<T>`
The most basic type - represents a type guard of `T`
```typescript
type TypeGuard<T> = (value: unknown) => value is T;
```

### `Guarded<T>`
Extracts `T` out of `TypeGuard<T>`
```typescript
type Test = Guarded<TypeGuard<number>>; // number
```

### `isType<T>(template): TypeGuard<T>`
Helps you create type guards for types and interfaces
```typescript
type Test = {
	a: number;
	b: string;
};

const isTest = isType<Test>({
	a: isNumber,
	b: isString,
});

isTest({ a: 6, b: "Hello" }) // true
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

### `isTuple<T>(template): TypeGuard<T>`
Helps you create type guards for tuples
```typescript
type Record = [number, string?];

const isRecord = isTuple<Record>([isNumber, isOptionalString]);

isRecord([6, "Hello"]) // true
isRecord([6]) // true
isRecord(["Hello", "Bye"]) // false
```

Just like `isType`, `isTuple` supports recursive tuples
```typescript
type Record = [number, Record | null];

const isRecord = isTuple<Record>(() => [
	isNumber,
	isMaybe(isRecord),
]);

// isRecord can also be accessed via the function's parameter
const isRecord2 = isTuple<Record>(isRecordParam => [
	isNumber,
	isMaybe(isRecordParam), // isRecordParam === isRecord2
]);
```

### `isUnion<[T1, T2, ...]>(...guards): TypeGuard<T1 | T2 | ...>`
Helps you create type guards for unions
```typescript
const isNumberOrString: TypeGuard<number | string> = isUnion(isNumber, isString);

isNumberOrString(6) // true
isNumberOrString("Hello") // true
isNumberOrString(new Date()) // false
```

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

### `isArray<T>(guard: TypeGuard<T>): TypeGuard<T[]>`
Helps you create type guards for arrays
```typescript
const isNumberArray = isArray(isNumber);

type Test = { a: number };
const isTest = isType<Test>({ a: isNumber });
const isTestArray: TypeGuard<Test[]> = isArray(isTest);
```

### `isInstanceof<T>(constructor): TypeGuard<T>`
Helps you create type guards for classes
```typescript
abstract class Animal { }
class Dog extends Animal { }

const isAnimal: TypeGuard<Animal> = isInstanceof(Animal);
const isDog: TypeGuard<Dog> = isInstanceof(Dog);
```

### `isOptional<T>(guard: TypeGuard<T>): TypeGuard<T | undefined>`
Helps you create type guards for optional types
```typescript
const isNumberOrUndefined: TypeGuard<number | undefined> = isOptional(isNumber);
```

### `isMaybe<T>(guard: TypeGuard<T>): TypeGuard<T | null>`
Helps you create type guards for nullable types
```typescript
const isNumberOrNull: TypeGuard<number | null> = isMaybe(isNumber);
```
