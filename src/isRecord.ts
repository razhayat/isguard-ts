import { isObject } from "./isUtils";
import { TypeGuard } from "./types";

export const isRecord = <K extends PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): TypeGuard<Record<K[number], V>> => {
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
