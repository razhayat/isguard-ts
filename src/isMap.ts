import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type MapTypeGuard<K, V> = TypeGuard<Map<K, V>> & {
	isKey: TypeGuard<K>;
	isValue: TypeGuard<V>;
};

export const isMap = <K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): MapTypeGuard<K, V> => {
	return createTypeGuard<MapTypeGuard<K, V>>({
		func: value => {
			return value instanceof Map && [...value.entries()].every(([key, value]) => isKey(key) && isValue(value));
		},
		isKey: isKey,
		isValue: isValue,
	});
};
