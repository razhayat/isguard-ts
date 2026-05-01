import { TypeTypeGuard, TypeGuard } from "..";
import {
	RecordTypeGuardClass,
	PartialRecordTypeGuardClass,
	IndexRecordTypeGuardClass,
} from "./internal";

/**
 * A type guard for record types with specific keys.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 */
export type RecordTypeGuard<
	K extends readonly PropertyKey[],
	V,
> = TypeTypeGuard<Record<K[number], V>> & {
	/** The array of keys that must be present in the record */
	keys: K;
	/** The type guard used for validating record values */
	isValue: TypeGuard<V>;
};

/**
 * Creates a `TypeGuard` for record types with specific keys.
 * All specified keys must be present and their values must match the value guard.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 *
 * @param keys - The keys that must be present in the record
 * @param isValue - The type guard for the values
 *
 * @returns A type guard for `Record<K[number], V>`
 *
 * @example
 * const timeUnits = ["second", "minute", "hour"] as const;
 * const isTimeRecord = isRecord(timeUnits, isNumber);
 * // ^? TypeGuard<Record<"second" | "minute" | "hour", number>>
 *
 * isTimeRecord({ second: 1, minute: 2, hour: 3 }); // true
 * isTimeRecord({ second: 1 }); // false
 */
export const isRecord = <const K extends readonly PropertyKey[], V>(
	keys: K,
	isValue: TypeGuard<V>,
): RecordTypeGuard<K, V> => {
	return new RecordTypeGuardClass<K, V>(keys, isValue);
};

/**
 * A type guard for partial record types with specific keys.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 */
export type PartialRecordTypeGuard<
	K extends readonly PropertyKey[],
	V,
> = TypeTypeGuard<Partial<Record<K[number], V>>> & {
	/** The array of keys that may be present in the record */
	keys: K;
	/** The type guard used for validating record values */
	isValue: TypeGuard<V>;
};

/**
 * Creates a `TypeGuard` for partial record types with specific keys.
 * Keys are optional and their values must match the value guard if present.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 *
 * @param keys - The keys that may be present in the record
 * @param isValue - The type guard for the values
 *
 * @returns A type guard for `Partial<Record<K[number], V>>`
 *
 * @example
 * const timeUnits = ["second", "minute", "hour"] as const;
 * const isPartialTimeRecord = isPartialRecord(timeUnits, isNumber);
 * // ^? TypeGuard<Partial<Record<"second" | "minute" | "hour", number>>>
 *
 * isPartialTimeRecord({ second: 1 }); // true
 * isPartialTimeRecord({}); // true
 * isPartialTimeRecord({ second: "1" }); // false (wrong value type)
 */
export const isPartialRecord = <const K extends readonly PropertyKey[], V>(
	keys: K,
	isValue: TypeGuard<V>,
): PartialRecordTypeGuard<K, V> => {
	return new PartialRecordTypeGuardClass<K, V>(keys, isValue);
};

/**
 * A type guard for index record types.
 *
 * @template T - The value type for all keys
 */
export type IndexRecordTypeGuard<T> = TypeGuard<Record<PropertyKey, T>> & {
	/** The type guard used for validating record values */
	isValue: TypeGuard<T>;
};

/**
 * Creates a `TypeGuard` for index record types.
 * Accepts any object where all values match the provided type guard, regardless of keys.
 * This is equivalent to calling `guard.indexRecord()` on an existing `TypeGuard`.
 *
 * @template T - The value type for all keys
 *
 * @param isValue - The type guard for the values
 *
 * @returns A type guard for `Record<PropertyKey, T>`
 *
 * @example
 * const isNumberRecord = isIndexRecord(isNumber); // or isNumber.indexRecord()
 * // ^? TypeGuard<Record<PropertyKey, number>>
 *
 * isNumberRecord({ a: 1, b: 2 }); // true
 * isNumberRecord({ a: 1, b: "2" }); // false
 */
export const isIndexRecord = <T>(
	isValue: TypeGuard<T>,
): IndexRecordTypeGuard<T> => {
	return new IndexRecordTypeGuardClass<T>(isValue);
};
