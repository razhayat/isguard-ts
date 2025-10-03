import { isType, TypeTypeGuard } from "./isType";
import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTemplate, createTypeGuard, objectKeys } from "./internal";

export type RecordTypeGuard<K extends readonly PropertyKey[], V> = TypeTypeGuard<Record<K[number], V>> & {
	keys: K;
	isValue: TypeGuard<V>;
};

export const isRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): RecordTypeGuard<K, V> => {
	const template = createTemplate(keys, () => isValue);
	const base = isType(template as TypeGuardTemplate<Record<K[number], V>>);

	return Object.assign(base, {
		keys: keys,
		isValue: isValue,
	} satisfies Omit<RecordTypeGuard<K, V>, keyof typeof base>);
};

export type PartialRecordTypeGuard<K extends readonly PropertyKey[], V> = TypeTypeGuard<Partial<Record<K[number], V>>> & {
	keys: K;
	isValue: TypeGuard<V>;
};

export const isPartialRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): PartialRecordTypeGuard<K, V> => {
	const base = isRecord(keys, isValue).partial();

	return Object.assign(base, {
		keys: keys,
		isValue: isValue,
	} satisfies Omit<PartialRecordTypeGuard<K, V>, keyof typeof base>);
};

export type IndexRecordTypeGuard<T> = TypeGuard<Record<PropertyKey, T>> & {
	isValue: TypeGuard<T>;
};

export const isIndexRecord = <T>(isValue: TypeGuard<T>): IndexRecordTypeGuard<T> => {
	return createTypeGuard<IndexRecordTypeGuard<T>>({
		func: value => {
			return value instanceof Object && value.constructor === Object && objectKeys(value).every(key => {
				return isValue(Reflect.get(value, key));
			});
		},
		isValue: isValue,
	});
};
