import { TypeGuard } from "..";
import { ArrayTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for `T[]`.
 *
 * Returned by {@linkcode isArray} and {@linkcode TypeGuard.array}.
 *
 * @template T - The type of elements in the array
 */
export type ArrayTypeGuard<T> = TypeGuard<T[]> & {
	/** The type guard used for validating individual array elements */
	isValue: TypeGuard<T>;
};

/**
 * Creates an {@linkcode ArrayTypeGuard} that checks that the value is an array and all elements match `isValue`.
 *
 * Can be shortened with {@linkcode TypeGuard.array}.
 *
 * @template T - The type of elements in the array
 * @param isValue - The type guard for individual array elements
 * @returns A type guard for `T[]`
 *
 * @example
 *
 * const isNumberArray = isArray(isNumber); // or isNumber.array()
 *
 * isNumberArray([1, 2, 3]); // true
 * isNumberArray([1, "hello"]); // false
 */
export const isArray = <T>(isValue: TypeGuard<T>): ArrayTypeGuard<T> => {
	return new ArrayTypeGuardClass<T>(isValue);
};
