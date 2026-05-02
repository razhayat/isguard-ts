import { TypeGuard } from "..";
import { RefineTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} that refines an existing type guard with additional constraints.
 * Useful for branded types, template literals, and other refined types.
 *
 * Returned by {@linkcode isRefine} and {@linkcode TypeGuard.refine}.
 *
 * @template T - The base type
 * @template R - The refined type (subset of T)
 */
export type RefineTypeGuard<T, R extends T> = TypeGuard<R> & {
	/** The base type guard being refined */
	isBase: TypeGuard<T>;
	/** The refinement function that applies additional constraints */
	refinement: (value: T) => value is R;
};

/**
 * Creates a {@linkcode RefineTypeGuard} that checks that the value is of type `T` **and** passes the `refinement` function.
 * This allows creating more specific type guards from broader ones.
 *
 * Can be shortened with {@linkcode TypeGuard.refine}.
 *
 * **Warning**
 *
 * Using `isRefine` can be **unsafe** as it allows implementing potentially incorrect logic.
 * Ensure that the refinement function correctly narrows the type and does not produce false positives.
 * Use with caution.
 *
 * @template T - The base type
 * @template R - The refined type (must extend `T`)
 * @param isBase - The base type guard to refine
 * @param refinement - A function that checks the additional constraints
 * @returns A type guard for the refined type `R`
 *
 * @example
 *
 * type Farewell = `Bye ${string}`;
 * const isFarewell = isRefine(isString, (value: string): value is Farewell => {
 *   return value.startsWith("Bye ");
 * });
 *
 * isFarewell("Bye world"); // true
 * isFarewell("Hello world"); // false
 */
export const isRefine = <T, R extends T>(
	isBase: TypeGuard<T>,
	refinement: (value: T) => value is R,
): RefineTypeGuard<T, R> => {
	return new RefineTypeGuardClass<T, R>(isBase, refinement);
};
