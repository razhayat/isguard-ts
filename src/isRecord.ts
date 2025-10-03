import { isType } from "./isType";
import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTemplate, createTypeGuard, objectKeys } from "./internal";

export const isRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	return isType(createTemplate(keys, isValue));
};

export const isPartialRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	const template = createTemplate(keys, isValue.optional());
	return isType(template as TypeGuardTemplate<Partial<Record<K[number], V>>>);
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
