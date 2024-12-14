import { TypeGuardTemplateParameter, TypeGuard } from "./types";
import { extractTemplate } from "./utils";

type Pretty<T> = {
	[K in keyof T]: T[K];
} & {};

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? Pretty<Omit<T, keyof unknown[]>> : T;

export const isType = <T extends object>(template: TypeGuardTemplateParameter<T, IsTypeGuarded<T>>): TypeGuard<IsTypeGuarded<T>> => {
	const guard = (value: unknown): value is IsTypeGuarded<T> => {
		return value !== null && value !== undefined && keys.every(key => {
			return Reflect.get(resolvedTemplate, key)((value as Record<PropertyKey, unknown>)[key]);
		});
	};

	const resolvedTemplate = extractTemplate(template, guard);
	const keys = [...Object.keys(resolvedTemplate), ...Object.getOwnPropertySymbols(resolvedTemplate)];

	return guard;
};
