import { TypeGuard } from "..";
import { MapTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for `Map<K, V>`.
 *
 * Returned by {@linkcode isMap}.
 *
 * @template K - The type of keys in the map
 * @template V - The type of values in the map
 */
export type MapTypeGuard<K, V> = TypeGuard<Map<K, V>> & {
	/** The type guard used for validating map keys */
	isKey: TypeGuard<K>;
	/** The type guard used for validating map values */
	isValue: TypeGuard<V>;
};

/**
 * Creates a {@linkcode MapTypeGuard} that checks that the value is a `Map` and all its keys and values are of the correct type.
 *
 * @template K - The type of keys in the map
 * @template V - The type of values in the map
 * @param isKey - The type guard for map keys
 * @param isValue - The type guard for map values
 * @returns A type guard for `Map<K, V>`
 *
 * @example
 *
 * const isStringToNumberMap = isMap(isString, isNumber);
 *
 * isStringToNumberMap(new Map([["a", 1], ["b", 2]])); // true
 * isStringToNumberMap(new Map([[1, "a"]])); // false
 */
export const isMap = <K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): MapTypeGuard<K, V> => {
	return new MapTypeGuardClass<K, V>(isKey, isValue);
};
