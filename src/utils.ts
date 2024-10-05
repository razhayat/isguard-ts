import { isFunction } from "./isUtils";
import { TypeGuard, TypeGuardTemplate, TypeGuardTemplateParameter } from "./types";

export const extractTemplate = <T>(parameter: TypeGuardTemplateParameter<T>, guard: TypeGuard<T>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTemplate(parameter(guard), guard) : parameter;
};

/**
 * @internal
 */
export const record = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>): TypeGuardTemplate<Record<K[number], V>> => {
	const entries = keys.map((key: K[number]) => [key, isValue] as const);
	return Object.fromEntries(entries) as TypeGuardTemplate<Record<K[number], V>>;
};
