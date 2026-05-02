import { UnionTypeGuard, TypeGuard } from "..";
import { MaybeTypeGuardClass } from "./internal";

/**
 * A type guard for `T | null`.
 *
 * @template T - The base type that may be null
 */
export type MaybeTypeGuard<T> = UnionTypeGuard<[null, T]> & {
	/** Returns the underlying type guard for T (without the null) */
	unbox(): TypeGuard<T>;
};

/**
 * Creates a `TypeGuard` for `T | null`.
 *
 * Can be shortened with {@linkcode TypeGuard.maybe}.
 *
 * @template T - The type to make nullable
 *
 * @param guard - The type guard for the base type T
 *
 * @returns A type guard that accepts `T | null`
 *
 * @example
 * const isMaybeNumber = isMaybe(isNumber); // or isNumber.maybe()
 *
 * isMaybeNumber(5); // true
 * isMaybeNumber(null); // true
 * isMaybeNumber("hello"); // false
 */
export const isMaybe = <T>(guard: TypeGuard<T>): MaybeTypeGuard<T> => {
	return new MaybeTypeGuardClass<T>(guard);
};
