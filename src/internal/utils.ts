import { AnyTypeGuard } from "./types";

export const objectKeys = (object: {}): PropertyKey[] => {
	return [...Object.keys(object), ...Object.getOwnPropertySymbols(object)];
};

export const createTemplate = <const K extends readonly PropertyKey[]>(keys: K, isValue: (key: K[number]) => AnyTypeGuard) => {
	const entries = keys.map((key: K[number]) => [key, isValue(key)] as const);
	const template = Object.fromEntries(entries);
	return template as Record<K[number], AnyTypeGuard>;
};
