import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard, objectKeys, partial } from "./internal";

export type TupleToObject<T extends readonly unknown[]> = Pick<T, Extract<keyof T, `${number}`>>;

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? TupleToObject<T> : T;

export type TypeTypeGuard<T extends object> = TypeGuard<IsTypeGuarded<T>> & {
	template: TypeGuardTemplate<T>;
	partial: () => TypeTypeGuard<Partial<T>>;
};

export const isType = <T extends object>(template: TypeGuardTemplate<T>): TypeTypeGuard<T> => {
	const keys = objectKeys(template);

	return createTypeGuard<TypeTypeGuard<T>>({
		func: value => {
			return value !== null && value !== undefined && keys.every(key => {
				return Reflect.get(template, key)((value as Record<PropertyKey, unknown>)[key]);
			});
		},
		template: template,
		partial: () => isType<Partial<T>>(partial(template)),
	});
};
