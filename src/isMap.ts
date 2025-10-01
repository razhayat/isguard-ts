import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export const isMap = <K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): TypeGuard<Map<K, V>> => {
	return createTypeGuard<TypeGuard<Map<K, V>>>({
		func: value => {
			return value instanceof Map && [...value.entries()].every(([key, value]) => isKey(key) && isValue(value));
		},
	});
};
