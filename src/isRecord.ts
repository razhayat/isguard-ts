import { isType } from "./isType";
import { isOptional } from "./isUtils";
import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./utils";

const createTemplate = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	const entries = keys.map((key: K[number]) => [key, isValue] as const);
	const template = Object.fromEntries(entries);
	return template as TypeGuardTemplate<Record<K[number], V>>;
};

export const isRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	return isType(createTemplate(keys, isValue));
};

export const isPartialRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	const template = createTemplate(keys, isOptional(isValue));
	return isType(template as TypeGuardTemplate<Partial<Record<K[number], V>>>);
};

export const isIndexRecord = <K extends PropertyKey, V>(isValue: TypeGuard<V>): TypeGuard<Record<K, V>> => {
	return createTypeGuard((value: unknown): value is Record<K, V> => {
		if (!(value instanceof Object) || value.constructor !== Object) {
			return false;
		}

		const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)];
		return keys.every(key => isValue((value as Record<PropertyKey, unknown>)[key]));
	});
};
