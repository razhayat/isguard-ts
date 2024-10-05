import { isFunction, isOptional } from "./isUtils";
import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";

export const extractTemplate = <T, G = T>(parameter: TypeGuardTemplateParameter<T, G>, guard: TypeGuard<G>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTemplate<T, G>(parameter(guard), guard) : parameter;
};

export const record = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): TypeGuardTemplate<Record<K[number], V>> => {
	const entries = keys.map((key: K[number]) => [key, isValue] as const);
	return Object.fromEntries(entries) as TypeGuardTemplate<Record<K[number], V>>;
};

const partial = <T>(template: TypeGuardTemplate<T>): TypeGuardTemplate<Partial<T>> => {
	const partialTemplate = Array.isArray(template) ? [] : {};
	for (const key in template) {
		Object.assign(partialTemplate, { [key]: isOptional(template[key]) });
	}

	return partialTemplate as TypeGuardTemplate<Partial<T>>;
};

export const partialRecord = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	return partial(record(keys, isValue));
};
