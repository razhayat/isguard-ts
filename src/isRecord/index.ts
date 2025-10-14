import { TypeTypeGuard, TypeGuard } from "..";
import { RecordTypeGuardClass, PartialRecordTypeGuardClass, IndexRecordTypeGuardClass } from "./internal";

export type RecordTypeGuard<K extends readonly PropertyKey[], V> = TypeTypeGuard<Record<K[number], V>> & {
	keys: K;
	isValue: TypeGuard<V>;
};

export const isRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): RecordTypeGuard<K, V> => {
	return new RecordTypeGuardClass<K, V>(keys, isValue);
};

export type PartialRecordTypeGuard<K extends readonly PropertyKey[], V> = TypeTypeGuard<Partial<Record<K[number], V>>> & {
	keys: K;
	isValue: TypeGuard<V>;
};

export const isPartialRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): PartialRecordTypeGuard<K, V> => {
	return new PartialRecordTypeGuardClass<K, V>(keys, isValue);
};

export type IndexRecordTypeGuard<T> = TypeGuard<Record<PropertyKey, T>> & {
	isValue: TypeGuard<T>;
};

export const isIndexRecord = <T>(isValue: TypeGuard<T>): IndexRecordTypeGuard<T> => {
	return new IndexRecordTypeGuardClass<T>(isValue);
};
