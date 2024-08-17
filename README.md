# isguard-ts
A powerful `typescript` library that helps you build your type guards.<br/>
The library utilizes the `typescript` compiler to ensure the type guards are type safe and fact to create.

## Some of our built-in types
+ TypeGuard
+ Guarded

## Some of our built-in helper functions
+ isType
+ isUnion
+ isIntersection
+ isArray
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

### `isType()`
Helper function that helps you create type guards for a type
```typescript
type Test = {
	a: number;
	b: string;
};

const isTest: TypeGuard<Test> = isType<Test>({
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

const isTree: TypeGuard<Tree> = isType<Tree>(() => ({
	value: isNumber,
	left: isMaybe(isTree), // isTree is the return type of isType
	right: isMaybe(isTree),
}));

// isTree can also be accessed via the passed function's parameter:
const isTree2: TypeGuard<Tree> = isType<Tree>(isTreeParam => ({
	value: isNumber,
	left: isMaybe(isTreeParam), // isTreeParam === isTree
	right: isMaybe(isTreeParam),
}));
```

### `isUnion(...guards)`
Helper function that helps you create type guards for a union
```typescript
const isNumberOrString: TypeGuard<number | string> = isUnion(isNumber, isString);

isNumberOrString(6) // true
isNumberOrString("Hello") // true
isNumberOrString(new Date()) // false
```

### `isIntersection(...guards)`
Helper function that helps you create type guards for an intersection
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

### `isOptional<T>(guard: TypeGuard<T>): TypeGuard<T | undefined>`
Helper function that helps you create type guards for optional types
```typescript
const isNumberOrUndefined: TypeGuard<number | undefined> = isOptional(isNumber);
```

### `isMaybe<T>(guard: TypeGuard<T>): TypeGuard<T | null>`
Helper functions that creates type guards for nullable types
```typescript
const isNumberOrNull: TypeGuard<number | null> = isMaybe(isNumber);
```
