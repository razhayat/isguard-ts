import { TypeGuard } from "..";
import { MapTypeGuardClass } from "./internal";

export type MapTypeGuard<K, V> = TypeGuard<Map<K, V>> & {
	isKey: TypeGuard<K>;
	isValue: TypeGuard<V>;
};

export const isMap = <K, V>(isKey: TypeGuard<K>, isValue: TypeGuard<V>): MapTypeGuard<K, V> => {
	return new MapTypeGuardClass<K, V>(isKey, isValue);
};
