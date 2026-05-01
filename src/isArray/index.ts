import { TypeGuard } from "..";
import { ArrayTypeGuardClass } from "./internal";

/**
 * A type guard for arrays of `T`.
 * Extends `TypeGuard<T[]>`.
 *
 * @template T - The type of elements in the array
 */
export type ArrayTypeGuard<T> = TypeGuard<T[]> & {
	/** The type guard used for validating individual array elements */
	isValue: TypeGuard<T>;
};

/**
 * Creates a `TypeGuard` for arrays where all elements match the provided type guard.
 * This is equivalent to calling `guard.array()` on an existing `TypeGuard`.
 *
 * @template T - The type of elements in the array
 * @param isValue - The type guard for individual array elements
 * @returns A type guard that guards `T[]`
 *
 * @example
 * const isNumberArray = isArray(isNumber); // or isNumber.array()
 *
 * isNumberArray([1, 2, 3]); // true
 * isNumberArray([1, "hello"]); // false
 */
export const isArray = <T>(isValue: TypeGuard<T>): ArrayTypeGuard<T> => {
	return new ArrayTypeGuardClass<T>(isValue);
};
