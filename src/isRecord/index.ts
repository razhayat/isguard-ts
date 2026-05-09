import { TypeTypeGuard, TypeGuard } from "..";
import {
	RecordTypeGuardClass,
	PartialRecordTypeGuardClass,
	IndexRecordTypeGuardClass,
} from "./internal";

/**
 * A {@linkcode TypeGuard} for `Record<K, V>`.
 *
 * Returned by {@linkcode isRecord}.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 */
export type RecordTypeGuard<K extends readonly PropertyKey[], V> = TypeTypeGuard<
	Record<K[number], V>
> & {
	/** The array of keys that must be present in the record */
	keys: K;
	/** The type guard used for validating record values */
	isValue: TypeGuard<V>;
};

/**
 * Creates a {@linkcode RecordTypeGuard} that checks that the value has the specified keys with the specified value type.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 * @param keys - The keys that must be present in the record
 * @param isValue - The type guard for the values
 * @returns A type guard for `Record<K, V>`
 *
 * @example
 *
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
 * A {@linkcode TypeGuard} for `Partial<Record<K, V>>`.
 *
 * Returned by {@linkcode isPartialRecord}.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 */
export type PartialRecordTypeGuard<K extends readonly PropertyKey[], V> = TypeTypeGuard<
	Partial<Record<K[number], V>>
> & {
	/** The array of keys that may be present in the record */
	keys: K;
	/** The type guard used for validating record values */
	isValue: TypeGuard<V>;
};

/**
 * Creates a {@linkcode PartialRecordTypeGuard} that checks that the value is a partial record with the specified keys and value type.
 *
 * @template K - Array of keys for the record
 * @template V - The value type for all keys
 * @param keys - The keys that may be present in the record
 * @param isValue - The type guard for the values
 * @returns A type guard for `Partial<Record<K, V>>`
 *
 * @example
 *
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
 * A {@linkcode TypeGuard} for `Record<PropertyKey, T>`.
 *
 * Returned by {@linkcode isIndexRecord} and {@linkcode TypeGuard.indexRecord}.
 *
 * @template T - The value type for all keys
 */
export type IndexRecordTypeGuard<T> = TypeGuard<Record<PropertyKey, T>> & {
	/** The type guard used for validating record values */
	isValue: TypeGuard<T>;
};

/**
 * Creates an {@linkcode IndexRecordTypeGuard} that checks that the value is an index record with the specified value type.
 *
 * Can be shortened with {@linkcode TypeGuard.indexRecord}.
 *
 * @template T - The value type for all keys
 * @param isValue - The type guard for the values
 * @returns A type guard for `Record<PropertyKey, T>`
 *
 * @example
 *
 * const isNumberRecord = isIndexRecord(isNumber); // or isNumber.indexRecord()
 * // ^? TypeGuard<Record<PropertyKey, number>>
 *
 * isNumberRecord({ a: 1, b: 2 }); // true
 * isNumberRecord({ a: 1, b: "2" }); // false
 */
export const isIndexRecord = <T>(isValue: TypeGuard<T>): IndexRecordTypeGuard<T> => {
	return new IndexRecordTypeGuardClass<T>(isValue);
};
