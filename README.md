# isguard-ts
A powerful `typescript` library that helps you build your type guards.<br/>
The library utilizes the `typescript` compiler to ensure the type guards are type safe and fact to create.

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
The most basic type - represents a TypeGuard of `T`
```typescript
type TypeGuard<T> = (value: unknown) => value is T;
```

### `Guarded<T>`
Extracts the guarded type out of TypeGuard
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

It can also support recursive types by passing a function as an argument
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

// isTree can also be accessed via the passed function's parameter:
const isTree2 = isType<Tree>(isTreeParam => ({
	value: isNumber,
	left: isMaybe(isTreeParam), // isTreeParam === isTree
	right: isMaybe(isTreeParam),
}));
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
Helper function that helps you create type guards for an array
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
