import { TypeGuardTemplate } from "../types";
import { AnyTypeGuard } from "./types";

export const objectKeys = (object: {}): PropertyKey[] => {
	return [...Object.keys(object), ...Object.getOwnPropertySymbols(object)];
};

export const createTemplate = <const K extends readonly PropertyKey[]>(keys: K, isValue: (key: K[number]) => AnyTypeGuard) => {
	const entries = keys.map((key: K[number]) => [key, isValue(key)] as const);
	const template = Object.fromEntries(entries);
	return template as Record<K[number], AnyTypeGuard>;
};

export const partial = <T>(template: TypeGuardTemplate<T>): TypeGuardTemplate<Partial<T>> => {
	return createTemplate(objectKeys(template), key => Reflect.get(template, key).optional()) as TypeGuardTemplate<Partial<T>>;
};

export const pick = <T, K extends readonly (keyof T)[]>(template: TypeGuardTemplate<T>, keys: K): Pick<TypeGuardTemplate<T>, K[number]> => {
	return createTemplate(keys, key => Reflect.get(template, key)) as Pick<TypeGuardTemplate<T>, K[number]>;
};

export const omit = <T, K extends readonly (keyof T)[]>(template: TypeGuardTemplate<T>, keys: K): Omit<TypeGuardTemplate<T>, K[number]> => {
	const newTemplate = { ...template };

	keys.forEach(key => {
		delete newTemplate[key];
	});

	return newTemplate;
};
