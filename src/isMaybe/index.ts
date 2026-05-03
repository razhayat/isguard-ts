import { UnionTypeGuard, TypeGuard } from "..";
import { MaybeTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for `T | null`.
 *
 * Returned by {@linkcode isMaybe} and {@linkcode TypeGuard.maybe}.
 *
 * @template T - The base type that may be `null`
 */
export type MaybeTypeGuard<T> = UnionTypeGuard<[null, T]> & {
	/** Returns the underlying type guard for T (without `null`) */
	unbox(): TypeGuard<T>;
};

/**
 * Creates a {@linkcode MaybeTypeGuard} that checks that the value is either `null` or of type `T`.
 *
 * Can be shortened with {@linkcode TypeGuard.maybe}.
 *
 * @template T - The type to make nullable
 * @param guard - The type guard for the base type `T`
 * @returns A type guard for `T | null`
 *
 * @example
 *
 * const isMaybeNumber = isMaybe(isNumber); // or isNumber.maybe()
 *
 * isMaybeNumber(5); // true
 * isMaybeNumber(null); // true
 * isMaybeNumber("hello"); // false
 */
export const isMaybe = <T>(guard: TypeGuard<T>): MaybeTypeGuard<T> => {
	return new MaybeTypeGuardClass<T>(guard);
};
