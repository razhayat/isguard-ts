import { isObject } from "./isUtils";
import { TypeGuard } from "./types";

export const isRecord = <K extends PropertyKey, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): TypeGuard<Record<K, V>> => {
	return (value: unknown): value is Record<K, V> => {
		if (!isObject(value) || value.constructor !== Object) {
			return false;
		}

		return Object.entries(value).every(([key, value]) => {
			return isKey(key) && isValue(value);
		});
	};
};
