import { TypeGuard } from "./types";
import { isFunction, isNil } from "./isUtils";

export type TypeGuardTemplate<T> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};

export type IsTypeParameter<T> = TypeGuardTemplate<T> | ((guard: TypeGuard<T>) => IsTypeParameter<T>);

export const extractTypeGuardTemplate = <T>(guard: TypeGuard<T>, parameter: IsTypeParameter<T>): TypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTypeGuardTemplate(guard, parameter(guard)) : parameter;
};

export const isType = <T extends object>(template: T extends readonly unknown[] ? never : IsTypeParameter<T>): TypeGuard<T> => {
	let resolvedTemplate: TypeGuardTemplate<T> | null = null;

	const guard = (value: any): value is T => {
		resolvedTemplate = resolvedTemplate ?? extractTypeGuardTemplate<T>(guard, template);

		if (isNil(value)) {
			return false;
		}

		for (const key in resolvedTemplate) {
			if (!resolvedTemplate[key](value[key])) {
				return false;
			}
		}

		return true;
	};

	return guard;
};
