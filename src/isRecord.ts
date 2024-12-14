import { isType } from "./isType";
import { TypeGuard } from "./types";
import { partialRecord, record } from "./utils";

type AtLeastOneArray<T> = readonly [T, ...T[]];

export const isRecord = <const K extends AtLeastOneArray<PropertyKey>, V>(keys: K, isValue: TypeGuard<V>) => {
	return isType(record(keys, isValue));
};

export const isPartialRecord = <const K extends AtLeastOneArray<PropertyKey>, V>(keys: K, isValue: TypeGuard<V>) => {
	return isType(partialRecord(keys, isValue));
};

export const isIndexRecord = <K extends PropertyKey, V>(isValue: TypeGuard<V>): TypeGuard<Record<K, V>> => {
	return (value: unknown): value is Record<K, V> => {
		if (!(value instanceof Object) || value.constructor !== Object) {
			return false;
		}

		const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)];
		return keys.every(key => isValue((value as Record<PropertyKey, unknown>)[key]));
	};
};
