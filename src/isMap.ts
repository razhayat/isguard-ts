import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export const isMap = <K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): TypeGuard<Map<K, V>> => {
	return createTypeGuard((value: unknown): value is Map<K, V> => {
		return value instanceof Map && [...value.entries()].every(([key, value]) => isKey(key) && isValue(value));
	});
};
