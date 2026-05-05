import { TypeGuard } from "..";
import { LiteralTypeGuardClass } from "./internal";

/**
 * Represents literal values that can be used in type guards.
 */
export type Literal = string | number | bigint | boolean | null | undefined;

/**
 * A {@linkcode TypeGuard} for literal values.
 *
 * Returned by {@linkcode isLiteral}.
 *
 * @template T - Array of literal values to guard
 */
export type LiteralTypeGuard<T extends readonly Literal[]> = TypeGuard<
	T[number]
> & {
	/** The array of literal values this guard accepts */
	values: T;
	/** Creates a new guard that only accepts the specified subset of values */
	extract<V extends readonly T[number][]>(...values: V): LiteralTypeGuard<V>;
	/** Creates a new guard that accepts all values except the specified ones */
	exclude<V extends readonly T[number][]>(
		...values: V
	): LiteralTypeGuard<Exclude<T[number], V[number]>[]>;
};

/**
 * Creates a {@linkcode LiteralTypeGuard} that checks that the value equals one of the `values`.
 *
 * @template T - Array of literal values
 * @param values - The literal values to guard for
 * @returns A type guard for the provided `values`
 *
 * @example <caption>Using `isLiteral` to guard a single literal value</caption>
 *
 * const isHello = isLiteral("Hello");
 *
 * isHello("Hello"); // true
 * isHello("world"); // false
 *
 * @example <caption>Using `isLiteral` to create a union of literals</caption>
 *
 * const directions = ["up", "down", "left", "right"] as const;
 * const isDirection = isLiteral(...directions);
 *
 * isDirection("up"); // true
 */
export const isLiteral = <const T extends readonly Literal[]>(
	...values: T
): LiteralTypeGuard<T> => {
	return new LiteralTypeGuardClass<T>(values);
};
