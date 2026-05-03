import { TypeGuard } from "..";
import { SetTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for `Set<T>`.
 *
 * Returned by {@linkcode isSet} and {@linkcode TypeGuard.set}.
 *
 * @template T - The type of elements in the set
 */
export type SetTypeGuard<T> = TypeGuard<Set<T>> & {
	/** The type guard used for validating individual set elements */
	isValue: TypeGuard<T>;
};

/**
 * Creates a {@linkcode SetTypeGuard} that validates that the value is a `Set` and all its elements match the provided type guard.
 *
 * Can be shortened with {@linkcode TypeGuard.set}.
 *
 * @template T - The type of elements in the set
 *
 * @param isValue - The type guard for individual set elements
 *
 * @returns A type guard for `Set<T>`
 *
 * @example
 * const isNumberSet = isSet(isNumber); // or isNumber.set()
 *
 * isNumberSet(new Set([1, 2, 3])); // true
 * isNumberSet(new Set([1, "hello"])); // false
 */
export const isSet = <T>(isValue: TypeGuard<T>): SetTypeGuard<T> => {
	return new SetTypeGuardClass<T>(isValue);
};
