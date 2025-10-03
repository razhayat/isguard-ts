import { TypeGuard, TypeGuardTemplate } from "../types";

export const objectKeys = (object: {}): PropertyKey[] => {
	return [...Object.keys(object), ...Object.getOwnPropertySymbols(object)];
};

export const createTemplate = <const K extends readonly PropertyKey[], V>(keys: K, isValue: TypeGuard<V>) => {
	const entries = keys.map((key: K[number]) => [key, isValue] as const);
	const template = Object.fromEntries(entries);
	return template as TypeGuardTemplate<Record<K[number], V>>;
};
