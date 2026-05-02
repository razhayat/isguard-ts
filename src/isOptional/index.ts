import { UnionTypeGuard, TypeGuard } from "..";
import { OptionalTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for `T | undefined`.
 *
 * Returned by {@linkcode isOptional} and {@linkcode TypeGuard.optional}.
 *
 * @template T - The base type that may be undefined
 */
export type OptionalTypeGuard<T> = UnionTypeGuard<[undefined, T]> & {
	/** Returns the underlying type guard for `T` (without `undefined`) */
	unbox(): TypeGuard<T>;
};

/**
 * Creates an {@linkcode OptionalTypeGuard} that checks that the value is either `undefined` or of type `T`.
 *
 * Can be shortened with {@linkcode TypeGuard.optional}.
 *
 * @template T - The type to make optional
 * @param guard - The type guard for the base type `T`
 * @returns A type guard for `T | undefined`
 *
 * @example
 *
 * const isOptionalNumber = isOptional(isNumber); // or isNumber.optional()
 *
 * isOptionalNumber(5); // true
 * isOptionalNumber(undefined); // true
 * isOptionalNumber("hello"); // false
 */
export const isOptional = <T>(guard: TypeGuard<T>): OptionalTypeGuard<T> => {
	return new OptionalTypeGuardClass<T>(guard);
};
