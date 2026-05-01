import { UnionTypeGuard, TypeGuard } from "..";
import { OptionalTypeGuardClass } from "./internal";

/**
 * A type guard for `T | undefined`.
 *
 * @template T - The base type that may be undefined
 */
export type OptionalTypeGuard<T> = UnionTypeGuard<[undefined, T]> & {
	/** Returns the underlying type guard for `T` (without `undefined`) */
	unbox(): TypeGuard<T>;
};

/**
 * Creates a `TypeGuard` for `T | undefined`.
 * This is equivalent to calling `guard.optional()` on an existing `TypeGuard`.
 *
 * @template T - The type to make optional
 *
 * @param guard - The type guard for the base type `T`
 *
 * @returns A type guard that accepts `T | undefined`
 *
 * @example
 * const isOptionalNumber = isOptional(isNumber); // or isNumber.optional()
 *
 * isOptionalNumber(5); // true
 * isOptionalNumber(undefined); // true
 * isOptionalNumber("hello"); // false
 */
export const isOptional = <T>(guard: TypeGuard<T>): OptionalTypeGuard<T> => {
	return new OptionalTypeGuardClass<T>(guard);
};
