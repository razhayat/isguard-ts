import { ZodType } from "zod";
import {
	ArrayTypeGuard,
	IndexRecordTypeGuard,
	IntersectionTypeGuard,
	MaybeTypeGuard,
	OptionalTypeGuard,
	RefineTypeGuard,
	SetTypeGuard,
	UnionTypeGuard,
	isOptional,
	isUnion,
	isMaybe,
	isArray,
	isSet,
	isIntersection,
	isIndexRecord,
	isRefine,
} from "..";
import { AnyTypeGuard } from "./internal";

type ExactEqual<T> = {
	required: Required<T>;
	keys: keyof T;
} & {};

/**
 * Represents a type guard function that checks if a value is of type `T`.
 * Type guards are functions that return a boolean indicating whether the input value matches the expected type.
 * This type includes methods for chaining type guards to create more complex validations.
 *
 * @template T - The type that this guard checks for
 * @param value - The value to check against the type guard
 * @returns `true` if the value is of type `T`, `false` otherwise
 *
 * @example
 * const isPerson = isType<Person>({
 *   name: isString,
 *   age: isNumber
 * });
 *
 * if (isPerson(someValue)) {
 *   // someValue is now typed as Person
 * }
 */
export type TypeGuard<
	in out T,
	in out _U extends ExactEqual<T> = ExactEqual<T>,
> = {
	(value: unknown): value is T;
	/**
	 * Creates a type guard for `T | undefined`.
	 *
	 * Shorthand for {@linkcode isOptional}
	 */
	optional(): OptionalTypeGuard<T>;
	/**
	 * Creates a type guard for `T | null`.
	 *
	 * Shorthand for {@linkcode isMaybe}
	 */
	maybe(): MaybeTypeGuard<T>;
	/**
	 * Creates a type guard for an intersection of types
	 *
	 * Shorthand for {@linkcode isIntersection}
	 */
	and<I extends readonly unknown[]>(
		...guards: TypeGuardTemplate<I>
	): IntersectionTypeGuard<[T, ...I]>;
	/**
	 * Creates a type guard for a union of types
	 *
	 * Shorthand for {@linkcode isUnion}
	 */
	or<I extends readonly unknown[]>(
		...guards: TypeGuardTemplate<I>
	): UnionTypeGuard<[T, ...I]>;
	/**
	 * Creates a type guard for `T[]`
	 *
	 * Shorthand for {@linkcode isArray}
	 */
	array(): ArrayTypeGuard<T>;
	/**
	 * Creates a type guard for `Set<T>`
	 *
	 * Shorthand for {@linkcode isSet}
	 */
	set(): SetTypeGuard<T>;
	/**
	 * Creates a type guard for `Record<PropertyKey, T>`
	 *
	 * Shorthand for {@linkcode isIndexRecord}
	 */
	indexRecord(): IndexRecordTypeGuard<T>;
	/**
	 * Creates a type guard for a refined type with additional constraints
	 *
	 * Shorthand for {@linkcode isRefine}
	 */
	refine<R extends T>(
		refinement: (value: T) => value is R,
	): RefineTypeGuard<T, R>;
	/**
	 * Creates a Zod schema equivalent to this type guard
	 */
	zod(): ZodType<T>;
};

/**
 * Extracts the guarded type from a {@linkcode TypeGuard}.
 *
 * @template T - A `TypeGuard` type
 * @returns The type that the guard checks for
 *
 * @example
 * type Person = {
 * 	name: string;
 * 	age: number
 * };
 *
 * const isPerson = isType<Person>({
 * 	name: isString,
 * 	age: isNumber,
 * });
 *
 * type PersonType = Guarded<typeof isPerson>;
 * // ^? Person
 */
export type Guarded<T extends AnyTypeGuard> =
	T extends TypeGuard<infer R> ? R : never;

/**
 * A template for creating type guards for objects or tuples.
 * Each property corresponds to a type guard for that property or index.
 *
 * @template T - The object or tuple to guard
 */
export type TypeGuardTemplate<
	in out T,
	in out _U extends ExactEqual<T> = ExactEqual<T>,
> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};
