import { TypeGuard } from "..";
import { RefineTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} that refines an existing type guard with additional constraints.
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
 *
 * This is useful for:
 * - Branded types.
 * - Template literals.
 * - Any type guard that doesn't have a built-in implementation.
 *
 * Can be shortened with {@linkcode TypeGuard.refine}.
 *
 * **Warning**
 *
 * Using `isRefine` can be **unsafe** as it allows implementing potentially incorrect logic.
 * Ensure that your refinement function correctly narrows the type and does not produce false positives.
 * Use with caution.
 *
 * @template T - The base type
 * @template R - The refined type (must extend `T`)
 * @param isBase - The base type guard to refine
 * @param refinement - A function that checks the additional constraints
 * @returns A type guard for the refined type `R`
 *
 * @example <caption>Branded Types</caption>
 *
 * type UUID = Tagged<string, "UUID">;
 *
 * const isUUID = isRefine(isString, (value: string): value is UUID => {
 *   return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);
 * });
 *
 * isUUID("123e4567-e89b-12d3-a456-426614174000"); // true
 * isUUID("not-a-uuid"); // false
 * isUUID(123); // false
 *
 * @example <caption>Template Literals</caption>
 *
 * type Farewell = `Bye ${string}`;
 *
 * const isFarewell = isString.refine((value: string): value is Farewell => {
 *   return value.startsWith("Bye ");
 * });
 *
 * isFarewell("Bye world"); // true
 * isFarewell("Hello world"); // false
 *
 * @example <caption>Implementing incorrect logic (unsafe)</caption>
 *
 * type EvenNumber = Tagged<number, "EvenNumber">;
 *
 * const isEvenNumber = isNumber.refine((value: number): value is EvenNumber => {
 *   return value % 2 === 1; // Incorrect logic for even numbers
 * });
 *
 * isEvenNumber(2); // false (should be true)
 * isEvenNumber(3); // true (should be false)
 */
export const isRefine = <T, R extends T>(
	isBase: TypeGuard<T>,
	refinement: (value: T) => value is R,
): RefineTypeGuard<T, R> => {
	return new RefineTypeGuardClass<T, R>(isBase, refinement);
};
