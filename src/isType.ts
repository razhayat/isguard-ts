import { TypeGuard, TypeGuardTemplate } from "./types";

type Pretty<T> = {
	[K in keyof T]: T[K];
} & {};

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? Pretty<Omit<T, keyof unknown[]>> : T;

export const isType = <T extends object>(template: TypeGuardTemplate<T>): TypeGuard<IsTypeGuarded<T>> => {
	const keys = [...Object.keys(template), ...Object.getOwnPropertySymbols(template)];

	return (value: unknown): value is IsTypeGuarded<T> => {
		return value !== null && value !== undefined && keys.every(key => {
			return Reflect.get(template, key)((value as Record<PropertyKey, unknown>)[key]);
		});
	};
};
