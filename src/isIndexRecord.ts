import { isObject } from "./isUtils";
import { TypeGuard } from "./types";

/**
 * @deprecated Will be removed in the next minor version 1.2.0
 */
export const isRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): TypeGuard<Record<K[number], V>> => {
	return (value: unknown): value is Record<K[number], V> => {
		if (!isObject(value) || value.constructor !== Object) {
			return false;
		}

		return keys.every(key => {
			return isValue(Reflect.get(value, key));
		});
	};
};

export const isIndexRecord = <K extends PropertyKey, V>(isValue: TypeGuard<V>): TypeGuard<Record<K, V>> => {
	return (value: unknown): value is Record<K, V> => {
		if (!isObject(value) || value.constructor !== Object) {
			return false;
		}

		return Object.values(value).every(isValue);
	};
};
