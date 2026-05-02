import { TypeGuard } from "..";
import { LazyTypeGuardClass } from "./internal";

/**
 * A lazy {@linkcode TypeGuard} that defers evaluation until needed.
 *
 * Returned by {@linkcode isLazy}.
 *
 * @template T - The type to guard
 */
export type LazyTypeGuard<T> = TypeGuard<T> & {
	/** Returns the underlying type guard (forces evaluation if not already done) */
	unbox(): TypeGuard<T>;
};

/**
 * Creates a {@linkcode LazyTypeGuard} that evaluates the generator function only when needed.
 *
 * This is useful for:
 * - Resolving circular imports.
 * - Defining recursive type guards (e.g. trees, linked lists).
 *
 * @template T - The type to guard
 * @param generator - A function that returns the actual type guard when called
 * @returns A type guard for `T`
 *
 * @example <caption>Using `isLazy` for circular imports</caption>
 *
 * const isPeople = isLazy(() => isPerson).array();
 *
 * @example <caption>Using `isLazy` for recursive types</caption>
 *
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
