import { TypeGuardTemplateParameter, TypeGuard, TypeGuardTemplate, TypeGuardTemplateFunction } from "./types";
import { extractTemplate } from "./utils";

type Pretty<T> = {
	[K in keyof T]: T[K];
} & {};

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? Pretty<Omit<T, keyof unknown[]>> : T;

type IsType = {
	<T extends object>(template: TypeGuardTemplate<T>): TypeGuard<IsTypeGuarded<T>>
	/**
	 * @deprecated use `isLazy` instead of passing a function. See README.md for more help
	 */
	<T extends object>(template: TypeGuardTemplateFunction<T, IsTypeGuarded<T>>): TypeGuard<IsTypeGuarded<T>>
}

export const isType: IsType = <T extends object>(template: TypeGuardTemplateParameter<T, IsTypeGuarded<T>>): TypeGuard<IsTypeGuarded<T>> => {
	const guard = (value: unknown): value is IsTypeGuarded<T> => {
		return value !== null && value !== undefined && keys.every(key => {
			return Reflect.get(resolvedTemplate, key)((value as Record<PropertyKey, unknown>)[key]);
		});
	};

	const resolvedTemplate = extractTemplate(template, guard);
	const keys = [...Object.keys(resolvedTemplate), ...Object.getOwnPropertySymbols(resolvedTemplate)];

	return guard;
};
