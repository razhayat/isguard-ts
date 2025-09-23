import { TypeGuard, TypeGuardTemplate } from "./types";

type TupleToObject<T extends readonly unknown[]> = Pick<T, Extract<keyof T, `${number}`>>;

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? TupleToObject<T> : T;

export const isType = <T extends object>(template: TypeGuardTemplate<T>): TypeGuard<IsTypeGuarded<T>> => {
	const keys = [...Object.keys(template), ...Object.getOwnPropertySymbols(template)];

	return (value: unknown): value is IsTypeGuarded<T> => {
		return value !== null && value !== undefined && keys.every(key => {
			return Reflect.get(template, key)((value as Record<PropertyKey, unknown>)[key]);
		});
	};
};
