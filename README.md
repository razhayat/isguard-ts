# isguard-ts

A powerful TypeScript library that helps you build type guards quickly while maintaining type safety.

`isguard-ts` utilizes the TypeScript compiler to ensure that its type guards are aligned with the guarded type.

When making a change to your type, `isguard-ts` will inform you to update your type guard as well. Ensuring **type safety** and making your type act as a single source of truth.

For more information see the [documentation](https://razhayat.github.io/isguard-ts/modules.html).

## Installation

```bash
npm install isguard-ts
```

## Basic Usage

Easily creates type guards

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

Ensures the guard is **type safe**

```typescript
type Person = {
	name: string;
	age: number;
};

// ❌ TypeScript Error: Property 'age' is missing
const missingProperties = isType<Person>({
	name: isString,
});

// ❌ TypeScript Error: 'birth' does not exist
const tooManyProperties = isType<Person>({
	name: isString,
	age: isNumber,
	birth: isDate,
});
```

## Advanced Usage

When creating type guards for generic types, you need to create your own `TypeGuard` generator. The function takes a type guard as input and returns a new type guard for the generic type.

```typescript
type ValueHolder<T> = {
	value: T;
};

// Create a reusable type guard factory
const isValueHolder = <T>(isValue: TypeGuard<T>): TypeGuard<ValueHolder<T>> => {
	return isType<ValueHolder<T>>({
		value: isValue,
	});
};

// Now you can use it with any type
const isNumberHolder = isValueHolder(isNumber);
const isStringHolder = isValueHolder(isString);

const isPerson = isType<Person>({
	name: isString,
	age: isNumber,
});

const isPersonHolder = isValueHolder(isPerson);

isNumberHolder({ value: 42 }); // true
isStringHolder({ value: "42" }); // true
isPersonHolder({ value: { name: "John", age: 30 } }); // true
```
