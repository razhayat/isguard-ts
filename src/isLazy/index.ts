import { TypeGuard } from "..";
import { LazyTypeGuardClass } from "./internal";

/**
 * A lazy type guard that defers evaluation until needed.
 * Useful for resolving circular imports and recursive types.
 *
 * @template T - The type to guard
 */
export type LazyTypeGuard<T> = TypeGuard<T> & {
	/** Returns the underlying type guard (forces evaluation if not already done) */
	unbox(): TypeGuard<T>;
};

/**
 * Creates a lazy `TypeGuard` that evaluates the generator function only when needed.
 * This is useful for breaking circular imports and creating recursive type guards.
 *
 * @template T - The type to guard
 * @param generator - A function that returns the actual type guard when called
 * @returns A lazy `TypeGuard` that defers evaluation
 *
 * @example <caption>Using `isLazy` for circular imports</caption>
 * const isPeople = isLazy(() => isPerson).array();
 *
 * @example <caption>Using `isLazy` for recursive types</caption>
 * type Tree = { value: number; left?: Tree; right?: Tree };
 *
 * const isTree: TypeGuard<Tree> = isType<Tree>({
 *   value: isNumber,
 *   left: isLazy(() => isTree).optional(),
 *   right: isLazy(() => isTree).optional(),
 * });
 */
export const isLazy = <T>(generator: () => TypeGuard<T>): LazyTypeGuard<T> => {
	return new LazyTypeGuardClass<T>(generator);
};
