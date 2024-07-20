import { TypeGuard } from "./types";
import { isFunction, isNil } from "./utils";

export type ObjectTypeGuardTemplate<T extends object> = {
	[K in keyof T]-?: TypeGuard<T[K]>;
};

export type IsObjectParameter<T extends object> = ObjectTypeGuardTemplate<T> | ((guard: TypeGuard<T>) => IsObjectParameter<T>);

export const extractTypeGuardTemplate = <T extends object>(guard: TypeGuard<T>, parameter: IsObjectParameter<T>): ObjectTypeGuardTemplate<T> => {
	return isFunction(parameter) ? extractTypeGuardTemplate(guard, parameter(guard)) : parameter;
};

export const isObject = <T extends object>(template: IsObjectParameter<T>): TypeGuard<T> => {
	let resolvedTemplate: ObjectTypeGuardTemplate<T> | null = null;
	const guard = (value: any): value is T => {
		if (isNil(value)) {
			return false;
		}

		resolvedTemplate = resolvedTemplate ?? extractTypeGuardTemplate(guard, template);
		for (const key in resolvedTemplate) {
			if (!resolvedTemplate[key](value[key])) {
				return false;
			}
		}

		return true;
	};
	return guard;
};
